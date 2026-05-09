import type { ProductDetail } from "../../types/catalog";
import { LeadForm } from "./LeadForm";

type ProductInterestFormProps = {
  product: ProductDetail;
};

export function ProductInterestForm({ product }: ProductInterestFormProps) {
  return (
    <LeadForm
      leadType="PRODUCT_INTEREST"
      productId={product.id}
      productName={product.name}
      source="product_detail"
      title="Me interesa esta pieza"
      description="Déjanos tus datos y el equipo de Casa Ámbar te contactará para confirmar disponibilidad, precio y próximos pasos."
      submitLabel="Enviar solicitud"
      initialMessage={`Hola, me interesa la pieza ${product.name}. Me gustaría recibir disponibilidad y detalles.`}
    />
  );
}
