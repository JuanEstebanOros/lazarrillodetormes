import { WhatsappIcon } from "./SocialIcons";
import { contact as defaultContact } from "@/lib/site-data";
import { getSection, pick } from "@/lib/content";
import { toWhatsappUrl } from "@/lib/whatsapp";

export default async function WhatsappFloatingButton() {
  const content = await getSection("contacto");
  const telefono = pick(content, "contacto_telefono", defaultContact.telefono);
  const whatsappUrl = toWhatsappUrl(telefono, "Hola, quiero información sobre el colegio");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.32)] hover:scale-110 transition-all duration-200"
    >
      <WhatsappIcon className="w-7 h-7" />
    </a>
  );
}
