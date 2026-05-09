from rest_framework import serializers

from .models import Lead


class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = (
            "id",
            "lead_type",
            "name",
            "email",
            "phone",
            "message",
            "product",
            "occasion",
            "budget_range",
            "preferred_contact_method",
            "source",
        )
        read_only_fields = ("id",)

    def validate(self, attrs):
        name = attrs.get("name", "").strip()
        email = attrs.get("email", "").strip()
        phone = attrs.get("phone", "").strip()
        message = attrs.get("message", "").strip()
        lead_type = attrs.get("lead_type")

        if not name:
            raise serializers.ValidationError({"name": "El nombre es requerido."})

        if not email and not phone:
            raise serializers.ValidationError(
                {"contact": "Proporciona correo electrónico o teléfono."}
            )

        if lead_type in {
            Lead.LeadType.GENERAL_CONTACT,
            Lead.LeadType.CUSTOM_DESIGN,
        } and not message:
            raise serializers.ValidationError(
                {"message": "El mensaje es requerido para este tipo de solicitud."}
            )

        attrs["name"] = name
        attrs["email"] = email
        attrs["phone"] = phone
        attrs["message"] = message
        return attrs

    def create(self, validated_data):
        product = validated_data.get("product")
        if product is not None:
            validated_data["product_name_snapshot"] = product.name
        return super().create(validated_data)
