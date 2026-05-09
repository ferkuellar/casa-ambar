import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";


const collections = [
  {
    name: "Anillos",
    description: "Piezas delicadas para promesas, celebraciones y estilo diario.",
    cta: "Ver línea base",
  },
  {
    name: "Argollas",
    description: "Diseños sobrios preparados para integrarse al catálogo nupcial.",
    cta: "Explorar propuesta",
  },
  {
    name: "Collares",
    description: "Siluetas elegantes para regalos personales y momentos memorables.",
    cta: "Conocer edición",
  },
  {
    name: "Aretes",
    description: "Acabados cálidos, proporciones limpias y presencia discreta.",
    cta: "Descubrir piezas",
  },
];

export function CollectionsPreview() {
  return (
    <section id="colecciones" className="bg-amber-cream py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Colecciones"
            title="Categorías preparadas para crecer."
            description="La estructura visual anticipa un catálogo editorial sin conectar todavía productos reales."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {collections.map((collection, index) => (
              <Card className="p-6" hover key={collection.name}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-gold">
                  0{index + 1}
                </p>
                <h3 className="mt-10 font-heading text-4xl font-semibold text-amber-black">
                  {collection.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-amber-stone">
                  {collection.description}
                </p>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-espresso">
                  {collection.cta}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
