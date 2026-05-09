from decimal import Decimal

from rest_framework.test import APITestCase

from .models import Category, Collection, Product


class CatalogModelTests(APITestCase):
    def test_catalog_model_str_methods(self):
        category = Category.objects.create(name="Anillos", slug="anillos")
        collection = Collection.objects.create(
            name="Colección Ámbar",
            slug="coleccion-ambar",
        )
        product = Product.objects.create(
            category=category,
            name="Anillo Aurora",
            slug="anillo-aurora",
            short_description="Anillo delicado para momentos especiales.",
            price=Decimal("2500.00"),
            price_label="Consultar precio",
            sku="CA-AA-001",
            stock=3,
            is_featured=True,
        )
        product.collections.add(collection)

        self.assertEqual(str(category), "Anillos")
        self.assertEqual(str(collection), "Colección Ámbar")
        self.assertEqual(str(product), "Anillo Aurora")


class CatalogApiTests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Anillos", slug="anillos")
        self.collection = Collection.objects.create(
            name="Colección Ámbar",
            slug="ambar",
            is_featured=True,
        )
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
        self.product.collections.add(self.collection)

    def test_categories_endpoint_returns_ok(self):
        response = self.client.get("/api/catalog/categories/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["slug"], "anillos")

    def test_products_endpoint_returns_ok(self):
        response = self.client.get("/api/catalog/products/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["slug"], "anillo-aurora")

    def test_product_detail_by_slug_returns_ok(self):
        response = self.client.get("/api/catalog/products/anillo-aurora/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Anillo Aurora")

    def test_featured_filter_returns_featured_products(self):
        Product.objects.create(
            category=self.category,
            name="Anillo Básico",
            slug="anillo-basico",
            short_description="Anillo no destacado.",
            price_label="Consultar precio",
            sku="CA-AB-001",
            stock=1,
            is_featured=False,
        )

        response = self.client.get("/api/catalog/products/?featured=true")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["slug"], "anillo-aurora")
