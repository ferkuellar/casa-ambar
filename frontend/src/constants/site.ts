import { routes } from "../lib/routes";

export const siteConfig = {
  name: "Casa Ámbar",
  location: "Chihuahua, México",
  description:
    "Tienda boutique de joyería fina con piezas curadas y atención cercana.",
  whatsappNumber: "520000000000",
  whatsappMessage: "Hola, me interesa conocer las piezas de Casa Ámbar.",
  navLinks: [
    { label: "Inicio", href: routes.home },
    { label: "Colecciones", href: routes.collections },
    { label: "Catálogo", href: routes.catalog },
    { label: "Asesoría", href: routes.customDesign },
    { label: "Contacto", href: routes.contact },
  ],
};
