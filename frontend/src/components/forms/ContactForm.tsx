import { LeadForm } from "./LeadForm";

export function ContactForm() {
  return (
    <LeadForm
      leadType="GENERAL_CONTACT"
      source="home_contact"
      title="Hablemos de tu próxima pieza"
      description="Envíanos tus datos y una nota breve. Te contactaremos para resolver dudas, citas boutique o disponibilidad."
      submitLabel="Enviar mensaje"
      initialMessage="Me interesa conocer más sobre Casa Ámbar."
    />
  );
}
