import { useEffect } from "react";

import { useCart } from "../../hooks/useCart";
import { cn } from "../../lib/cn";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const { closeCart, isOpen, items } = useCart();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCart, isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] transition",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <button
        className={cn(
          "absolute inset-0 bg-amber-black/50 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        type="button"
        aria-label="Cerrar carrito"
        onClick={closeCart}
      />

      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(100%,440px)] flex-col bg-amber-ivory shadow-premium transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="flex items-center justify-between gap-4 border-b border-amber-line p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-gold">
              Carrito
            </p>
            <h2
              className="font-heading text-4xl font-semibold text-amber-black"
              id="cart-drawer-title"
            >
              Tu selección
            </h2>
          </div>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-brand border border-amber-line text-2xl leading-none text-amber-black transition-colors hover:border-amber-gold hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
            type="button"
            aria-label="Cerrar carrito"
            onClick={closeCart}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div>
                {items.map((item) => (
                  <CartItem item={item} key={item.product.id} />
                ))}
              </div>
              <CartSummary />
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
