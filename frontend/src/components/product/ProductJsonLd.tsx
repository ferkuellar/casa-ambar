import { siteConfig } from "../../constants/site";
import type { ProductDetail } from "../../types/catalog";

type ProductJsonLdProps = {
  product: ProductDetail;
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const images = product.images
    .map((image) => image.image_url || image.image)
    .filter(Boolean);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.meta_description || product.description || product.short_description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };

  if (product.sku) {
    schema.sku = product.sku;
  }

  if (images.length > 0) {
    schema.image = images;
  }

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: "MXN",
    availability:
      product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
  };

  if (product.price) {
    offer.price = product.price;
  }

  schema.offers = offer;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
