import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";


const benefits = [
  {
    title: "Atención boutique",
    description: "Acompañamiento cercano para elegir o proyectar una pieza con intención.",
  },
  {
    title: "Diseño personalizado",
    description: "Base visual preparada para solicitudes a medida y flujos de cotización.",
  },
  {
    title: "Compra segura próximamente",
    description: "La arquitectura queda lista para integrar pagos y validaciones en fases posteriores.",
  },
];

export function TrustSection() {
  return (
    <section id="diseno-personalizado" className="bg-amber-espresso py-20 text-amber-ivory sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Experiencia"
          title="Lujo discreto, atención clara."
          description="Beneficios iniciales planteados como bloques de confianza para evolucionar después con contenido real."
          align="center"
          tone="inverse"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
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
