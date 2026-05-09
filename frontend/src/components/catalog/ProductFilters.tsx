import type { Category } from "../../types/catalog";

type ProductFiltersProps = {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  showFeatured: boolean;
  onFeaturedChange: (value: boolean) => void;
  showQuoteOnly: boolean;
  onQuoteOnlyChange: (value: boolean) => void;
};

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  showFeatured,
  onFeaturedChange,
  showQuoteOnly,
  onQuoteOnlyChange,
}: ProductFiltersProps) {
  return (
    <aside className="rounded-brand border border-amber-line bg-amber-ivory p-5">
      <h2 className="font-heading text-2xl font-semibold text-amber-black">
        Filtros
      </h2>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.16em] text-amber-stone">
        Categoría
        <select
          className="mt-2 w-full rounded-brand border border-amber-line bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal text-amber-black outline-none transition focus:border-amber-gold focus:ring-2 focus:ring-amber-softGold/40"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6 space-y-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-amber-stone">
          <input
            className="mt-1 h-4 w-4 rounded border-amber-line text-amber-gold focus:ring-amber-gold"
            type="checkbox"
            checked={showFeatured}
            onChange={(event) => onFeaturedChange(event.target.checked)}
          />
          <span>
            <span className="block font-semibold text-amber-black">Destacados</span>
            Mostrar solo piezas destacadas.
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm leading-6 text-amber-stone">
          <input
            className="mt-1 h-4 w-4 rounded border-amber-line text-amber-gold focus:ring-amber-gold"
            type="checkbox"
            checked={showQuoteOnly}
            onChange={(event) => onQuoteOnlyChange(event.target.checked)}
          />
          <span>
            <span className="block font-semibold text-amber-black">
              Cotización requerida
            </span>
            Mostrar piezas con precio bajo consulta.
          </span>
        </label>
      </div>
    </aside>
  );
}
