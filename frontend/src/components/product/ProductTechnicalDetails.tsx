import type { ProductDetail } from "../../types/catalog";

type ProductTechnicalDetailsProps = {
  product: ProductDetail;
};

type DetailItem = {
  label: string;
  value: string;
};

export function ProductTechnicalDetails({ product }: ProductTechnicalDetailsProps) {
  const collectionNames = product.collections
    .map((collection) => collection.name)
    .filter(Boolean)
    .join(", ");
  const availability =
    product.stock > 0 ? "Disponible" : "Bajo pedido o consultar disponibilidad";

  const details: DetailItem[] = [
    { label: "Material", value: product.material },
    { label: "Piedra", value: product.stone },
    { label: "Talla / medida", value: product.size },
    { label: "SKU", value: product.sku },
    { label: "Disponibilidad", value: availability },
    { label: "Colecciones", value: collectionNames },
  ].filter((item) => item.value);

  if (details.length === 0) {
    return null;
  }

  return (
    <section className="rounded-brand border border-amber-line bg-amber-ivory p-6">
      <h2 className="font-heading text-3xl font-semibold text-amber-black">
        Detalles técnicos
      </h2>
      <dl className="mt-5 divide-y divide-amber-line">
        {details.map((item) => (
          <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr]" key={item.label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-muted">
              {item.label}
            </dt>
            <dd className="text-sm leading-6 text-amber-espresso">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
