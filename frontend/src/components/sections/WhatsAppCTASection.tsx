import { siteConfig } from "../../constants/site";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";


export function WhatsAppCTASection() {
  const whatsappLink = buildWhatsAppLink({
    phoneNumber: siteConfig.whatsappNumber,
    message: siteConfig.whatsappMessage,
  });

  return (
    <section id="whatsapp" className="bg-amber-ivory py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 border border-amber-line bg-amber-black p-8 text-amber-ivory shadow-premium sm:p-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-softGold">
              Atención directa
            </p>
            <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight sm:text-6xl">
              ¿Buscas una pieza especial?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-amber-muted sm:text-lg">
              Escríbenos por WhatsApp y te ayudamos a elegir, cotizar o diseñar una joya para la ocasión.
            </p>
          </div>

          <div className="lg:text-right">
            <Button
              href={whatsappLink}
              rel="noreferrer"
              target="_blank"
              size="lg"
            >
              Escribir por WhatsApp
            </Button>
            <p className="mt-4 text-sm leading-6 text-amber-muted">
              Número temporal configurable. Validar con el cliente antes de producción.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
