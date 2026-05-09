import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { formatMoney, parseMoneyValue } from "../../lib/formatMoney";
import { routes } from "../../lib/routes";
import type { CartItem as CartItemType } from "../../types/cart";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { decrementItem, incrementItem, removeItem, updateQuantity } = useCart();
  const unitPrice = parseMoneyValue(item.product.price);
  const itemSubtotal = unitPrice * item.quantity;

  return (
    <article className="grid grid-cols-[88px_1fr] gap-4 border-b border-amber-line py-5">
      <Link
        className="overflow-hidden rounded-brand border border-amber-line bg-amber-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
        to={routes.product(item.product.slug)}
      >
        {item.product.image ? (
          <img
            className="aspect-square h-full w-full object-cover"
            src={item.product.image}
            alt={item.product.name}
            loading="lazy"
          />
        ) : (
          <div className="relative aspect-square">
            <div className="absolute inset-3 border border-amber-line bg-amber-ivory" />
            <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-gold/70" />
          </div>
        )}
      </Link>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-muted">
          {item.product.categoryName || "Joyería"}
        </p>
        <Link
          className="mt-1 block font-heading text-2xl font-semibold leading-tight text-amber-black transition-colors hover:text-amber-gold"
          to={routes.product(item.product.slug)}
        >
          {item.product.name}
        </Link>
        <p className="mt-2 text-sm font-semibold text-amber-espresso">
          {formatMoney(unitPrice)}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-brand border border-amber-line bg-white">
            <button
              className="h-9 w-9 text-lg text-amber-black transition-colors hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-gold"
              type="button"
              aria-label={`Reducir cantidad de ${item.product.name}`}
              onClick={() => decrementItem(item.product.id)}
            >
              -
            </button>
            <input
              className="h-9 w-12 border-x border-amber-line bg-transparent text-center text-sm font-semibold text-amber-black outline-none focus-visible:ring-2 focus-visible:ring-amber-softGold/40"
              aria-label={`Cantidad de ${item.product.name}`}
              type="number"
              min={1}
              max={99}
              value={item.quantity}
              onChange={(event) =>
                updateQuantity(item.product.id, Number(event.target.value))
              }
            />
            <button
              className="h-9 w-9 text-lg text-amber-black transition-colors hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-gold"
              type="button"
              aria-label={`Aumentar cantidad de ${item.product.name}`}
              onClick={() => incrementItem(item.product.id)}
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-muted">
              Subtotal
            </p>
            <p className="text-sm font-semibold text-amber-black">
              {formatMoney(itemSubtotal)}
            </p>
          </div>
        </div>

        <button
          className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-amber-stone transition-colors hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
          type="button"
          onClick={() => removeItem(item.product.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
