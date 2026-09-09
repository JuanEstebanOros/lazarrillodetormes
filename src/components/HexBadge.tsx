export type HexTone = "yellow" | "terracota" | "ink";

const toneClasses: Record<HexTone, string> = {
  yellow: "bg-yellow text-ink",
  terracota: "bg-terracota text-white",
  ink: "bg-ink text-yellow",
};

export default function HexBadge({
  tone,
  className = "",
  children,
}: {
  tone: HexTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`hex-badge grid place-content-center shrink-0 shadow-md ${toneClasses[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
