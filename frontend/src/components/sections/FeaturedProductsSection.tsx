import { featuredProducts } from "../../constants/home";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";


export function FeaturedProductsSection() {
  return (
    <section id="destacados" className="bg-amber-ivory py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Destacados"
            title="Piezas destacadas de la tienda."
            description="Una selección editorial para conocer el estilo Casa Ámbar antes de explorar todo el catálogo."
          />
          <a
            className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-gold transition-colors hover:text-amber-espresso"
            href="/catalogo"
          >
            Ver catálogo
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Card className="overflow-hidden" hover key={product.name}>
              <div className="relative aspect-[4/5] bg-amber-cream">
                <div className="absolute inset-6 border border-amber-line bg-amber-ivory" />
                <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-gold/70" />
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-softGold/30" />
                <span className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                  0{index + 1}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-muted">
                  {product.category}
                </p>
                <h3 className="mt-3 font-heading text-4xl font-semibold text-amber-black">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-amber-stone">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-amber-line pt-5">
                  <span className="text-sm font-semibold text-amber-espresso">
                    {product.priceLabel}
                  </span>
                  <a
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-gold transition-colors hover:text-amber-espresso"
                    href="/catalogo"
                  >
                    Ver piezas
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
