import { prisma } from "@/lib/prisma";
import NoticiaForm from "@/components/admin/NoticiaForm";
import NoticiaListItem from "@/components/admin/NoticiaListItem";
import { createNoticia } from "./actions";

export default async function NoticiasPage() {
  const noticias = await prisma.noticia.findMany({ orderBy: { fecha: "desc" } });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl font-bold text-ink">Noticias</h1>

      <section className="bg-white border border-border rounded-2xl p-6 sm:p-7">
        <h2 className="font-display text-lg font-bold text-ink mb-5">Nueva noticia</h2>
        <NoticiaForm action={createNoticia} />
      </section>

      <section className="flex flex-col gap-4">
        {noticias.length === 0 && <p className="text-sm text-muted">Aún no hay noticias.</p>}
        {noticias.map((noticia) => (
          <NoticiaListItem
            key={noticia.id}
            noticia={{ ...noticia, fecha: noticia.fecha.toISOString() }}
          />
        ))}
      </section>
    </div>
  );
}
