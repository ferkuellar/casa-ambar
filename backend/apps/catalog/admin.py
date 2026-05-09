from django.contrib import admin

from .models import Category, Collection, Product, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "sort_order", "is_active")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = ("is_active",)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_featured", "sort_order", "is_active")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = ("is_featured", "is_active")


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
        "category",
        "price",
        "price_label",
        "stock",
        "is_featured",
        "requires_quote",
        "is_active",
    )
    search_fields = ("name", "slug", "sku", "short_description")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = (
        "category",
        "collections",
        "is_featured",
        "requires_quote",
        "is_active",
    )
    filter_horizontal = ("collections",)
    inlines = (ProductImageInline,)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "sort_order", "is_primary", "alt_text")
    search_fields = ("product__name", "alt_text")
    list_filter = ("is_primary",)
