"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { deleteMomento, moveMomento, updateMomentoCaption } from "@/app/admin/(dashboard)/momentos/actions";

export default function MomentoListItem({
  momento,
  isFirst,
  isLast,
}: {
  momento: { id: string; imagenUrl: string; caption: string };
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(momento.caption);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [movePending, startMoveTransition] = useTransition();

  function handleSaveCaption() {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("caption", caption);
        await updateMomentoCaption(momento.id, formData);
        setEditing(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error");
      }
    });
  }

  function handleDelete() {
    if (!confirm("¿Eliminar esta foto de Momentos Lazarillo? Esta acción no se puede deshacer.")) return;
    startTransition(async () => {
      await deleteMomento(momento.id);
    });
  }

  function handleMove(direction: "up" | "down") {
    startMoveTransition(async () => {
      await moveMomento(momento.id, direction);
    });
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-panel shrink-0">
        <Image src={momento.imagenUrl} alt="" fill className="object-cover" unoptimized={momento.imagenUrl.startsWith("/uploads/")} />
      </div>

      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex flex-col gap-2">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {error && <span className="text-xs text-red-600">{error}</span>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveCaption}
                disabled={pending}
                className="text-xs font-bold text-white bg-gold rounded-lg px-3 py-1.5 disabled:opacity-60"
              >
                {pending ? "Guardando…" : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCaption(momento.caption);
                  setEditing(false);
                }}
                className="text-xs font-semibold text-muted"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="font-display font-bold text-ink truncate">{momento.caption}</p>
        )}
      </div>

      {!editing && (
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => handleMove("up")}
            disabled={isFirst || movePending}
            aria-label="Subir"
            className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink border border-border rounded-lg disabled:opacity-30 transition-colors"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => handleMove("down")}
            disabled={isLast || movePending}
            aria-label="Bajar"
            className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink border border-border rounded-lg disabled:opacity-30 transition-colors"
          >
            ↓
          </button>
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
      )}
    </div>
  );
}
