import { ContactForm } from "../forms/ContactForm";
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
              Agenda una conversación con Casa Ámbar.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-amber-stone">
              Comparte tus datos para resolver dudas, consultar disponibilidad o revisar opciones de compra asistida.
            </p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
