import type { ProductDetail } from "../../types/catalog";

type ProductInfoProps = {
  product: ProductDetail;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const description = product.description || product.short_description;
  const priceText = product.price_label || product.price || "Precio bajo consulta";

  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
        {product.category.name}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-5xl font-semibold leading-tight text-amber-black sm:text-6xl">
          {product.name}
        </h1>
        {product.requires_quote ? (
          <span className="rounded-brand border border-amber-gold bg-amber-cream px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-espresso">
            Bajo cotización
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-lg leading-8 text-amber-stone">
        {product.short_description}
      </p>
      {description ? (
        <p className="mt-6 text-base leading-8 text-amber-espresso">
          {description}
        </p>
      ) : null}
      <p className="mt-8 font-heading text-4xl font-semibold text-amber-black">
        {priceText}
      </p>
    </header>
  );
}
