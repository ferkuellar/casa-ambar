from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "name",
        "lead_type",
        "status",
        "phone",
        "email",
        "product_name_snapshot",
        "source",
    )
    list_filter = (
        "lead_type",
        "status",
        "preferred_contact_method",
        "source",
        "created_at",
    )
    search_fields = (
        "name",
        "email",
        "phone",
        "message",
        "product_name_snapshot",
    )
    readonly_fields = ("created_at", "updated_at")
    list_editable = ("status",)
    fieldsets = (
        (
            "Datos del cliente",
            {
                "fields": (
                    "name",
                    "email",
                    "phone",
                    "preferred_contact_method",
                    "message",
                )
            },
        ),
        (
            "Interés / producto",
            {
                "fields": (
                    "lead_type",
                    "product",
                    "product_name_snapshot",
                    "occasion",
                    "budget_range",
                )
            },
        ),
        (
            "Seguimiento",
            {
                "fields": ("status",),
            },
        ),
        (
            "Metadatos",
            {
                "fields": ("source", "created_at", "updated_at"),
            },
        ),
    )
