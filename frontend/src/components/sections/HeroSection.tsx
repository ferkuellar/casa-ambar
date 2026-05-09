import { Button } from "../ui/Button";
import { Container } from "../ui/Container";


export function HeroSection() {
  return (
    <section id="inicio" className="bg-amber-ivory">
      <Container className="grid min-h-[calc(100vh-5rem)] gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-gold">
            Boutique de joyería fina
          </p>
          <h1 className="mt-5 font-heading text-6xl font-semibold leading-none text-amber-black sm:text-7xl lg:text-8xl">
            Casa Ámbar
          </h1>
          <p className="mt-6 max-w-xl font-heading text-3xl leading-tight text-amber-espresso sm:text-4xl">
            Piezas listas para regalar, celebrar y conservar.
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-amber-stone sm:text-lg">
            Selección curada de anillos, argollas, collares y aretes con atención boutique en Chihuahua. Te ayudamos a elegir la pieza correcta según ocasión, estilo y disponibilidad.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/catalogo" size="lg">Comprar joyería</Button>
            <Button href="#asesoria" size="lg" variant="secondary">
              Pedir asesoría
            </Button>
          </div>

          <dl className="mt-10 grid gap-4 border-y border-amber-line py-6 sm:grid-cols-3">
            {["Piezas curadas", "Compra asistida", "Atención boutique"].map((item) => (
              <div key={item}>
                <dt className="sr-only">Indicador</dt>
                <dd className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-stone">
                  {item}
                </dd>
              </div>
            ))}
          </dl>
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
              Nueva selección
            </p>
            <p className="mt-3 font-heading text-3xl leading-tight text-amber-black">
              Joyería fina para descubrir y apartar con calma.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
