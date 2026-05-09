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
      "Símbolos íntimos para promesas, aniversarios y momentos personales.",
    cta: "Explorar anillos",
  },
  {
    name: "Argollas",
    description:
      "Piezas pensadas para acompañar una historia compartida.",
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
      "Una silueta cálida y delicada pensada para promesas personales.",
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
    title: "Cuéntanos tu idea",
    description:
      "Partimos de la ocasión, la intención y las referencias que quieres conservar.",
  },
  {
    title: "Definimos diseño y materiales",
    description:
      "Aterrizamos proporciones, acabados y una dirección clara antes de producir.",
  },
  {
    title: "Creamos una pieza con intención",
    description:
      "La pieza se prepara con seguimiento cercano y atención al detalle.",
  },
];

export const trustItems: TrustItem[] = [
  {
    title: "Atención boutique",
    description:
      "Acompañamiento cercano para elegir, cotizar o proyectar una pieza con calma.",
  },
  {
    title: "Diseño personalizado",
    description:
      "Proceso pensado para transformar historias, promesas y regalos en piezas únicas.",
  },
  {
    title: "Entrega y seguimiento",
    description:
      "Comunicación clara durante el proceso y preparación cuidadosa de cada pieza.",
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
    quote: "El diseño se sintió personal desde el primer contacto.",
    author: "Cliente Casa Ámbar",
  },
];
