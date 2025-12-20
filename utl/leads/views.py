from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, throttling
from django.conf import settings
import requests

from integrations.amocrm import push_lead_to_amocrm
from .serializers import LeadSerializer
from .models import Lead


class LeadAnonRateThrottle(throttling.AnonRateThrottle):
    """
    Ограничение: не больше 2 заявок в минуту с одного IP.
    """
    rate = "10/min"


def send_telegram_message(text: str) -> None:
    """
    Отправка текста в Telegram-чат.
    Работает только если TELEGRAM_TOKEN и TELEGRAM_CHAT_ID заданы в настройках.
    Ошибки отправки не роняют запрос (логика best-effort).
    """
    token = getattr(settings, "TELEGRAM_TOKEN", None)
    chat_id = getattr(settings, "TELEGRAM_CHAT_ID", None)
    if not token or not chat_id:
        return  # уведомления выключены/не настроены

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        requests.post(url, data={"chat_id": chat_id, "text": text})
    except Exception:
        # Можно добавить логирование, если нужно
        pass


def format_lead_message(lead: Lead) -> str:
    """
    Красивое сообщение для Telegram по новому лиду.
    """
    lines = [
        "📩 Новый лид с сайта UTL School",
        f"👤 Имя: {lead.name}",
        f"📞 Телефон: {lead.phone}",
    ]
    if getattr(lead, "telegram", ""):
        lines.append(f"💬 Telegram: {lead.telegram}")

    # Маркетинговые метки (если есть)
    utm_parts = []
    if lead.utm_source:   utm_parts.append(f"source={lead.utm_source}")
    if lead.utm_medium:   utm_parts.append(f"medium={lead.utm_medium}")
    if lead.utm_campaign: utm_parts.append(f"campaign={lead.utm_campaign}")
    if lead.utm_term:     utm_parts.append(f"term={lead.utm_term}")
    if lead.utm_content:  utm_parts.append(f"content={lead.utm_content}")
    if utm_parts:
        lines.append("🔗 UTM: " + ", ".join(utm_parts))

    if lead.referer:
        lines.append(f"🌐 Referer: {lead.referer}")

    return "\n".join(lines)


class LeadCreateView(APIView):
    throttle_classes = [LeadAnonRateThrottle]

    def post(self, request):
        data = request.data.copy()

        # заполним utm/* и referer, если фронт не прислал явно
        data.setdefault("utm_source",   request.query_params.get("utm_source", ""))
        data.setdefault("utm_medium",   request.query_params.get("utm_medium", ""))
        data.setdefault("utm_campaign", request.query_params.get("utm_campaign", ""))
        data.setdefault("utm_term",     request.query_params.get("utm_term", ""))
        data.setdefault("utm_content",  request.query_params.get("utm_content", ""))
        data.setdefault("referer",      request.headers.get("Referer", ""))

        serializer = LeadSerializer(data=data)
        if not serializer.is_valid():
            return Response({"ok": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        # сохраняем лид
        lead = serializer.save(ip=self._get_client_ip(request))

        # уведомляем в Telegram (если настроено)
        try:
            msg = format_lead_message(lead)
            send_telegram_message(msg)
        except Exception:
            # не падаем, если что-то пошло не так при уведомлении
            pass

        try:
            push_lead_to_amocrm(lead.name, lead.phone)
        except Exception:
            # не роняем основной ответ пользователю
            pass
        return Response({"ok": True, "id": lead.id}, status=status.HTTP_201_CREATED)

    def _get_client_ip(self, request):
        xff = request.META.get("HTTP_X_FORWARDED_FOR")
        if xff:
            return xff.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")
