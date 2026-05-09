from rest_framework import serializers

from .models import Category, Collection, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "sort_order",
            "is_active",
        )


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "hero_text",
            "sort_order",
            "is_featured",
            "is_active",
        )


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = (
            "id",
            "image",
            "image_url",
            "alt_text",
            "sort_order",
            "is_primary",
        )

    def get_image_url(self, obj: ProductImage) -> str:
        request = self.context.get("request")
        if not obj.image:
            return ""
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "short_description",
            "category",
            "price",
            "price_label",
            "is_featured",
            "requires_quote",
            "primary_image",
        )

    def get_primary_image(self, obj: Product) -> dict | None:
        image = obj.images.filter(is_primary=True).first() or obj.images.first()
        if image is None:
            return None
        return ProductImageSerializer(image, context=self.context).data


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    collections = CollectionSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "short_description",
            "description",
            "category",
            "collections",
            "material",
            "stone",
            "size",
            "price",
            "compare_at_price",
            "price_label",
            "sku",
            "stock",
            "is_featured",
            "requires_quote",
            "meta_title",
            "meta_description",
            "images",
            "created_at",
            "updated_at",
        )
