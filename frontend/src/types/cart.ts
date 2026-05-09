export type CartProduct = {
  id: number;
  slug: string;
  name: string;
  price: string;
  priceLabel?: string;
  image?: string | null;
  categoryName?: string;
  requiresQuote: boolean;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

export type CartTotals = {
  itemCount: number;
  subtotal: number;
};
