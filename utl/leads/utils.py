from django.core.mail import send_mail
from django.conf import settings

def send_lead_email(lead):
    subject = f"Новый лид: {lead.name}"
    message = f"""
    📩 Новый лид с сайта:
    Имя: {lead.name}
    Email: {lead.email}
    Телефон: {lead.phone}
    Сообщение: {lead.message}
    """
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.NOTIFY_EMAIL])
