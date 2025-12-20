# integrations/amocrm.py
import requests
from datetime import timedelta
from django.conf import settings
from django.utils import timezone
from .models import AmoAuth

AMO_BASE = f"https://{settings.AMOCRM_DOMAIN}"

def _auth_row() -> AmoAuth:
    obj, _ = AmoAuth.objects.get_or_create(pk=1)
    return obj

class AmoClient:
    def __init__(self):
        self.base = AMO_BASE
        self.client_id = settings.AMOCRM_CLIENT_ID
        self.client_secret = settings.AMOCRM_CLIENT_SECRET
        self.redirect_uri = getattr(settings, "AMOCRM_REDIRECT_URI", None)
        self.pipeline_id = getattr(settings, "AMOCRM_PIPELINE_ID", None)
        self.status_id   = getattr(settings, "AMOCRM_STATUS_ID", None)

        s = requests.Session()
        # Только ASCII в заголовках по умолчанию
        s.headers.update({
            "User-Agent": "UTL-CRM-bridge/1.0",
            "Accept": "application/json",
        })
        # Не подхватывать системные прокси/переменные окружения
        s.trust_env = False
        self.session = s

        self._seed_from_env_if_empty()

    def _seed_from_env_if_empty(self):
        auth = _auth_row()
        if auth.access_token or auth.refresh_token:
            return
        access = getattr(settings, "AMOCRM_ACCESS_TOKEN", "")
        refresh = getattr(settings, "AMOCRM_REFRESH_TOKEN", "")
        if access and refresh:
            auth.access_token = access
            auth.refresh_token = refresh
            auth.token_type = "Bearer"
            auth.expires_at = timezone.now() + timedelta(minutes=10)
            auth.base_domain = settings.AMOCRM_DOMAIN
            auth.save()

    # ---------- tokens ----------
    def _save_tokens(self, data: dict):
        auth = _auth_row()
        auth.access_token  = data.get("access_token", "")
        auth.refresh_token = data.get("refresh_token", "")
        auth.token_type    = data.get("token_type", "Bearer")
        expires_in         = int(data.get("expires_in", 0))
        auth.expires_at    = timezone.now() + timedelta(seconds=max(0, expires_in - 60))
        auth.base_domain   = data.get("base_domain", settings.AMOCRM_DOMAIN)
        auth.save()

    def exchange_code(self, code: str):
        url = f"{self.base}/oauth2/access_token"
        payload = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.redirect_uri,
        }
        headers = {
            "User-Agent": "UTL-CRM-bridge/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        r = self.session.post(url, json=payload, headers=headers)
        if r.status_code >= 400:
            print("AMO exchange_code ERROR:", r.status_code, r.text)
        r.raise_for_status()
        data = r.json()
        self._save_tokens(data)
        return data

    def refresh_tokens(self):
        auth = _auth_row()
        if not auth.refresh_token:
            raise RuntimeError("Нет refresh_token — задайте его один раз.")
        url = f"{self.base}/oauth2/access_token"
        payload = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "refresh_token",
            "refresh_token": auth.refresh_token,
        }
        headers = {
            "User-Agent": "UTL-CRM-bridge/1.0",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        r = self.session.post(url, json=payload, headers=headers)
        if r.status_code >= 400:
            print("AMO refresh_tokens ERROR:", r.status_code, r.text)
        r.raise_for_status()
        data = r.json()
        self._save_tokens(data)
        return data

    def _get_valid_access_token(self) -> str:
        auth = _auth_row()
        if not auth.access_token:
            # попробуем засев из env
            self._seed_from_env_if_empty()
            auth = _auth_row()

        # если есть access_token и ещё не истёк — возвращаем как есть
        if auth.access_token and not auth.is_expired():
            return auth.access_token

        # если истёк — пробуем обновить; на 401 вернём старый (для отладки)
        try:
            self.refresh_tokens()
            auth = _auth_row()
            return auth.access_token
        except requests.HTTPError as e:
            print("AMO _get_valid_access_token refresh failed:", e)
            return auth.access_token  # вернём, даже если истёк — чтобы увидеть следующую ошибку от API

    # ---------- low-level request with auto refresh ----------
    def _request(self, method: str, path: str, retry=True, **kwargs):
        token = self._get_valid_access_token()
        # Только ASCII в заголовках
        headers = kwargs.pop("headers", {})
        headers.setdefault("User-Agent", "UTL-CRM-bridge/1.0")
        headers.setdefault("Accept", "application/json")
        headers["Authorization"] = f"Bearer {token}"  # ASCII

        # если отправляем JSON — добавим Content-Type (ASCII)
        if "json" in kwargs and "Content-Type" not in headers:
            headers["Content-Type"] = "application/json"

        url = f"{self.base}{path}"
        resp = self.session.request(method, url, headers=headers, **kwargs)

        if resp.status_code == 401 and retry:
            self.refresh_tokens()
            return self._request(method, path, retry=False, **kwargs)
        return resp

    # ---------- API ----------
    def find_contact_by_query(self, query: str):
        # никаких f-строк — только params (requests сам экранирует)
        resp = self._request("GET", "/api/v4/contacts", params={"query": query})
        if resp.status_code == 200:
            data = resp.json()
            items = data.get("_embedded", {}).get("contacts", [])
            return items[0] if items else None
        return None

    def create_contact(self, name: str, phone: str):
        payload = [{
            "name": name,  # Юникод в JSON — нормально
            "custom_fields_values": [
                {"field_code": "PHONE", "values": [{"value": phone}]}
            ]
        }]
        resp = self._request("POST", "/api/v4/contacts", json=payload)
        resp.raise_for_status()
        return resp.json()["_embedded"]["contacts"][0]["id"]

    def create_lead_with_contact(self, title: str, contact_id: int | None):
        body = [{"name": title}]
        if settings.AMOCRM_PIPELINE_ID:
            body[0]["pipeline_id"] = int(settings.AMOCRM_PIPELINE_ID)
        if settings.AMOCRM_STATUS_ID:
            body[0]["status_id"] = int(settings.AMOCRM_STATUS_ID)
        if contact_id:
            body[0]["_embedded"] = {"contacts": [{"id": contact_id}]}

        resp = self._request("POST", "/api/v4/leads", json=body)
        resp.raise_for_status()
        return resp.json()["_embedded"]["leads"][0]["id"]

    def push_lead(self, name: str, phone: str):
        contact = self.find_contact_by_query(phone)
        contact_id = contact["id"] if contact else self.create_contact(name, phone)
        lead_id = self.create_lead_with_contact(f"Заявка с сайта: {name}", contact_id)
        return {"contact_id": contact_id, "lead_id": lead_id}


def push_lead_to_amocrm(name: str, phone: str) -> dict:
    return AmoClient().push_lead(name, phone)
