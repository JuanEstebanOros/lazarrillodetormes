import type { ComponentType } from "react";
import { FacebookIcon, InstagramIcon, YoutubeIcon, MailIcon, WhatsappIcon } from "@/components/SocialIcons";
import { contact as defaultContact } from "@/lib/site-data";
import { pick, pickOptional, type ContentMap } from "@/lib/content";
import { toWhatsappUrl } from "@/lib/whatsapp";

export type SocialLink = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

/** Reads the shared contacto_* fields (telefono/email/direccion) used across the site. */
export function getContactInfo(content: ContentMap) {
  return {
    telefono: pick(content, "contacto_telefono", defaultContact.telefono),
    email: pick(content, "contacto_email", defaultContact.email),
    direccion: pick(content, "contacto_direccion", defaultContact.direccion),
  };
}

/**
 * Builds the ordered list of social icons shown in the Footer and Contact section.
 * Facebook/Instagram/YouTube are hidden (not shown as a broken link) when their
 * SiteContent field is empty; correo and WhatsApp always read the shared contact info.
 */
export function getSocialLinks(content: ContentMap): SocialLink[] {
  const { telefono, email } = getContactInfo(content);
  const facebook = pickOptional(content, "redes_facebook", defaultContact.facebook);
  const instagram = pickOptional(content, "redes_instagram", defaultContact.instagram);
  const youtube = pickOptional(content, "redes_youtube", defaultContact.youtube);

  const links: (SocialLink | null)[] = [
    facebook ? { href: facebook, label: "Facebook", Icon: FacebookIcon } : null,
    instagram ? { href: instagram, label: "Instagram", Icon: InstagramIcon } : null,
    youtube ? { href: youtube, label: "YouTube", Icon: YoutubeIcon } : null,
    email ? { href: `mailto:${email}`, label: "Correo", Icon: MailIcon } : null,
    telefono ? { href: toWhatsappUrl(telefono), label: "WhatsApp", Icon: WhatsappIcon } : null,
  ];

  return links.filter((link): link is SocialLink => link !== null);
}
