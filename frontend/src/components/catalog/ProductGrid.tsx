import type { ProductListItem } from "../../types/catalog";
import { CatalogState } from "./CatalogState";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: ProductListItem[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <CatalogState
        type="empty"
        title="Aún no hay piezas publicadas"
        message="Cuando el catálogo tenga productos activos, aparecerán en esta sección."
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
