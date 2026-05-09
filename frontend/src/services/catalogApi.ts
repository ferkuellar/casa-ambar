import { request } from "../lib/api";
import type {
  Category,
  Collection,
  ProductDetail,
  ProductFilters,
  ProductListItem,
} from "../types/catalog";

function buildQueryString(filters?: ProductFilters): string {
  const params = new URLSearchParams();

  Object.entries(filters ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export function getCategories(): Promise<Category[]> {
  return request<Category[]>("/catalog/categories/");
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return request<Category>(`/catalog/categories/${encodeURIComponent(slug)}/`);
}

export function getCollections(): Promise<Collection[]> {
  return request<Collection[]>("/catalog/collections/");
}

export function getCollectionBySlug(slug: string): Promise<Collection> {
  return request<Collection>(`/catalog/collections/${encodeURIComponent(slug)}/`);
}

export function getProducts(filters?: ProductFilters): Promise<ProductListItem[]> {
  return request<ProductListItem[]>(`/catalog/products/${buildQueryString(filters)}`);
}

export function getProductBySlug(slug: string): Promise<ProductDetail> {
  return request<ProductDetail>(`/catalog/products/${encodeURIComponent(slug)}/`);
}
