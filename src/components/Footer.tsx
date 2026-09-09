import Image from "next/image";
import { getSection } from "@/lib/content";
import { getContactInfo, getSocialLinks } from "@/lib/socials";
import { toWhatsappUrl } from "@/lib/whatsapp";

const quickLinks = [
  { href: "#sobre-nosotros", label: "Sobre nosotros" },
  { href: "#oferta-educativa", label: "Oferta educativa" },
  { href: "#momentos-lazarillo", label: "Momentos Lazarillo" },
  { href: "#noticias", label: "Noticias" },
  { href: "#admisiones", label: "Admisiones" },
];

export default async function Footer() {
  const content = await getSection("contacto");
  const { telefono, email, direccion } = getContactInfo(content);
  const socials = getSocialLinks(content);

  return (
    <footer className="bg-footer text-footer-text pt-14 sm:pt-16 pb-7 px-5 sm:px-8 mt-auto">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid gap-10 mb-11 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.jpg"
                alt="Logo Institución Educativa Lazarillo de Tormes"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover bg-dark-soft"
              />
              <span className="font-display font-bold text-[15px] text-white">Lazarillo de Tormes</span>
            </div>
            <p className="text-[13.5px] leading-relaxed max-w-[280px] mb-4">
              Institución educativa privada en Puerto Carreño, Vichada. Formamos con amor, valores y raíces
              vichadenses desde 2018.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full bg-dark-soft text-footer-text flex items-center justify-center hover:bg-yellow hover:text-ink transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-white font-display text-sm font-bold mb-4">Enlaces rápidos</h5>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-white font-display text-sm font-bold mb-4">Oferta educativa</h5>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              <span>Preescolar</span>
              <span>Primaria</span>
              <span>Bachillerato</span>
            </div>
          </div>

          <div>
            <h5 className="text-white font-display text-sm font-bold mb-4">Contacto</h5>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              <span>{direccion}</span>
              <a href={toWhatsappUrl(telefono)} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {telefono}
              </a>
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-5 text-[12.5px] text-center text-faint">
          © 2026 Institución Educativa Lazarillo de Tormes. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
