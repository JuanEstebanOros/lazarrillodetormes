"use client";

import { useState } from "react";
import Image from "next/image";
import { admSteps, levelTabs, requisitos, type LevelTabId } from "@/lib/site-data";
import GooeyButton from "./GooeyButton";

const uniforms = [
  {
    src: "/images/uniforme-1.jpg",
    alt: "Uniforme de diario niñas, preescolar y primaria",
    title: "Diario · Niñas (preescolar/primaria)",
    desc: "Las niñas de la Institución Educativa Lazarillo de Tormes lucirán una jardinera con prenses de color amarillo y debajo de esta una camisa blanca con cuello de muñeca, medias blancas y zapatos negros. Las niñas de primaria también lucirán este uniforme.",
  },
  {
    src: "/images/uniforme-2.jpg",
    alt: "Uniforme de diario niños, preescolar y primaria",
    title: "Diario · Niños (preescolar/primaria)",
    desc: "Los niños de la Institución Educativa Lazarillo de Tormes lucirán una camisa blanca manga corta, acompañada de un pantalón corto con prenses de color amarillo, medias blancas y zapatos negros.",
  },
  {
    src: "/images/uniforme-3.jpg",
    alt: "Uniforme de educación física, todos los niveles",
    title: "Educación física (todos los niveles)",
    desc: "Este uniforme lo lucirán los niños y las niñas tanto de preescolar como primaria y secundaria. Se compone de una camiseta blanca y una sudadera amarilla con el estampado vertical del nombre del Centro Educativo. Estará acompañado con medias blancas y tenis del mismo color.",
  },
  {
    src: "/images/uniforme-4.jpg",
    alt: "Uniforme de diario secundaria, varones y damas",
    title: "Diario · Secundaria (varones y damas)",
    desc: "Este uniforme se compone para los varones: una camisa blanca de cuello acompañada de un pantalón de vestir (largo) con prenses de color amarillo, medias blancas y zapatos negros. Para las estudiantes: una camisa blanca con cuello de muñeca, una falda de prenses amarilla, medias blancas y zapatos negros.",
  },
];

export default function Admissions() {
  const [activeLevel, setActiveLevel] = useState<LevelTabId>("preescolar");

  return (
    <section id="admisiones" className="bg-ink py-16 sm:py-[88px] px-5 sm:px-8">
      <div className="max-w-[1160px] mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-11">
          <span className="text-yellow font-bold text-xs uppercase tracking-wider">Admisiones</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-3 leading-tight text-white">
            Matricula a tu hijo o hija con nosotros
          </h2>
        </div>

        <div className="grid gap-5 mb-14 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {admSteps.map((paso) => (
            <div key={paso.num} className="bg-dark-soft rounded-2xl p-6">
              <div className="font-display font-extrabold text-2xl text-yellow mb-2.5">{paso.num}</div>
              <p className="text-sm leading-relaxed text-panel">{paso.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-cream rounded-[20px] p-6 sm:p-10">
          <h3 className="font-display text-xl font-bold mb-5 text-center">Documentos requeridos por nivel</h3>
          <div className="flex justify-center gap-3 mb-7 flex-wrap">
            {levelTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveLevel(tab.id)}
                className={`border-2 border-ink font-bold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer ${
                  activeLevel === tab.id ? "bg-ink text-white" : "bg-white text-ink hover:bg-ink hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 gap-8">
            {requisitos[activeLevel].map((req) => (
              <div key={req} className="flex gap-2.5 items-start mb-3 break-inside-avoid">
                <div className="w-2 h-2 rounded-full bg-yellow mt-1.5 shrink-0" />
                <span className="text-sm leading-snug text-ink-soft">{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cream rounded-[20px] p-6 sm:p-10 mt-6">
          <h3 className="font-display text-xl font-bold mb-5 text-center">Uniforme institucional</h3>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
            {uniforms.map((u) => (
              <div key={u.src}>
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-cream">
                  <Image src={u.src} alt={u.alt} fill sizes="260px" className="object-contain" />
                </div>
                <h4 className="font-display text-sm font-bold text-ink mt-3 mb-1">{u.title}</h4>
                <p className="text-[13px] leading-relaxed text-ink-soft">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <GooeyButton
            href="#contacto"
            color="var(--color-yellow)"
            hoverTextColor="var(--color-ink)"
            className="font-bold text-base px-8 py-4"
          >
            Inscribe a tu hijo/a
          </GooeyButton>
        </div>
      </div>
    </section>
  );
}
