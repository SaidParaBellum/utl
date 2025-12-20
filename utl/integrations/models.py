from django.db import models
from django.utils import timezone

class AmoAuth(models.Model):
    access_token  = models.TextField(blank=True, default="")
    refresh_token = models.TextField(blank=True, default="")
    token_type    = models.CharField(max_length=32, blank=True, default="Bearer")
    expires_at    = models.DateTimeField(null=True, blank=True)
    base_domain   = models.CharField(max_length=255, blank=True, default="")

    def is_expired(self) -> bool:
        if not self.expires_at:
            return True
        return timezone.now() >= self.expires_at
