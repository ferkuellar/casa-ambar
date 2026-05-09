import { useCallback, useEffect, useState } from "react";

import { CatalogState } from "../components/catalog/CatalogState";
import { CategoryCard } from "../components/catalog/CategoryCard";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { SectionHeader } from "../components/ui/SectionHeader";
import { getCategories } from "../services/catalogApi";
import type { Category } from "../types/catalog";

export function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCategories();
      setCategories(response);
    } catch {
      setError("No fue posible cargar las colecciones comerciales.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return (
    <section className="bg-amber-cream py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Colecciones"
          title="Categorías comerciales para descubrir Casa Ámbar."
          description="En esta fase, las colecciones visibles usan las categorías activas del backend para ordenar la navegación comercial inicial."
        />

        <div className="mt-12">
          {isLoading ? (
            <CatalogState
              type="loading"
              title="Cargando colecciones"
              message="Estamos consultando las categorías activas desde la API."
            />
          ) : null}

          {!isLoading && error ? (
            <CatalogState
              type="error"
              title="No se pudieron cargar las colecciones"
              message={error}
              action={
                <Button onClick={() => void loadCategories()} variant="secondary">
                  Reintentar
                </Button>
              }
            />
          ) : null}

          {!isLoading && !error && categories.length === 0 ? (
            <CatalogState
              type="empty"
              title="Aún no hay colecciones publicadas"
              message="Cuando existan categorías activas en el backend, aparecerán aquí."
            />
          ) : null}

          {!isLoading && !error && categories.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
