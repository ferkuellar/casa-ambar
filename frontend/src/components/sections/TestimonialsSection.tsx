import { testimonials } from "../../constants/home";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";


export function TestimonialsSection() {
  return (
    <section id="testimonios" className="bg-amber-cream py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Reseñas"
          title="Clientes que eligieron con calma."
          description="Referencias editoriales mientras se recopilan reseñas reales de clientas y clientes Casa Ámbar."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card className="p-7" key={testimonial.quote}>
              <blockquote>
                <p className="font-heading text-3xl leading-tight text-amber-black">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-8 border-t border-amber-line pt-5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-gold">
                  {testimonial.author}
                </footer>
              </blockquote>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
