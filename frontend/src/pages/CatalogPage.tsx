import { useCallback, useEffect, useState } from "react";

import { CatalogState } from "../components/catalog/CatalogState";
import { ProductFilters } from "../components/catalog/ProductFilters";
import { ProductGrid } from "../components/catalog/ProductGrid";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { SectionHeader } from "../components/ui/SectionHeader";
import { getCategories, getProducts } from "../services/catalogApi";
import type { Category, ProductListItem } from "../types/catalog";

export function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);
  const [showQuoteOnly, setShowQuoteOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCatalog = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const filters = {
        active: true,
        category: selectedCategory || undefined,
        featured: showFeatured || undefined,
        requires_quote: showQuoteOnly || undefined,
      };
      const [categoriesResponse, productsResponse] = await Promise.all([
        getCategories(),
        getProducts(filters),
      ]);
      setCategories(categoriesResponse);
      setProducts(productsResponse);
    } catch {
      setError("No fue posible cargar el catálogo. Verifica que el backend esté activo.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, showFeatured, showQuoteOnly]);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  return (
    <section className="bg-amber-cream py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Catálogo"
          title="Piezas Casa Ámbar disponibles para consulta."
          description="Catálogo conectado al backend Django. Usa filtros básicos para revisar categorías, destacados y piezas bajo cotización."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFeatured={showFeatured}
            onFeaturedChange={setShowFeatured}
            showQuoteOnly={showQuoteOnly}
            onQuoteOnlyChange={setShowQuoteOnly}
          />

          <div>
            {isLoading ? (
              <CatalogState
                type="loading"
                title="Cargando catálogo"
                message="Estamos consultando las piezas activas desde la API."
              />
            ) : null}

            {!isLoading && error ? (
              <CatalogState
                type="error"
                title="No se pudo cargar el catálogo"
                message={error}
                action={
                  <Button onClick={() => void loadCatalog()} variant="secondary">
                    Reintentar
                  </Button>
                }
              />
            ) : null}

            {!isLoading && !error ? <ProductGrid products={products} /> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
