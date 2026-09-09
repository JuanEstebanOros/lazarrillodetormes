"use client";

import { useState, useTransition } from "react";
import type { ContentField, ContentSectionDef } from "@/lib/content-schema";
import ImageField from "./ImageField";

type SectionWithValues = ContentSectionDef & { values: Record<string, string> };

export default function ContentSectionForm({
  section,
  action,
}: {
  section: SectionWithValues;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <section className="bg-white border border-border rounded-2xl p-6 sm:p-7">
      <h2 className="font-display text-lg font-bold text-ink mb-5">{section.label}</h2>
      <form
        action={(formData: FormData) => {
          setSaved(false);
          startTransition(async () => {
            await action(formData);
            setSaved(true);
          });
        }}
        className="flex flex-col gap-5"
      >
        {section.fields.map((field) => (
          <Field key={field.key} field={field} defaultValue={section.values[field.key] ?? field.default} />
        ))}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="bg-gold text-white font-bold rounded-lg px-5 py-2.5 text-sm disabled:opacity-60"
          >
            {pending ? "Guardando…" : "Guardar cambios"}
          </button>
          {saved && !pending && <span className="text-sm text-green-700">Guardado ✓</span>}
        </div>
      </form>
    </section>
  );
}

function Field({ field, defaultValue }: { field: ContentField; defaultValue: string }) {
  if (field.type === "image") {
    return <ImageField name={field.key} label={field.label} defaultValue={defaultValue} />;
  }

  if (field.type === "textarea") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">{field.label}</span>
        <textarea
          name={field.key}
          defaultValue={defaultValue}
          rows={4}
          className="rounded-lg border border-border px-3.5 py-2.5 text-[14.5px] text-ink focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">{field.label}</span>
      <input
        name={field.key}
        defaultValue={defaultValue}
        placeholder={field.key === "himno_video_url" ? "https://www.youtube.com/watch?v=..." : undefined}
        className="rounded-lg border border-border px-3.5 py-2.5 text-[14.5px] text-ink focus:outline-none focus:ring-2 focus:ring-gold"
      />
    </label>
  );
}
