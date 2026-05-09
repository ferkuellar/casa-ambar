import { siteConfig } from "../../constants/site";
import { Container } from "../ui/Container";


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-amber-line bg-amber-black text-amber-ivory">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <a className="font-heading text-3xl font-semibold" href="#inicio">
              {siteConfig.name}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-7 text-amber-muted">
              {siteConfig.description} Experiencia de compra asistida para elegir piezas disponibles con calma.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-softGold">
              Navegación
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-amber-muted">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a className="transition-colors hover:text-amber-ivory" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-softGold">
              Contacto
            </h2>
            <address className="mt-4 not-italic text-sm leading-7 text-amber-muted">
              contacto@casaambar.mx
              <br />
              WhatsApp próximamente
              <br />
              {siteConfig.location}
            </address>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-softGold">
              Horarios
            </h2>
            <p className="mt-4 text-sm leading-7 text-amber-muted">
              Lunes a viernes
              <br />
              10:00 a 18:00
              <br />
              Citas y atención por WhatsApp
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-amber-muted">
          © {year} Casa Ámbar. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
