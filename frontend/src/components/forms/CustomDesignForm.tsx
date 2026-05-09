import { LeadForm } from "./LeadForm";

export function CustomDesignForm() {
  return (
    <LeadForm
      leadType="CUSTOM_DESIGN"
      source="custom_design"
      title="Cuéntanos tu idea"
      description="Comparte la ocasión, presupuesto y detalles de la pieza para iniciar una cotización personalizada."
      submitLabel="Enviar idea"
      showCustomFields
      initialMessage="Quiero cotizar una pieza personalizada con Casa Ámbar."
    />
  );
}
