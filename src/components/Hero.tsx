import Image from "next/image";
import GooeyButton from "./GooeyButton";

const heroStats = [
  { value: "2018", label: "Año de fundación" },
  { value: "3 niveles", label: "Preescolar a bachillerato" },
  { value: "Énfasis en inglés", label: "Desde preescolar" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="relative aspect-square w-[clamp(260px,70vw,900px)]">
          <Image src="/images/hero-emblem.png" alt="" fill className="object-contain opacity-[0.15]" priority={false} />
        </div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-5 text-ink">
          Institución Educativa
          <br />
          Lazarillo de Tormes
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-ink-soft mb-4 leading-snug max-w-xl">
          Educamos con amor, formamos en valores y sembramos autonomía: raíces vichadenses para un futuro sin límites.
        </p>
        <p className="text-base text-muted mb-8 leading-relaxed max-w-lg">
          Desde 2018 acompañamos a familias de Puerto Carreño en la formación integral de sus hijos, desde preescolar
          hasta bachillerato, con un enfoque humanista, cercano y con énfasis en inglés.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mb-10">
          <GooeyButton
            href="#admisiones"
            color="var(--color-gold)"
            hoverTextColor="#fff"
            className="font-bold text-base px-7 py-[15px]"
          >
            Proceso de admisión
          </GooeyButton>
          <GooeyButton
            href="#sobre-nosotros"
            color="var(--color-ink)"
            hoverTextColor="#fff"
            className="font-bold text-base px-[26px] py-[13px]"
          >
            Conócenos
          </GooeyButton>
        </div>
        <div className="flex gap-9 flex-wrap justify-center border-t border-border pt-6">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display font-extrabold text-2xl text-gold">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
