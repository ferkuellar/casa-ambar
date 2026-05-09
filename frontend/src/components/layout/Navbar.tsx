import { useState } from "react";

import { siteConfig } from "../../constants/site";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-line bg-amber-ivory/95 backdrop-blur">
      <Container>
        <nav className="flex min-h-20 items-center justify-between gap-6" aria-label="Principal">
          <a
            className="font-heading text-2xl font-semibold text-amber-black transition-colors hover:text-amber-gold"
            href="#inicio"
          >
            {siteConfig.name}
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                className="text-sm font-medium text-amber-stone transition-colors hover:text-amber-black"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button size="sm" variant="secondary">
              Cotizar pieza
            </Button>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-brand border border-amber-line text-amber-black transition-colors hover:border-amber-gold hover:text-amber-gold lg:hidden"
            type="button"
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="sr-only">Menú</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className={cn("h-px bg-current transition", isOpen && "translate-y-2 rotate-45")} />
              <span className={cn("h-px bg-current transition", isOpen && "opacity-0")} />
              <span className={cn("h-px bg-current transition", isOpen && "-translate-y-2 -rotate-45")} />
            </span>
          </button>
        </nav>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-200 lg:hidden",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <div className="flex flex-col gap-1 border-t border-amber-line py-4">
              {siteConfig.navLinks.map((link) => (
                <a
                  className="rounded-brand px-2 py-3 text-sm font-medium text-amber-stone transition-colors hover:bg-amber-cream hover:text-amber-black"
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-3 w-full" size="md" variant="primary">
                Cotizar pieza
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
