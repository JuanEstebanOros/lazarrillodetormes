import { prisma } from "@/lib/prisma";
import MomentoForm from "@/components/admin/MomentoForm";
import MomentoListItem from "@/components/admin/MomentoListItem";
import { createMomento } from "./actions";
import { MAX_MOMENTOS } from "@/lib/momentos";

export default async function MomentosPage() {
  const momentos = await prisma.momentoLazarillo.findMany({ orderBy: { order: "asc" } });
  const atMax = momentos.length >= MAX_MOMENTOS;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Momentos Lazarillo</h1>
        <p className="text-sm text-muted mt-1">
          {momentos.length}/{MAX_MOMENTOS} fotos del carrusel.
        </p>
      </div>

      <section className="bg-white border border-border rounded-2xl p-6 sm:p-7">
        <h2 className="font-display text-lg font-bold text-ink mb-5">Agregar foto</h2>
        <MomentoForm action={createMomento} atMax={atMax} />
      </section>

      <section className="flex flex-col gap-4">
        {momentos.length === 0 && <p className="text-sm text-muted">Aún no hay fotos.</p>}
        {momentos.map((momento, i) => (
          <MomentoListItem
            key={momento.id}
            momento={momento}
            isFirst={i === 0}
            isLast={i === momentos.length - 1}
          />
        ))}
      </section>
    </div>
  );
}
