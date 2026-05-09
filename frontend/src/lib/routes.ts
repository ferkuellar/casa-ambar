export const routes = {
  home: "/",
  catalog: "/catalogo",
  collections: "/colecciones",
  category: (slug: string) => `/colecciones/${slug}`,
  product: (slug: string) => `/producto/${slug}`,
  customDesign: "/#diseno-personalizado",
  contact: "/#contacto",
} as const;
