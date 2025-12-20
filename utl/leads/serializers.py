from rest_framework import serializers
from .models import Lead
import re

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            "id", "name", "phone", "consent_personal_data",
            "utm_source","utm_medium", "telegram", "utm_campaign","utm_term","utm_content",
            "referer",
        ]

    def validate(self, attrs):
        if not attrs.get("consent_personal_data"):
            raise serializers.ValidationError("Необходимо согласие на обработку персональных данных")
        # можно добавить строгую валидацию номера (phonenumbers)
        return attrs

    def validate_phone(self, value):
        print("DEBUG phone input:", value)  # лог в консоль

        # Убираем пробелы
        cleaned = value.replace(" ", "")

        # Разрешаем, чтобы первый символ был "+"
        if cleaned.startswith("+"):
            cleaned = cleaned[1:]

        # Проверка: остались только цифры
        if not cleaned.isdigit():
            raise serializers.ValidationError("Телефон должен содержать только цифры (и пробелы или '+')")

        if len(cleaned) < 9:
            raise serializers.ValidationError("Некорректный номер телефона")

        return value



