import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { diffs } from "@/lib/site-data";

export default function WhyChooseUs() {
  return (
    <section id="por-que-elegirnos" className="relative overflow-hidden bg-cream-soft py-16 sm:py-[88px] px-5 sm:px-8">
      <div
        className="absolute -right-16 -top-16 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] opacity-[0.40] pointer-events-none select-none rotate-[25deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute -left-24 bottom-0 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] opacity-[0.34] pointer-events-none select-none rotate-[-60deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <SectionHeading eyebrow="Por qué elegirnos" title="Lo que nos hace diferentes" />
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {diffs.map((dif) => (
            <div key={dif.num} className="bg-white rounded-2xl p-7 flex gap-5 items-start">
              <div className="font-display font-extrabold text-xl text-yellow bg-ink w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0">
                {dif.num}
              </div>
              <div>
                <h4 className="font-display text-[17px] font-bold mb-1.5">{dif.title}</h4>
                <p className="text-[14.5px] leading-relaxed text-muted">{dif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
