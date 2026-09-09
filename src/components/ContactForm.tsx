"use client";

import { useState, type FormEvent } from "react";
import GooeyButton from "./GooeyButton";

const inputClass =
  "w-full px-3.5 py-3 rounded-lg border border-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow";
const labelClass = "text-[13px] font-semibold text-ink-soft block mb-1.5";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-panel rounded-[18px] p-7 sm:p-9">
      {sent ? (
        <div className="text-[15px] leading-relaxed text-ink-soft">
          <p className="font-display font-bold text-lg text-ink mb-2">¡Gracias por escribirnos!</p>
          <p>
            Este formulario aún no está conectado a un sistema de envío. Por ahora, escríbenos directamente a{" "}
            <a href="mailto:lazarillodetormesschool@gmail.com" className="text-gold font-semibold">
              lazarillodetormesschool@gmail.com
            </a>{" "}
            o por WhatsApp y con gusto te responderemos.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            <div>
              <label className={labelClass} htmlFor="nombre">
                Nombre completo
              </label>
              <input id="nombre" name="nombre" type="text" placeholder="Nombre y apellido" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="telefono">
                Teléfono
              </label>
              <input id="telefono" name="telefono" type="tel" placeholder="+57 300 000 0000" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="correo">
              Correo electrónico
            </label>
            <input id="correo" name="correo" type="email" placeholder="tucorreo@ejemplo.com" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass} htmlFor="nivel">
              Nivel de interés
            </label>
            <select id="nivel" name="nivel" className={inputClass} defaultValue="Preescolar">
              <option>Preescolar</option>
              <option>Primaria</option>
              <option>Bachillerato</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Cuéntanos en qué podemos ayudarte"
              rows={4}
              className={`${inputClass} resize-y`}
            />
          </div>
          <GooeyButton
            as="button"
            type="submit"
            color="var(--color-gold)"
            hoverTextColor="#fff"
            className="self-start font-bold text-[15px] px-7 py-3.5 cursor-pointer"
          >
            Enviar mensaje
          </GooeyButton>
        </form>
      )}
    </div>
  );
}
