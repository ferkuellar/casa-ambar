import type { ProductDetail, ProductListItem } from "../types/catalog";
import type { CartProduct } from "../types/cart";
import { parseMoneyValue } from "./formatMoney";

function getPrimaryImage(product: ProductDetail | ProductListItem): string | null {
  if ("images" in product && product.images.length > 0) {
    const image = product.images.find((item) => item.is_primary) ?? product.images[0];
    return image.image_url || image.image || null;
  }

  if (product.primary_image) {
    return product.primary_image.image_url || product.primary_image.image || null;
  }

  return null;
}

export function toCartProduct(product: ProductDetail | ProductListItem): CartProduct | null {
  const priceValue = parseMoneyValue(product.price);

  if (product.requires_quote || !product.price || priceValue <= 0) {
    return null;
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    priceLabel: product.price_label || undefined,
    image: getPrimaryImage(product),
    categoryName: product.category.name,
    requiresQuote: product.requires_quote,
  };
}
