import { useCart } from "../../hooks/useCart";

export function CartButton() {
  const { itemCount, toggleCart } = useCart();

  return (
    <button
      className="relative inline-flex h-11 items-center justify-center rounded-brand border border-amber-line px-4 text-xs font-semibold uppercase tracking-[0.14em] text-amber-black transition-colors hover:border-amber-gold hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
      type="button"
      aria-label={`Abrir carrito, ${itemCount} pieza${itemCount === 1 ? "" : "s"}`}
      onClick={toggleCart}
    >
      Carrito
      <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-amber-gold px-2 py-1 text-[11px] leading-none text-amber-black">
        {itemCount}
      </span>
    </button>
  );
}
