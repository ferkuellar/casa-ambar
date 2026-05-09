import { LeadForm } from "./LeadForm";

export function CustomDesignForm() {
  return (
    <LeadForm
      leadType="GENERAL_CONTACT"
      source="purchase_advisory"
      title="Recibe asesoría"
      description="Comparte la ocasión, presupuesto y tipo de pieza que buscas. Te contactaremos con opciones disponibles."
      submitLabel="Solicitar asesoría"
      showCustomFields
      initialMessage="Quiero recibir asesoría para elegir una pieza disponible de Casa Ámbar."
    />
  );
}
