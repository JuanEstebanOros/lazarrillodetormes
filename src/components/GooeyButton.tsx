import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type GooeyColors = {
  /** Border, text (initial) and blob fill color. */
  color: string;
  /** Text color once the blobs have filled the button on hover. */
  hoverTextColor: string;
  children: ReactNode;
  className?: string;
};

type GooeyButtonProps =
  | (GooeyColors & { as?: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (GooeyColors & { as: "button" } & ButtonHTMLAttributes<HTMLButtonElement>);

export default function GooeyButton({
  as = "a",
  color,
  hoverTextColor,
  className = "",
  children,
  ...rest
}: GooeyButtonProps) {
  const style = {
    "--gooey-color": color,
    "--gooey-hover-text": hoverTextColor,
  } as CSSProperties;

  const blobs = (
    <span className="gooey-btn__blobs" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );

  if (as === "button") {
    return (
      <button
        className={`gooey-btn ${className}`}
        style={style}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {blobs}
        <span className="gooey-btn__label">{children}</span>
      </button>
    );
  }

  return (
    <a className={`gooey-btn ${className}`} style={style} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {blobs}
      <span className="gooey-btn__label">{children}</span>
    </a>
  );
}
