import { trustItems } from "../../constants/home";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

export function TrustSection() {
  return (
    <section className="bg-amber-espresso py-20 text-amber-ivory sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Confianza"
          title="Comprar joyería con claridad."
          description="Casa Ámbar acompaña la elección de piezas disponibles con información clara, atención cercana y seguimiento ordenado."
          align="center"
          tone="inverse"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((benefit) => (
            <Card
              className="border-white/10 bg-white/[0.04] p-6 shadow-none"
              key={benefit.title}
            >
              <h3 className="font-heading text-3xl font-semibold text-amber-ivory">
                {benefit.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-amber-muted">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
