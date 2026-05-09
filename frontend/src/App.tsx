import { HealthCheck } from "./components/HealthCheck";


export default function App() {
  return (
    <main className="min-h-screen bg-warmBlack text-ivory">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <a className="font-display text-xl tracking-wide text-ivory" href="/">
            Casa Ámbar
          </a>
          <span className="border border-amberGold/40 px-3 py-1 text-xs uppercase tracking-[0.22em] text-amberGold">
            Fase 0
          </span>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-amberGold">
              E-commerce boutique en construcción
            </p>
            <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
              Casa Ámbar
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
              Fundación técnica lista para catálogo, productos, pagos y una
              experiencia premium de joyería fina.
            </p>
          </div>

          <HealthCheck />
        </div>

        <footer className="border-t border-white/10 pt-5 text-sm text-white/45">
          React + Vite + TypeScript conectado a Django REST Framework.
        </footer>
      </section>
    </main>
  );
}
