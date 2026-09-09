import Image from "next/image";
import SectionHeading from "./SectionHeading";
import HexBadge from "./HexBadge";
import { motto as defaultMotto, symbols } from "@/lib/site-data";
import { getSection, pick } from "@/lib/content";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

const { escudo: defaultEscudo, bandera: defaultBandera, himno } = symbols;

function SymbolFrame({
  title,
  description,
  image,
  alt,
  hexCut = false,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  hexCut?: boolean;
}) {
  return (
    <div className="relative flex flex-col bg-white border-2 border-terracota/50 rounded-2xl shadow-sm p-6 sm:p-8">
      <div
        className={`relative w-full aspect-square bg-cream-soft ${hexCut ? "hex-frame-cut" : "rounded-xl"}`}
      >
        <Image src={image} alt={alt} fill sizes="(max-width: 640px) 90vw, 420px" className="object-contain p-5" />
      </div>
      <div className="mt-6 pt-6 border-t border-terracota/20">
        <span className="text-terracota font-bold text-xs uppercase tracking-wider">Símbolo oficial</span>
        <h4 className="font-display text-[17px] font-bold mt-1.5 mb-2">{title}</h4>
        <p className="text-[14.5px] leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}

export default async function SchoolSymbols() {
  const content = await getSection("simbolos");

  const motto = pick(content, "lema", defaultMotto);
  const escudo = {
    title: pick(content, "escudo_titulo", defaultEscudo.title),
    description: pick(content, "escudo_descripcion", defaultEscudo.description),
    image: pick(content, "escudo_imagen", defaultEscudo.image),
  };
  const bandera = {
    title: pick(content, "bandera_titulo", defaultBandera.title),
    description: pick(content, "bandera_descripcion", defaultBandera.description),
    image: pick(content, "bandera_imagen", defaultBandera.image),
  };
  const himnoVideoUrl = pick(content, "himno_video_url", "");
  const himnoEmbedUrl = himnoVideoUrl ? getYoutubeEmbedUrl(himnoVideoUrl) : null;

  return (
    <section id="nuestros-simbolos" className="bg-cream-soft py-16 sm:py-[88px] px-5 sm:px-8">
      <div className="max-w-[1160px] mx-auto">
        <SectionHeading eyebrow="Identidad institucional" title="Nuestros símbolos" />

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-wider">Lema institucional</span>
          <h3 className="font-display text-2xl sm:text-[28px] font-bold mt-3 leading-snug">&ldquo;{motto}&rdquo;</h3>
        </div>

        <div className="grid gap-8 sm:gap-10 items-stretch [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <SymbolFrame
            title={escudo.title}
            description={escudo.description}
            image={escudo.image}
            alt={`${escudo.title} de la Institución Educativa Lazarillo de Tormes`}
            hexCut
          />
          <SymbolFrame
            title={bandera.title}
            description={bandera.description}
            image={bandera.image}
            alt={`${bandera.title} de la Institución Educativa Lazarillo de Tormes`}
          />
        </div>

        <div className="relative bg-white border-2 border-terracota/50 rounded-2xl shadow-sm p-6 sm:p-10 mt-10">
          <HexBadge tone="terracota" className="w-12 h-12 mb-5">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </HexBadge>
          <span className="text-terracota font-bold text-xs uppercase tracking-wider">{himno.eyebrow}</span>
          <h3 className="font-display text-xl sm:text-[22px] font-bold mt-3 mb-4">{himno.title}</h3>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="space-y-5">
              {himno.stanzas.map((stanza, i) => (
                <div key={i}>
                  <p className={`text-[15px] mb-1 ${stanza.label === "CORO" ? "font-bold text-ink" : "text-ink-soft"}`}>
                    {stanza.label}
                  </p>
                  <p className="text-[15px] leading-relaxed text-ink-soft whitespace-pre-line">
                    {stanza.lines.join("\n")}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-cream-soft border border-terracota/30">
              {himnoEmbedUrl ? (
                <iframe
                  src={himnoEmbedUrl}
                  title={himno.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-terracota">
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="2.5" y="5.5" width="14" height="13" rx="2.5" />
                    <path d="M16.5 10.5 21 7.5v9l-4.5-3" />
                  </svg>
                  <span className="text-sm font-semibold">Video próximamente</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted border-t border-border mt-6 pt-4">Letra: {himno.author}</p>
        </div>
      </div>
    </section>
  );
}
