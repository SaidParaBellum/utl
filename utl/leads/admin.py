from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "consent_personal_data", "created_at", "utm_source", "utm_campaign")
    list_filter = ("consent_personal_data", "utm_source", "created_at")
    search_fields = ("name", "phone")
    readonly_fields = ("created_at",)
