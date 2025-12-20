from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .amocrm import AmoClient, push_lead_to_amocrm
from leads.models import Lead
from .models import AmoAuth


# 1) простой эндпоинт: ВСТАВИТЬ РУЧНОЙ AUTH CODE -> получить токены
class AmoManualCodeExchangeView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        code = request.data.get("code")
        if not code:
            return Response({"ok": False, "error": "code is required"}, status=400)
        try:
            data = AmoClient().exchange_code(code)
            return Response({"ok": True, "received": list(data.keys())})
        except Exception as e:
            return Response({"ok": False, "error": str(e)}, status=400)

# 2) тест: передай name/phone и создастся сделка
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .amocrm import push_lead_to_amocrm

class AmoTestPushView(APIView):
    """POST { name, phone } — пробросит лид в amoCRM."""
    def post(self, request):
        name = request.data.get("name")
        phone = request.data.get("phone")
        if not name or not phone:
            return Response({"ok": False, "error": "name and phone required"}, status=400)
        try:
            res = push_lead_to_amocrm(name, phone)
            return Response({"ok": True, "result": res})
        except Exception as e:
            return Response({"ok": False, "error": str(e)}, status=400)


# 3) тест: взять последний лид из БД и отправить в amo
class AmoPushLastLeadView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        lead = Lead.objects.order_by("-created_at").first()
        if not lead:
            return Response({"ok": False, "error": "no leads yet"}, status=404)
        try:
            res = push_lead_to_amocrm(lead.name, lead.phone)
            return Response({"ok": True, "result": res, "lead_id_local": lead.id})
        except Exception as e:
            return Response({"ok": False, "error": str(e)}, status=400)


class AmoWhoAmIView(APIView):
    def get(self, request):
        client = AmoClient()
        # низкоуровневый запрос к /api/v4/account
        resp = client._request("GET", "/api/v4/account")
        ok = 200 <= resp.status_code < 300
        try:
            data = resp.json()
        except Exception:
            data = {"raw": resp.text}
        return Response({"ok": ok, "status": resp.status_code, "data": data})

class AmoBootstrapTokensView(APIView):
    """
    Разовая инициализация: принимает access_token / refresh_token / expires_in
    и кладёт их в БД (таблица AmoAuth, pk=1).
    """
    def post(self, request):
        access_token  = request.data.get("access_token")
        refresh_token = request.data.get("refresh_token")
        expires_in    = request.data.get("expires_in")  # сек, опционально
        base_domain   = request.data.get("base_domain") # опционально

        if not access_token or not refresh_token:
            return Response({"ok": False, "error": "access_token и refresh_token обязательны"}, status=400)

        obj, _ = AmoAuth.objects.get_or_create(pk=1)
        obj.access_token  = access_token
        obj.refresh_token = refresh_token
        obj.token_type    = "Bearer"

        # если передали expires_in — засечём срок жизни с небольшим запасом
        if expires_in:
            from django.utils import timezone
            from datetime import timedelta
            try:
                obj.expires_at = timezone.now() + timedelta(seconds=max(0, int(expires_in) - 60))
            except Exception:
                obj.expires_at = None

        if base_domain:
            obj.base_domain = base_domain

        obj.save()
        return Response({"ok": True})

class AmoForceRefreshTokensView(APIView):
    """
    Принудительно обновляет access_token через сохранённый refresh_token.
    Возвращает новые токены и новую дату истечения.
    """

    def post(self, request):
        try:
            data = AmoClient().refresh_tokens()
            return Response({"ok": True, "data": data})
        except Exception as e:
            return Response({"ok": False, "error": str(e)}, status=400)

class AmoTokenDebugView(APIView):
    """
    Показывает текущее состояние токенов из БД.
    """
    def get(self, request):
        obj, _ = AmoAuth.objects.get_or_create(pk=1)
        return Response({
            "ok": True,
            "access_token_exists": bool(obj.access_token),
            "refresh_token_exists": bool(obj.refresh_token),
            "expires_at": obj.expires_at.isoformat() if obj.expires_at else None,
            "is_expired_now": obj.is_expired(),
            "base_domain": obj.base_domain,
            "server_time": timezone.now().isoformat(),
        })