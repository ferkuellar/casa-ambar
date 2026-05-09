import type { ProductListItem } from "../../types/catalog";
import { ProductGrid } from "../catalog/ProductGrid";
import { SectionHeader } from "../ui/SectionHeader";

type RelatedProductsProps = {
  products: ProductListItem[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-amber-line bg-amber-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Relacionados"
          title="También te puede interesar"
          description="Piezas de la misma categoría para continuar explorando Casa Ámbar."
        />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
