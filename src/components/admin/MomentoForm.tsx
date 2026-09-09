"use client";

import { useState, useTransition } from "react";
import ImageField from "./ImageField";

export default function MomentoForm({
  action,
  atMax,
}: {
  action: (formData: FormData) => Promise<void>;
  atMax: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  if (atMax) {
    return (
      <p className="text-sm text-terracota bg-terracota-soft rounded-lg px-4 py-3">
        Máximo de 20 fotos alcanzado, elimina una para agregar otra.
      </p>
    );
  }

  return (
    <form
      key={key}
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            await action(formData);
            setKey((k) => k + 1); // remonta el form (y el ImageField) para limpiarlo tras crear
          } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrió un error");
          }
        });
      }}
      className="flex flex-col gap-4"
    >
      <ImageField name="imagenUrl" label="Foto" defaultValue="" />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Pie de foto</span>
        <input
          name="caption"
          required
          className="rounded-lg border border-border px-3.5 py-2.5 text-[14.5px] text-ink focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="bg-gold text-white font-bold rounded-lg px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {pending ? "Agregando…" : "Agregar foto"}
        </button>
      </div>
    </form>
  );
}
