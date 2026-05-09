export const routes = {
  home: "/",
  catalog: "/catalogo",
  collections: "/colecciones",
  category: (slug: string) => `/colecciones/${slug}`,
  customDesign: "/#diseno-personalizado",
  contact: "/#contacto",
} as const;
