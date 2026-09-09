import Image from "next/image";
import SectionHeading from "./SectionHeading";
import MissionVision from "./MissionVision";
import History from "./History";
import Values from "./Values";
import OriginName from "./OriginName";
import RectorMessage from "./RectorMessage";

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="relative overflow-hidden bg-white py-16 sm:py-[88px] px-5 sm:px-8">
      <div
        className="absolute -left-16 -top-14 w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] opacity-[0.40] pointer-events-none select-none rotate-[-15deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute top-1/2 -right-20 -translate-y-1/2 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] opacity-[0.34] pointer-events-none select-none rotate-[45deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute -right-24 bottom-0 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] opacity-[0.40] pointer-events-none select-none rotate-[110deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Una historia escrita con vocación y amor por Puerto Carreño"
        />
        <MissionVision />
        <History />
        <Values />
        <OriginName />
        <RectorMessage />
      </div>
    </section>
  );
}
