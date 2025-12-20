from django.db import models

# Create your models here.

from django.db import models

class Lead(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=64)
    telegram = models.CharField(max_length=128, blank=True, default="")
    consent_personal_data = models.BooleanField(default=False)

    # базовые маркетинговые поля — чтобы видеть откуда пришёл лид
    utm_source = models.CharField(max_length=64, blank=True, default="")
    utm_medium = models.CharField(max_length=64, blank=True, default="")
    utm_campaign = models.CharField(max_length=128, blank=True, default="")
    utm_term = models.CharField(max_length=128, blank=True, default="")
    utm_content = models.CharField(max_length=128, blank=True, default="")
    referer = models.CharField(max_length=255, blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} | {self.phone}"
