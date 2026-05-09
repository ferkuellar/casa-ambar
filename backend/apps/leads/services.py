from django.conf import settings
from django.core.mail import send_mail

from .models import Lead


def send_lead_notification(lead: Lead) -> None:
    recipient = getattr(settings, "LEADS_NOTIFICATION_EMAIL", "")
    if not recipient:
        return

    subject = f"Nuevo lead Casa Ámbar: {lead.get_lead_type_display()}"
    body = "\n".join(
        [
            f"Nombre: {lead.name}",
            f"Tipo: {lead.get_lead_type_display()}",
            f"Estatus: {lead.get_status_display()}",
            f"Email: {lead.email or 'No proporcionado'}",
            f"Teléfono: {lead.phone or 'No proporcionado'}",
            f"Producto: {lead.product_name_snapshot or 'No aplica'}",
            f"Ocasión: {lead.occasion or 'No proporcionada'}",
            f"Presupuesto: {lead.budget_range or 'No proporcionado'}",
            f"Método preferido: {lead.get_preferred_contact_method_display()}",
            f"Fuente: {lead.source or 'No proporcionada'}",
            "",
            "Mensaje:",
            lead.message or "Sin mensaje.",
        ]
    )

    send_mail(
        subject=subject,
        message=body,
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
        recipient_list=[recipient],
        fail_silently=False,
    )
