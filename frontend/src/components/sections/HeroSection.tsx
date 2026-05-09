import { Button } from "../ui/Button";
import { Container } from "../ui/Container";


export function HeroSection() {
  return (
    <section id="inicio" className="bg-amber-ivory">
      <Container className="grid min-h-[calc(100vh-5rem)] gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-gold">
            Joyería fina boutique
          </p>
          <h1 className="mt-5 font-heading text-6xl font-semibold leading-none text-amber-black sm:text-7xl lg:text-8xl">
            Casa Ámbar
          </h1>
          <p className="mt-6 max-w-xl font-heading text-3xl leading-tight text-amber-espresso sm:text-4xl">
            Joyería fina para momentos que merecen quedarse.
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-amber-stone sm:text-lg">
            Una experiencia boutique en construcción: piezas elegantes, diseño personalizado y atención cercana en Chihuahua.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Explorar colecciones</Button>
            <Button size="lg" variant="secondary">
              Cotizar pieza personalizada
            </Button>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-brand border border-amber-line bg-amber-cream shadow-premium">
          <div className="absolute inset-8 border border-amber-line bg-amber-ivory" />
          <div className="absolute left-8 top-8 h-36 w-28 border border-amber-gold bg-amber-softGold/30" />
          <div className="absolute bottom-8 right-8 h-44 w-32 border border-amber-espresso bg-amber-espresso" />
          <div className="absolute inset-x-12 bottom-20 h-px bg-amber-gold" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-gold/50 bg-amber-ivory shadow-premium">
            <div className="absolute inset-8 rounded-full border border-amber-line" />
            <div className="absolute inset-16 rounded-full bg-amber-gold/20" />
          </div>
          <div className="absolute bottom-12 left-12 max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-gold">
              Fase 1
            </p>
            <p className="mt-3 font-heading text-3xl leading-tight text-amber-black">
              Identidad visual lista para catálogo.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
