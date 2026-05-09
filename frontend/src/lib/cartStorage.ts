import type { CartItem } from "../types/cart";

export const CART_STORAGE_KEY = "casa-ambar-cart";

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as CartItem;
  return (
    Boolean(item.product) &&
    typeof item.product.id === "number" &&
    typeof item.product.slug === "string" &&
    typeof item.product.name === "string" &&
    typeof item.product.price === "string" &&
    typeof item.quantity === "number"
  );
}

export function loadCartItems(): CartItem[] {
  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as unknown;
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isCartItem);
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Cart persistence is progressive enhancement; UI state remains usable.
  }
}

export function clearCartItems(): void {
  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Ignore storage failures to keep the cart UI responsive.
  }
}
