import { routes } from "../lib/routes";

export const siteConfig = {
  name: "Casa Ámbar",
  location: "Chihuahua, México",
  description:
    "Joyería fina boutique con diseño personalizado y atención cercana.",
  whatsappNumber: "520000000000",
  whatsappMessage: "Hola, me interesa conocer las piezas de Casa Ámbar.",
  navLinks: [
    { label: "Inicio", href: routes.home },
    { label: "Colecciones", href: routes.collections },
    { label: "Catálogo", href: routes.catalog },
    { label: "Diseño personalizado", href: routes.customDesign },
    { label: "Contacto", href: routes.contact },
  ],
};
