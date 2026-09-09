import SectionHeading from "./SectionHeading";
import { levels as defaultLevels } from "@/lib/site-data";
import { getSection, pick } from "@/lib/content";

export default async function EducationalOffer() {
  const content = await getSection("oferta");
  const levels = defaultLevels.map((nivel, i) => ({
    name: pick(content, `nivel${i + 1}_nombre`, nivel.name),
    age: pick(content, `nivel${i + 1}_edad`, nivel.age),
    desc: pick(content, `nivel${i + 1}_desc`, nivel.desc),
  }));

  return (
    <section id="oferta-educativa" className="bg-white py-16 sm:py-[88px] px-5 sm:px-8">
      <div className="max-w-[1160px] mx-auto">
        <SectionHeading
          eyebrow="Oferta educativa"
          title="Un camino educativo completo, de preescolar a bachillerato"
        />
        <div className="grid gap-6 mb-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {levels.map((nivel) => (
            <div key={nivel.name} className="border border-border rounded-2xl overflow-hidden">
              <div className="h-2 bg-yellow" />
              <div className="p-7">
                <h3 className="font-display text-xl font-bold mb-1">{nivel.name}</h3>
                <div className="text-[13px] text-gold font-bold mb-3.5">{nivel.age}</div>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{nivel.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-ink rounded-[18px] px-7 sm:px-11 py-9 flex flex-wrap gap-8 items-center">
          <span className="font-display font-extrabold text-xl text-yellow whitespace-nowrap">
            Inglés y tecnología
          </span>
          <p className="text-[15px] leading-relaxed text-panel">
            En los tres niveles —preescolar, básica primaria y básica secundaria— el inglés como segunda lengua y la
            tecnología como eje pedagógico fortalecen las competencias comunicativas de nuestros estudiantes y
            potencian su pensamiento crítico, su creatividad y su capacidad de interactuar en contextos
            multiculturales, aspectos esenciales en un mundo globalizado.
          </p>
        </div>
      </div>
    </section>
  );
}
