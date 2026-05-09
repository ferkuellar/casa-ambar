import { Link } from "react-router-dom";

import { siteConfig } from "../../constants/site";
import { useCart } from "../../hooks/useCart";
import { toCartProduct } from "../../lib/cartProduct";
import { routes } from "../../lib/routes";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import type { ProductListItem } from "../../types/catalog";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type ProductCardProps = {
  product: ProductListItem;
};

function getImageSource(product: ProductListItem): string | null {
  if (!product.primary_image) {
    return null;
  }

  return product.primary_image.image_url || product.primary_image.image || null;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const imageSource = getImageSource(product);
  const categoryName = product.category.name;
  const priceText = product.price_label || product.price || "Precio bajo consulta";
  const cartProduct = toCartProduct(product);
  const whatsappHref = buildWhatsAppLink({
    phoneNumber: siteConfig.whatsappNumber,
    message: `Hola, me interesa consultar la pieza ${product.name} de Casa Ámbar.`,
  });

  return (
    <Card className="flex h-full flex-col overflow-hidden" hover>
      <div className="relative aspect-[4/5] overflow-hidden bg-amber-cream">
        {imageSource ? (
          <img
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            src={imageSource}
            alt={product.primary_image?.alt_text || product.name}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-6 border border-amber-line bg-amber-ivory" />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-gold/70" />
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-softGold/30" />
          </div>
        )}

        {product.requires_quote ? (
          <span className="absolute left-4 top-4 rounded-brand border border-amber-gold bg-amber-ivory px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-espresso">
            Cotización
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-muted">
          {categoryName}
        </p>
        <h3 className="mt-3 font-heading text-3xl font-semibold text-amber-black">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-amber-stone">
          {product.short_description}
        </p>

        <div className="mt-6 border-t border-amber-line pt-5">
          <p className="text-sm font-semibold text-amber-espresso">{priceText}</p>
          <div className="mt-5 grid gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-brand border border-amber-black px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-amber-black transition-colors hover:bg-amber-black hover:text-amber-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
              to={routes.product(product.slug)}
            >
              Ver detalle
            </Link>
            {cartProduct ? (
              <Button size="sm" onClick={() => addItem(cartProduct)}>
                Agregar
              </Button>
            ) : (
              <Button href={whatsappHref} target="_blank" rel="noreferrer" size="sm">
                Cotizar
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
