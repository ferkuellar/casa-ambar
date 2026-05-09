import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CatalogState } from "../components/catalog/CatalogState";
import { ProductInterestForm } from "../components/forms/ProductInterestForm";
import { ProductActions } from "../components/product/ProductActions";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import { ProductJsonLd } from "../components/product/ProductJsonLd";
import { ProductTechnicalDetails } from "../components/product/ProductTechnicalDetails";
import { RelatedProducts } from "../components/product/RelatedProducts";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { routes } from "../lib/routes";
import { getProductBySlug, getRelatedProducts } from "../services/catalogApi";
import type { ProductDetail, ProductListItem } from "../types/catalog";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!slug) {
      setError("La ruta de producto no es válida.");
      setProduct(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const productResponse = await getProductBySlug(slug);
      const relatedResponse = await getRelatedProducts({
        category: productResponse.category.slug,
        excludeSlug: productResponse.slug,
        limit: 3,
      });

      setProduct(productResponse);
      setRelatedProducts(relatedResponse);
    } catch {
      setProduct(null);
      setRelatedProducts([]);
      setError("No encontramos esta pieza o el backend no respondió.");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  return (
    <>
      <section className="bg-amber-ivory py-16 sm:py-24">
        <Container>
          <Link
            className="mb-8 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-amber-gold transition-colors hover:text-amber-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
            to={routes.catalog}
          >
            Volver al catálogo
          </Link>

          {isLoading ? (
            <CatalogState
              type="loading"
              title="Cargando producto"
              message="Estamos consultando la ficha de producto desde la API."
            />
          ) : null}

          {!isLoading && error ? (
            <CatalogState
              type="error"
              title="Producto no encontrado"
              message={error}
              action={
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button onClick={() => void loadProduct()} variant="secondary">
                    Reintentar
                  </Button>
                  <Button href={routes.catalog}>Ver catálogo</Button>
                </div>
              }
            />
          ) : null}

          {!isLoading && !error && !product ? (
            <CatalogState
              type="empty"
              title="Producto no disponible"
              message="La pieza solicitada no está publicada actualmente."
              action={<Button href={routes.catalog}>Ver catálogo</Button>}
            />
          ) : null}

          {!isLoading && !error && product ? (
            <>
              <ProductJsonLd product={product} />
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
                <ProductGallery images={product.images} productName={product.name} />
                <div className="space-y-8">
                  <ProductInfo product={product} />
                  <ProductActions product={product} />
                  <ProductInterestForm product={product} />
                  <ProductTechnicalDetails product={product} />
                </div>
              </div>
            </>
          ) : null}
        </Container>
      </section>

      {!isLoading && !error && product ? (
        <RelatedProducts products={relatedProducts} />
      ) : null}
    </>
  );
}
