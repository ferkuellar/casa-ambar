import { Link } from "react-router-dom";

import { routes } from "../../lib/routes";

export function EmptyCart() {
  return (
    <div className="rounded-brand border border-amber-line bg-amber-cream p-6 text-center">
      <h3 className="font-heading text-3xl font-semibold text-amber-black">
        Tu selección está vacía
      </h3>
      <p className="mt-3 text-sm leading-7 text-amber-stone">
        Explora el catálogo y agrega piezas con precio disponible.
      </p>
      <Link
        className="mt-6 inline-flex items-center justify-center rounded-brand border border-amber-gold bg-amber-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-amber-black transition-colors hover:border-amber-softGold hover:bg-amber-softGold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
        to={routes.catalog}
      >
        Ver catálogo
      </Link>
    </div>
  );
}
