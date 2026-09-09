"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import NoticiaForm from "./NoticiaForm";
import { updateNoticia, deleteNoticia } from "@/app/admin/(dashboard)/noticias/actions";

export default function NoticiaListItem({
  noticia,
}: {
  noticia: { id: string; titulo: string; fecha: string; imagenUrl: string };
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const fechaLabel = new Date(noticia.fecha).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  function handleDelete() {
    if (!confirm(`¿Eliminar la noticia "${noticia.titulo}"? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      await deleteNoticia(noticia.id);
    });
  }

  if (editing) {
    return (
      <div className="bg-white border border-border rounded-2xl p-6 sm:p-7">
        <NoticiaForm
          action={updateNoticia.bind(null, noticia.id)}
          defaultValues={noticia}
          submitLabel="Guardar cambios"
          onDone={() => setEditing(false)}
        />
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-sm text-muted mt-3 hover:text-ink-soft"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-panel shrink-0">
        <Image src={noticia.imagenUrl} alt="" fill className="object-cover" unoptimized={noticia.imagenUrl.startsWith("/uploads/")} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-ink truncate">{noticia.titulo}</p>
        <p className="text-xs text-muted">{fechaLabel}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-sm font-semibold text-ink-soft hover:text-ink border border-border rounded-lg px-3 py-1.5 transition-colors"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="text-sm font-semibold text-red-600 hover:text-red-700 border border-border rounded-lg px-3 py-1.5 disabled:opacity-60 transition-colors"
        >
          {pending ? "…" : "Eliminar"}
        </button>
      </div>
    </div>
  );
}
