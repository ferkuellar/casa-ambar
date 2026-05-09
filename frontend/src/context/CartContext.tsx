import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { clearCartItems, loadCartItems, saveCartItems } from "../lib/cartStorage";
import { parseMoneyValue } from "../lib/formatMoney";
import type { CartItem, CartProduct } from "../types/cart";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  clearCart: () => void;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "ADD_ITEM"; product: CartProduct; quantity: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" };

export const CartContext = createContext<CartContextValue | null>(null);

function normalizeQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return MIN_QUANTITY;
  }

  return Math.min(Math.max(Math.floor(quantity), MIN_QUANTITY), MAX_QUANTITY);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "ADD_ITEM": {
      const quantity = normalizeQuantity(action.quantity);
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id,
      );

      if (!existingItem) {
        return {
          ...state,
          isOpen: true,
          items: [...state.items, { product: action.product, quantity }],
        };
      }

      return {
        ...state,
        isOpen: true,
        items: state.items.map((item) =>
          item.product.id === action.product.id
            ? {
                ...item,
                quantity: normalizeQuantity(item.quantity + quantity),
              }
            : item,
        ),
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: normalizeQuantity(action.quantity) }
            : item,
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: loadCartItems(),
    isOpen: false,
  }));

  useEffect(() => {
    if (state.items.length === 0) {
      clearCartItems();
      return;
    }

    saveCartItems(state.items);
  }, [state.items]);

  const totals = useMemo(
    () =>
      state.items.reduce(
        (current, item) => {
          const itemPrice = parseMoneyValue(item.product.price);
          return {
            itemCount: current.itemCount + item.quantity,
            subtotal: current.subtotal + itemPrice * item.quantity,
          };
        },
        { itemCount: 0, subtotal: 0 },
      ),
    [state.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      openCart: () => dispatch({ type: "OPEN_CART" }),
      closeCart: () => dispatch({ type: "CLOSE_CART" }),
      toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
      addItem: (product, quantity = 1) =>
        dispatch({ type: "ADD_ITEM", product, quantity }),
      removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
      updateQuantity: (productId, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
      incrementItem: (productId) =>
        dispatch({ type: "UPDATE_QUANTITY", productId, quantity: getNextQuantity(state.items, productId, 1) }),
      decrementItem: (productId) =>
        dispatch({ type: "UPDATE_QUANTITY", productId, quantity: getNextQuantity(state.items, productId, -1) }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }),
    [state.items, state.isOpen, totals.itemCount, totals.subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function getNextQuantity(items: CartItem[], productId: number, step: number): number {
  const item = items.find((current) => current.product.id === productId);
  return item ? item.quantity + step : MIN_QUANTITY;
}
