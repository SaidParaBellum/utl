from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from datetime import timedelta
from integrations.models import AmoAuth

class Command(BaseCommand):
    help = "Сохранить первичные access/refresh токены amoCRM в БД (pk=1)."

    def add_arguments(self, parser):
        parser.add_argument("--access", required=True, help="access_token (полученный из Postman)")
        parser.add_argument("--refresh", required=True, help="refresh_token (полученный из Postman)")
        parser.add_argument("--expires-in", type=int, default=600, help="сек до истечения access_token (по умолчанию 600)")

    def handle(self, *args, **opts):
        access = opts["access"].strip()
        refresh = opts["refresh"].strip()
        expires_in = opts["expires_in"]

        if not access or not refresh:
            raise CommandError("Нужно передать --access и --refresh")

        obj, _ = AmoAuth.objects.get_or_create(pk=1)
        obj.access_token = access
        obj.refresh_token = refresh
        obj.token_type = "Bearer"
        # задаём близкую дату истечения — клиент сам обновит по refresh
        obj.expires_at = timezone.now() + timedelta(seconds=max(60, expires_in - 60))
        obj.base_domain = ""
        obj.save()

        self.stdout.write(self.style.SUCCESS("OK: токены сохранены в AmoAuth(pk=1)"))
