type WhatsAppLinkInput = {
  phoneNumber: string;
  message: string;
};

export function buildWhatsAppLink({
  phoneNumber,
  message,
}: WhatsAppLinkInput): string {
  const normalizedPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
