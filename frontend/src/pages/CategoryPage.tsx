import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CatalogState } from "../components/catalog/CatalogState";
import { ProductGrid } from "../components/catalog/ProductGrid";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { SectionHeader } from "../components/ui/SectionHeader";
import { routes } from "../lib/routes";
import { getCategoryBySlug, getProducts } from "../services/catalogApi";
import type { Category, ProductListItem } from "../types/catalog";

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategory = useCallback(async () => {
    if (!categorySlug) {
      setError("La ruta de colección no es válida.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [categoryResponse, productsResponse] = await Promise.all([
        getCategoryBySlug(categorySlug),
        getProducts({ active: true, category: categorySlug }),
      ]);
      setCategory(categoryResponse);
      setProducts(productsResponse);
    } catch {
      setError("No encontramos esta colección o el backend no respondió.");
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    void loadCategory();
  }, [loadCategory]);

  return (
    <section className="bg-amber-cream py-16 sm:py-24">
      <Container>
        <Link
          className="mb-8 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-amber-gold transition-colors hover:text-amber-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
          to={routes.collections}
        >
          Volver a colecciones
        </Link>

        {isLoading ? (
          <CatalogState
            type="loading"
            title="Cargando colección"
            message="Estamos consultando la categoría y sus productos desde la API."
          />
        ) : null}

        {!isLoading && error ? (
          <CatalogState
            type="error"
            title="No se pudo cargar la colección"
            message={error}
            action={
              <Button onClick={() => void loadCategory()} variant="secondary">
                Reintentar
              </Button>
            }
          />
        ) : null}

        {!isLoading && !error && category ? (
          <>
            <SectionHeader
              eyebrow="Colección"
              title={category.name}
              description={
                category.description ||
                "Selección editorial de joyería fina Casa Ámbar."
              }
            />
            <div className="mt-12">
              <ProductGrid products={products} />
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}
