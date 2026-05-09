import { siteConfig } from "../../constants/site";
import { useCart } from "../../hooks/useCart";
import { toCartProduct } from "../../lib/cartProduct";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import type { ProductDetail } from "../../types/catalog";
import { Button } from "../ui/Button";

type ProductActionsProps = {
  product: ProductDetail;
};

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const cartProduct = toCartProduct(product);
  const whatsappHref = buildWhatsAppLink({
    phoneNumber: siteConfig.whatsappNumber,
    message: `Hola, me interesa la pieza ${product.name}. ¿Me pueden compartir disponibilidad y detalles?`,
  });

  return (
    <section className="rounded-brand border border-amber-line bg-amber-cream p-6">
      <h2 className="sr-only">Acciones de producto</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {cartProduct ? (
          <Button
            className="w-full"
            size="lg"
            onClick={() => addItem(cartProduct)}
          >
            Agregar al carrito
          </Button>
        ) : (
          <Button
            className="w-full"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            size="lg"
          >
            Solicitar cotización
          </Button>
        )}
        <Button
          className="w-full"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          size="lg"
          variant="secondary"
        >
          WhatsApp
        </Button>
      </div>
      <p className="mt-4 text-sm leading-6 text-amber-stone">
        {cartProduct
          ? "Agrega esta pieza a tu selección. Disponibilidad, envío y pago se confirmarán después."
          : "Esta pieza requiere cotización; te contactaremos para confirmar disponibilidad y detalles."}
      </p>
    </section>
  );
}
