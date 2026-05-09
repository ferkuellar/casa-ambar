import { siteConfig } from "../../constants/site";
import { useCart } from "../../hooks/useCart";
import { formatMoney } from "../../lib/formatMoney";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { Button } from "../ui/Button";

export function CartSummary() {
  const { clearCart, itemCount, items, subtotal } = useCart();
  const cartLines = items
    .map((item) => `${item.quantity} x ${item.product.name}`)
    .join(", ");
  const whatsappHref = buildWhatsAppLink({
    phoneNumber: siteConfig.whatsappNumber,
    message: `Hola, quiero confirmar disponibilidad de mi selección Casa Ámbar: ${cartLines}.`,
  });

  return (
    <section className="mt-6 rounded-brand border border-amber-line bg-amber-cream p-5">
      <h3 className="font-heading text-3xl font-semibold text-amber-black">
        Resumen
      </h3>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-amber-stone">Piezas</dt>
          <dd className="font-semibold text-amber-black">{itemCount}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-amber-line pt-3">
          <dt className="font-semibold text-amber-black">Subtotal</dt>
          <dd className="font-heading text-3xl font-semibold text-amber-black">
            {formatMoney(subtotal)}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-amber-stone">
        Envío, disponibilidad y pago se confirmarán en la siguiente fase.
      </p>
      <div className="mt-5 grid gap-3">
        <Button disabled className="w-full" variant="secondary">
          Checkout próximamente
        </Button>
        <Button
          className="w-full"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          Solicitar por WhatsApp
        </Button>
        <button
          className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-stone transition-colors hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
          type="button"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
      </div>
    </section>
  );
}
