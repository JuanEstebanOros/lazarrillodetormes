"use client";

import { useId, useState, type ChangeEvent } from "react";
import Image from "next/image";

export default function ImageField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const inputId = useId();
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</span>
      <div className="flex items-center gap-4">
        {url ? (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-panel shrink-0">
            <Image src={url} alt="" fill className="object-cover" unoptimized={url.startsWith("/uploads/")} />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border border-dashed border-border bg-panel shrink-0" />
        )}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={inputId}
            className="inline-flex w-fit items-center gap-2 cursor-pointer rounded-lg border-2 border-yellow bg-cream-soft px-4 py-2 text-sm font-bold text-ink hover:bg-yellow transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 16V4M12 4 7 9M12 4l5 5" />
              <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
            </svg>
            {url ? "Cambiar imagen" : "Subir imagen"}
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="sr-only"
            />
          </label>
          {uploading && <span className="text-xs text-muted">Subiendo…</span>}
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
