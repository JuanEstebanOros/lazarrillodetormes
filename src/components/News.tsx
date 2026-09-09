import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Noticia } from "@/generated/prisma/client";

async function getNoticias(): Promise<Noticia[]> {
  try {
    return await prisma.noticia.findMany({ orderBy: { fecha: "desc" } });
  } catch (error) {
    console.error("[News] No se pudo leer Noticia desde Prisma:", error);
    return [];
  }
}

export default async function News() {
  const noticias = await getNoticias();

  return (
    <section id="noticias" className="relative overflow-hidden bg-yellow-pale py-16 sm:py-[88px] px-5 sm:px-8">
      <div
        className="absolute -left-16 -top-10 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] opacity-[0.40] pointer-events-none select-none rotate-[-25deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute -right-20 bottom-0 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] opacity-[0.34] pointer-events-none select-none rotate-[80deg]"
        aria-hidden="true"
      >
        <Image src="/images/mancha-pintura.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <div className="max-w-xl mb-11">
          <span className="text-gold font-bold text-xs uppercase tracking-wider">Noticias</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-3 mb-2.5 leading-tight">
            Lo que está pasando en el colegio
          </h2>
          <p className="text-base text-muted leading-relaxed">
            Comunicados, fechas importantes y logros de nuestra comunidad educativa.
          </p>
        </div>

        {noticias.length === 0 ? (
          <p className="text-[15px] text-muted">Muy pronto compartiremos noticias aquí.</p>
        ) : (
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {noticias.map((noticia) => (
              <article
                key={noticia.id}
                className="bg-white border border-border rounded-[18px] overflow-hidden flex flex-col gap-3"
              >
                <div className="relative w-full">
                  <Image
                    src={noticia.imagenUrl}
                    alt={noticia.titulo}
                    width={800}
                    height={1131}
                    className="w-full h-auto"
                    unoptimized={noticia.imagenUrl.startsWith("/uploads/")}
                  />
                </div>
                <div className="flex flex-col gap-3 px-7 pb-7 pt-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="bg-cream-soft text-gold font-bold text-[11.5px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                      Noticias
                    </span>
                    <span className="text-[13px] text-faint font-semibold">
                      {noticia.fecha.toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug">{noticia.titulo}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
