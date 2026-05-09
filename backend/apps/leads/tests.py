from decimal import Decimal
from unittest.mock import patch

from rest_framework.test import APITestCase

from apps.catalog.models import Category, Product

from .models import Lead


class LeadApiTests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Anillos", slug="anillos")
        self.product = Product.objects.create(
            category=self.category,
            name="Anillo Aurora",
            slug="anillo-aurora",
            short_description="Anillo delicado para momentos especiales.",
            price=Decimal("2500.00"),
            price_label="Consultar precio",
            sku="CA-AA-001",
            stock=3,
            is_featured=True,
        )

    @patch("apps.leads.views.send_lead_notification")
    def test_create_general_lead_with_email(self, mocked_notification):
        response = self.client.post(
            "/api/leads/",
            {
                "lead_type": "GENERAL_CONTACT",
                "name": "Cliente Demo",
                "email": "cliente@example.com",
                "message": "Me interesa conocer más sobre Casa Ámbar.",
                "preferred_contact_method": "EMAIL",
                "source": "home_contact",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["status"], "received")
        self.assertEqual(Lead.objects.count(), 1)
        mocked_notification.assert_called_once()

    def test_create_lead_with_phone(self):
        response = self.client.post(
            "/api/leads/",
            {
                "lead_type": "GENERAL_CONTACT",
                "name": "Cliente WhatsApp",
                "phone": "+52 614 123 4567",
                "message": "Quiero recibir información.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)

    def test_reject_lead_without_email_and_phone(self):
        response = self.client.post(
            "/api/leads/",
            {
                "lead_type": "GENERAL_CONTACT",
                "name": "Cliente Demo",
                "message": "Quiero recibir información.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("contact", response.data)

    def test_reject_lead_without_name(self):
        response = self.client.post(
            "/api/leads/",
            {
                "lead_type": "GENERAL_CONTACT",
                "email": "cliente@example.com",
                "message": "Quiero recibir información.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("name", response.data)

    def test_status_from_public_payload_is_ignored(self):
        response = self.client.post(
            "/api/leads/",
            {
                "lead_type": "GENERAL_CONTACT",
                "status": "CLOSED",
                "name": "Cliente Demo",
                "email": "cliente@example.com",
                "message": "Quiero recibir información.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Lead.objects.get().status, Lead.Status.NEW)

    def test_product_lead_keeps_product_name_snapshot(self):
        response = self.client.post(
            "/api/leads/",
            {
                "lead_type": "PRODUCT_INTEREST",
                "name": "Cliente Producto",
                "phone": "+52 614 123 4567",
                "message": "Me interesa esta pieza.",
                "product": self.product.id,
                "source": "product_detail",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        lead = Lead.objects.get(id=response.data["id"])
        self.assertEqual(lead.product_name_snapshot, "Anillo Aurora")

    def test_public_leads_list_is_not_exposed(self):
        response = self.client.get("/api/leads/")

        self.assertEqual(response.status_code, 405)
