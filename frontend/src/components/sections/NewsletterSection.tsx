import { Button } from "../ui/Button";
import { Container } from "../ui/Container";


export function NewsletterSection() {
  return (
    <section id="contacto" className="border-t border-amber-line bg-amber-cream py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-gold">
              Contacto
            </p>
            <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-amber-black sm:text-6xl">
              Recibe novedades y aperturas de colección.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-amber-stone">
              Déjanos tu correo para recibir noticias de Casa Ámbar cuando el catálogo y las citas boutique estén disponibles.
            </p>
          </div>

          <form
            className="rounded-brand border border-amber-line bg-amber-ivory p-5 shadow-premium sm:p-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="text-sm font-semibold text-amber-espresso" htmlFor="newsletter-email">
              Correo electrónico
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                className="min-h-12 flex-1 rounded-brand border border-amber-line bg-white px-4 text-sm text-amber-black outline-none transition focus:border-amber-gold"
                id="newsletter-email"
                name="email"
                placeholder="correo@ejemplo.com"
                type="email"
              />
              <Button type="submit" variant="secondary">
                Suscribirme
              </Button>
            </div>
            <p className="mt-4 text-sm leading-6 text-amber-stone">
              Formulario visual sin envío real. La integración queda pendiente para una fase posterior.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
