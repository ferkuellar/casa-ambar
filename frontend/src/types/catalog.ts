export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort_order?: number;
  is_active?: boolean;
};

export type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  hero_text?: string;
  sort_order?: number;
  is_featured?: boolean;
  is_active?: boolean;
};

export type ProductImage = {
  id: number;
  image: string;
  image_url: string;
  alt_text: string;
  sort_order?: number;
  is_primary?: boolean;
};

export type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  category: Category;
  price: string | null;
  price_label: string;
  is_featured: boolean;
  requires_quote: boolean;
  primary_image?: ProductImage | null;
};

export type ProductDetail = ProductListItem & {
  description: string;
  collections: Collection[];
  material: string;
  stone: string;
  size: string;
  compare_at_price: string | null;
  sku: string;
  stock: number;
  meta_title: string;
  meta_description: string;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
};

export type ProductFilters = {
  category?: string;
  collection?: string;
  featured?: boolean;
  active?: boolean;
  requires_quote?: boolean;
};
