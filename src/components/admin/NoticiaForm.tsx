"use client";

import { useState, useTransition } from "react";
import ImageField from "./ImageField";

export default function NoticiaForm({
  action,
  defaultValues,
  submitLabel = "Crear noticia",
  onDone,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: { titulo: string; fecha: string; imagenUrl: string };
  submitLabel?: string;
  onDone?: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            await action(formData);
            onDone?.();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrió un error");
          }
        });
      }}
      className="flex flex-col gap-4"
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Título</span>
        <input
          name="titulo"
          required
          defaultValue={defaultValues?.titulo}
          className="rounded-lg border border-border px-3.5 py-2.5 text-[14.5px] text-ink focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Fecha</span>
        <input
          type="date"
          name="fecha"
          required
          defaultValue={defaultValues?.fecha ? defaultValues.fecha.slice(0, 10) : undefined}
          className="rounded-lg border border-border px-3.5 py-2.5 text-[14.5px] text-ink focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </label>

      <ImageField name="imagenUrl" label="Imagen" defaultValue={defaultValues?.imagenUrl ?? ""} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="bg-gold text-white font-bold rounded-lg px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {pending ? "Guardando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
