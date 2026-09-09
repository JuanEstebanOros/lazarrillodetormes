/** Builds a wa.me link from a phone number in any display format (e.g. "+57 311 800 5429"). */
export function toWhatsappUrl(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}
