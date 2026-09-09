import Image from "next/image";
import { timeline } from "@/lib/site-data";

export default function History() {
  return (
    <div className="grid gap-12 items-start mb-14 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
      <div>
        <h3 className="font-display text-xl sm:text-[22px] font-bold mb-3.5">Nuestra historia</h3>
        <p className="text-[15px] leading-relaxed text-ink-soft mb-4">
          Nacimos en 2018 como un sueño familiar liderado por la docente Maira Alejandra Lasso Cruz, junto a su esposo
          Julio Arturo Vargas Soto, con el propósito de ofrecer a Puerto Carreño una educación más cercana, humanista y
          con énfasis en inglés. Iniciamos con 7 estudiantes de preescolar y, con el tiempo, hemos crecido hasta ofrecer una
          alternativa educativa completa a las familias de la capital vichadense.
        </p>
        <p className="text-[15px] leading-relaxed text-ink-soft mb-5">
          Nuestro nombre honra una historia familiar que contamos con orgullo un poco más abajo.
        </p>
        
      </div>

      <div className="flex flex-col">
        {timeline.map((hito, i) => (
          <div key={hito.year} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-yellow shrink-0 mt-1" />
              {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
            </div>
            <div className="pb-7">
              <div className="font-display font-extrabold text-lg text-gold">{hito.year}</div>
              <div className="text-sm text-ink-soft leading-relaxed">{hito.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
