export const routes = {
  home: "/",
  catalog: "/catalogo",
  collections: "/colecciones",
  category: (slug: string) => `/colecciones/${slug}`,
  product: (slug: string) => `/producto/${slug}`,
  customDesign: "/#asesoria",
  contact: "/#contacto",
} as const;
