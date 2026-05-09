import { customDesignSteps } from "../../constants/home";
import { CustomDesignForm } from "../forms/CustomDesignForm";
import { Container } from "../ui/Container";


export function CustomDesignSection() {
  return (
    <section id="asesoria" className="bg-amber-black py-20 text-amber-ivory sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-softGold">
              Asesoría de compra
            </p>
            <h2 className="mt-5 font-heading text-5xl font-semibold leading-tight sm:text-6xl">
              Te ayudamos a elegir una pieza disponible.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-amber-muted sm:text-lg">
              Cuéntanos la ocasión, el estilo y el presupuesto. En Casa Ámbar revisamos piezas de joyería disponibles para ayudarte a comprar o apartar con seguridad.
            </p>

            <div className="mt-9 space-y-4">
              {customDesignSteps.map((step, index) => (
                <div
                  className="grid gap-5 border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-[4rem_1fr]"
                  key={step.title}
                >
                  <span className="font-heading text-5xl leading-none text-amber-softGold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-3xl font-semibold text-amber-ivory">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-amber-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CustomDesignForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
