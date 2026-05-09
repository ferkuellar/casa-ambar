from django.db.models import QuerySet
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Category, Collection, Product
from .serializers import (
    CategorySerializer,
    CollectionSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


def parse_bool(value: str | None) -> bool | None:
    if value is None:
        return None
    normalized = value.strip().lower()
    if normalized in {"1", "true", "yes", "on"}:
        return True
    if normalized in {"0", "false", "no", "off"}:
        return False
    return None


class CategoryViewSet(ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    lookup_field = "slug"

    def get_queryset(self) -> QuerySet[Category]:
        queryset = Category.objects.all()
        active = parse_bool(self.request.query_params.get("active"))
        if active is False:
            return queryset.filter(is_active=False)
        return queryset.filter(is_active=True)


class CollectionViewSet(ReadOnlyModelViewSet):
    serializer_class = CollectionSerializer
    lookup_field = "slug"

    def get_queryset(self) -> QuerySet[Collection]:
        queryset = Collection.objects.all()
        active = parse_bool(self.request.query_params.get("active"))
        if active is False:
            queryset = queryset.filter(is_active=False)
        else:
            queryset = queryset.filter(is_active=True)

        featured = parse_bool(self.request.query_params.get("featured"))
        if featured is not None:
            queryset = queryset.filter(is_featured=featured)
        return queryset


class ProductViewSet(ReadOnlyModelViewSet):
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self) -> QuerySet[Product]:
        queryset = (
            Product.objects.select_related("category")
            .prefetch_related("collections", "images")
            .all()
        )

        active = parse_bool(self.request.query_params.get("active"))
        if active is False:
            queryset = queryset.filter(is_active=False)
        else:
            queryset = queryset.filter(is_active=True)

        category_slug = self.request.query_params.get("category")
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        collection_slug = self.request.query_params.get("collection")
        if collection_slug:
            queryset = queryset.filter(collections__slug=collection_slug)

        featured = parse_bool(self.request.query_params.get("featured"))
        if featured is not None:
            queryset = queryset.filter(is_featured=featured)

        requires_quote = parse_bool(self.request.query_params.get("requires_quote"))
        if requires_quote is not None:
            queryset = queryset.filter(requires_quote=requires_quote)

        return queryset.distinct()
