"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

export type GalleryPhoto = { id: string; caption: string; src: string };

export default function GalleryCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(itemCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateActive();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [updateActive]);

  const scrollToIndex = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="momentos-lazarillo" className="bg-white py-16 sm:py-[88px] px-5 sm:px-8">
      <div className="max-w-[1160px] mx-auto">
        <SectionHeading eyebrow="Momentos Lazarillo" title="Momentos que construyen comunidad" />

        {/*
          Carrusel de doble capa:
          1) Base universal: scroll-snap nativo + botones/puntos en JS (funciona en todo navegador).
          2) Mejora progresiva: ::scroll-marker-group / ::scroll-button() / scroll-state() (solo Chrome/Edge
             recientes). Cuando el navegador soporta esa capa, los controles JS se ocultan vía
             @supports selector(::scroll-marker-group) y el navegador dibuja sus propios controles nativos.
        */}
        <div className="gallery-carousel-wrap">
          <button
            type="button"
            className="carousel-js-btn carousel-js-btn--prev"
            aria-label="Foto anterior"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            disabled={active === 0}
          >
            ❮
          </button>

          <ul ref={trackRef} className="gallery-carousel">
            {photos.map((foto, i) => (
              <li
                key={foto.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <div className="gallery-carousel__img">
                  <Image
                    src={foto.src}
                    alt={foto.caption}
                    fill
                    sizes="(max-width: 640px) 72vw, 260px"
                    className="object-cover"
                  />
                </div>
                <p>{foto.caption}</p>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="carousel-js-btn carousel-js-btn--next"
            aria-label="Siguiente foto"
            onClick={() => scrollToIndex(Math.min(photos.length - 1, active + 1))}
            disabled={active === photos.length - 1}
          >
            ❯
          </button>

          <div className="carousel-js-dots" role="tablist" aria-label="Seleccionar foto">
            {photos.map((foto, i) => (
              <button
                key={foto.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Ir a foto ${i + 1}: ${foto.caption}`}
                className={`carousel-js-dot${i === active ? " is-active" : ""}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
