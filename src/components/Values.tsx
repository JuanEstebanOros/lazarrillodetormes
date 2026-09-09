import { values } from "@/lib/site-data";

export default function Values() {
  return (
    <div className="grid gap-5 mb-14 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
      {values.map((valor) => (
        <div key={valor.name} className="bg-white border border-border rounded-2xl p-6">
          <h4 className="font-display text-base font-bold mb-2 text-ink">{valor.name}</h4>
          <p className="text-[13.5px] leading-relaxed text-muted">{valor.desc}</p>
        </div>
      ))}
    </div>
  );
}
