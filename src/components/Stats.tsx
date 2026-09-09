import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { cifras as defaultCifras } from "@/lib/site-data";
import { getSection, pick } from "@/lib/content";

export default async function Stats() {
  const content = await getSection("cifras");
  const cifras = defaultCifras.map((cifra, i) => ({
    num: pick(content, `cifra${i + 1}_num`, cifra.num),
    label: pick(content, `cifra${i + 1}_label`, cifra.label),
  }));

  return (
    <section className="relative overflow-hidden bg-yellow-pale py-16 sm:py-[72px] px-5 sm:px-8">
      <div
        className="absolute top-1/2 -left-20 -translate-y-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] opacity-[0.40] pointer-events-none select-none rotate-[20deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <SectionHeading eyebrow="Lazarillo en cifras" title="Una comunidad que crece cada año" />
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {cifras.map((cifra) => (
            <div key={cifra.label} className="bg-cream-soft rounded-2xl p-9 text-center">
              <div className="font-display font-extrabold text-4xl text-gold">{cifra.num}</div>
              <div className="text-[15px] font-semibold text-ink mt-2">{cifra.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
