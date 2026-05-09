from django.db import models


class Lead(models.Model):
    class LeadType(models.TextChoices):
        PRODUCT_INTEREST = "PRODUCT_INTEREST", "Interés en producto"
        CUSTOM_DESIGN = "CUSTOM_DESIGN", "Diseño personalizado"
        GENERAL_CONTACT = "GENERAL_CONTACT", "Contacto general"

    class Status(models.TextChoices):
        NEW = "NEW", "Nuevo"
        CONTACTED = "CONTACTED", "Contactado"
        IN_PROGRESS = "IN_PROGRESS", "En seguimiento"
        CLOSED = "CLOSED", "Cerrado"
        DISCARDED = "DISCARDED", "Descartado"

    class PreferredContactMethod(models.TextChoices):
        WHATSAPP = "WHATSAPP", "WhatsApp"
        EMAIL = "EMAIL", "Email"
        PHONE = "PHONE", "Teléfono"

    lead_type = models.CharField(max_length=32, choices=LeadType.choices)
    status = models.CharField(
        max_length=24,
        choices=Status.choices,
        default=Status.NEW,
    )
    name = models.CharField(max_length=140)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField(blank=True)
    product = models.ForeignKey(
        "catalog.Product",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="leads",
    )
    product_name_snapshot = models.CharField(max_length=160, blank=True)
    occasion = models.CharField(max_length=160, blank=True)
    budget_range = models.CharField(max_length=120, blank=True)
    preferred_contact_method = models.CharField(
        max_length=16,
        choices=PreferredContactMethod.choices,
        default=PreferredContactMethod.WHATSAPP,
    )
    source = models.CharField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} - {self.get_lead_type_display()}"
