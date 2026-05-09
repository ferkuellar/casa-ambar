import type {
  CollectionPreview,
  FeaturedProduct,
  ProcessStep,
  Testimonial,
  TrustItem,
} from "../types/home";


export const collections: CollectionPreview[] = [
  {
    name: "Anillos",
    description:
      "Piezas seleccionadas para promesas, aniversarios y uso diario.",
    cta: "Explorar anillos",
  },
  {
    name: "Argollas",
    description:
      "Modelos disponibles para celebrar una historia compartida.",
    cta: "Ver argollas",
  },
  {
    name: "Collares",
    description: "Detalles luminosos para elevar lo cotidiano.",
    cta: "Descubrir collares",
  },
  {
    name: "Aretes",
    description: "Elegancia discreta para regalar o conservar.",
    cta: "Conocer aretes",
  },
];

export const featuredProducts: FeaturedProduct[] = [
  {
    name: "Anillo Aurora",
    category: "Anillos",
    description:
      "Una silueta cálida y delicada para promesas personales.",
    priceLabel: "Consultar precio",
  },
  {
    name: "Collar Ámbar",
    category: "Collares",
    description:
      "Punto de luz sutil para regalar o conservar como pieza diaria.",
    priceLabel: "Consultar precio",
  },
  {
    name: "Aretes Siena",
    category: "Aretes",
    description:
      "Proporciones limpias y brillo discreto para ocasiones especiales.",
    priceLabel: "Consultar precio",
  },
];

export const customDesignSteps: ProcessStep[] = [
  {
    title: "Elige la ocasión",
    description:
      "Te ayudamos a ubicar piezas disponibles según regalo, compromiso, aniversario o uso diario.",
  },
  {
    title: "Revisamos opciones",
    description:
      "Compartimos disponibilidad, materiales, medidas y rangos de precio para decidir con claridad.",
  },
  {
    title: "Aparta o agenda",
    description:
      "Coordinamos compra asistida, apartado o cita boutique para que la pieza llegue en el momento correcto.",
  },
];

export const trustItems: TrustItem[] = [
  {
    title: "Atención boutique",
    description:
      "Acompañamiento cercano para elegir una pieza disponible con calma.",
  },
  {
    title: "Piezas curadas",
    description:
      "Selección boutique de anillos, argollas, collares y aretes listos para venta o apartado.",
  },
  {
    title: "Disponibilidad clara",
    description:
      "Confirmamos existencia, precio y tiempos antes de avanzar con la compra.",
  },
  {
    title: "Compra segura próximamente",
    description:
      "La arquitectura queda lista para pagos y validaciones en fases posteriores.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Una atención cercana y una pieza preciosa para un momento muy especial.",
    author: "Cliente Casa Ámbar",
  },
  {
    quote: "Me ayudaron a elegir un regalo elegante sin sentir presión.",
    author: "Cliente Casa Ámbar",
  },
  {
    quote: "Encontré una pieza elegante sin tener que buscar en muchas tiendas.",
    author: "Cliente Casa Ámbar",
  },
];
