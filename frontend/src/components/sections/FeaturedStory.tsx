import { Container } from "../ui/Container";


export function FeaturedStory() {
  return (
    <section id="historia" className="bg-amber-ivory py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="border-y border-amber-line py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-gold">
              Nuestra historia
            </p>
            <h2 className="mt-5 max-w-3xl font-heading text-5xl font-semibold leading-tight text-amber-black sm:text-6xl">
              Diseñada para admirarse. Creada para recordarse.
            </h2>
          </div>
          <div className="bg-amber-black p-8 text-amber-ivory sm:p-10">
            <p className="font-heading text-3xl leading-tight">
              Casa Ámbar nace para acompañar momentos con intención: promesas, celebraciones, regalos y piezas personales.
            </p>
            <p className="mt-6 text-base leading-8 text-amber-muted">
              Esta base visual prioriza el ritmo editorial, la claridad de navegación y una experiencia preparada para catálogo sin comprometer el alcance técnico de la fase.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
