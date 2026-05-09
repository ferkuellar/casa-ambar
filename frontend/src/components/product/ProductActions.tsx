import { siteConfig } from "../../constants/site";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import type { ProductDetail } from "../../types/catalog";
import { Button } from "../ui/Button";

type ProductActionsProps = {
  product: ProductDetail;
};

export function ProductActions({ product }: ProductActionsProps) {
  const whatsappHref = buildWhatsAppLink({
    phoneNumber: siteConfig.whatsappNumber,
    message: `Hola, me interesa la pieza ${product.name}. ¿Me pueden compartir disponibilidad y detalles?`,
  });
  const primaryLabel = product.requires_quote ? "Consultar precio" : "Solicitar compra";

  return (
    <section className="rounded-brand border border-amber-line bg-amber-cream p-6">
      <h2 className="sr-only">Acciones de producto</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          className="w-full"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          size="lg"
        >
          {primaryLabel}
        </Button>
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
        La compra se coordina de forma personalizada con el equipo de Casa Ámbar.
      </p>
    </section>
  );
}
