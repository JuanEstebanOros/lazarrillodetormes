type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center max-w-2xl" : "text-left max-w-xl"} mb-10 sm:mb-12 ${className}`}
    >
      <span
        className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-yellow" : "text-gold"}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
    </div>
  );
}
