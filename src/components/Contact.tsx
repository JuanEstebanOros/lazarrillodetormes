import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";
import { getSection } from "@/lib/content";
import { getContactInfo, getSocialLinks } from "@/lib/socials";

export default async function Contact() {
  const content = await getSection("contacto");
  const { telefono, email, direccion } = getContactInfo(content);
  const socials = getSocialLinks(content);

  const contactInfo = [
    { label: "Dirección", value: direccion },
    { label: "Teléfono", value: telefono },
    { label: "Correo", value: email },
    { label: "Horario de atención", value: "Lunes a viernes, 7:00 a.m. – 3:00 p.m." },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden bg-white py-16 sm:py-[88px] px-5 sm:px-8">
      <div
        className="absolute -right-16 -top-14 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] opacity-[0.40] pointer-events-none select-none rotate-[15deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute -left-20 bottom-0 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] opacity-[0.34] pointer-events-none select-none rotate-[-100deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <SectionHeading eyebrow="Contáctanos" title="Estamos aquí para acompañarte" />

        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <ContactForm />

          <div className="flex flex-col gap-5">
            <div className="bg-ink rounded-[18px] p-8 text-white">
              {contactInfo.map((item) => (
                <div key={item.label} className="mb-4.5">
                  <div className="text-[13px] text-yellow font-bold uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="text-[15px] leading-snug">{item.value}</div>
                </div>
              ))}
              <div className="flex gap-2.5 flex-wrap mt-5">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-full bg-yellow text-ink flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] overflow-hidden h-[180px] border border-border">
              <iframe
                title="Ubicación Institución Educativa Lazarillo de Tormes"
                src="https://maps.google.com/maps?q=6.1907923,-67.4805624&z=16&output=embed"
                width="100%"
                height="100%"
                className="border-0"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
