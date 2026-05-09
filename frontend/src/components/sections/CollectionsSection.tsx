import { collections } from "../../constants/home";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";


export function CollectionsSection() {
  return (
    <section id="colecciones" className="bg-amber-cream py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Colecciones"
            title="Piezas para prometer, regalar y recordar."
            description="Categorías principales listas para evolucionar hacia un catálogo editorial con productos reales."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {collections.map((collection, index) => (
              <Card className="overflow-hidden" hover key={collection.name}>
                <div className="relative min-h-56 bg-amber-ivory">
                  <div className="absolute inset-5 border border-amber-line" />
                  <div className="absolute left-8 top-8 h-20 w-16 border border-amber-gold bg-amber-softGold/25" />
                  <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full border border-amber-gold/60" />
                  <div className="absolute inset-x-10 bottom-12 h-px bg-amber-gold/60" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-gold">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-heading text-4xl font-semibold text-amber-black">
                    {collection.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-amber-stone">
                    {collection.description}
                  </p>
                  <a
                    className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-amber-espresso transition-colors hover:text-amber-gold"
                    href="#destacados"
                  >
                    {collection.cta}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
