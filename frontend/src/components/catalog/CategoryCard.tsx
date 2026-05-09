import { Link } from "react-router-dom";

import { routes } from "../../lib/routes";
import type { Category } from "../../types/catalog";
import { Card } from "../ui/Card";

type CategoryCardProps = {
  category: Category;
  index: number;
};

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden" hover>
      <div className="relative min-h-52 bg-amber-cream">
        <div className="absolute inset-5 border border-amber-line bg-amber-ivory/60" />
        <div className="absolute left-8 top-8 h-20 w-16 border border-amber-gold bg-amber-softGold/25" />
        <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full border border-amber-gold/60" />
        <div className="absolute inset-x-10 bottom-12 h-px bg-amber-gold/60" />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-gold">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-4 font-heading text-4xl font-semibold text-amber-black">
          {category.name}
        </h2>
        <p className="mt-3 text-sm leading-7 text-amber-stone">
          {category.description || "Selección editorial de joyería fina Casa Ámbar."}
        </p>
        <Link
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-amber-espresso transition-colors hover:text-amber-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold"
          to={routes.category(category.slug)}
        >
          Ver colección
        </Link>
      </div>
    </Card>
  );
}
