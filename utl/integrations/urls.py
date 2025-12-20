from django.urls import path
from .views import AmoManualCodeExchangeView, AmoTestPushView, AmoPushLastLeadView, AmoWhoAmIView, \
    AmoBootstrapTokensView, AmoForceRefreshTokensView, AmoTokenDebugView

urlpatterns = [
    # 1) разово обменять вручную полученный authorization_code на токены:
    path("amo/manual/callback/", AmoManualCodeExchangeView.as_view(), name="amo_manual_exchange"),

    # 2) тестовые ручки:
    path("amo/test-push/", AmoTestPushView.as_view(), name="amo_test_push"),
    path("amo/push-last-lead/", AmoPushLastLeadView.as_view(), name="amo_push_last"),
    path("amo/whoami/", AmoWhoAmIView.as_view(), name="amo_whoami"),
    path("amo/bootstrap-tokens/", AmoBootstrapTokensView.as_view(), name="amo_bootstrap_tokens"),
    path("amo/force-refresh/", AmoForceRefreshTokensView.as_view(), name="amo_force_refresh"),
    path("amo/token-debug/", AmoTokenDebugView.as_view(), name="amo_token_debug"),

]
