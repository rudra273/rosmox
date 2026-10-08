import type { ReactNode } from "react";

/* Section eyebrow — mono label with the brand square.
   One style site-wide; `tone` matches the section surface. */

export default function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-label uppercase ${
        tone === "dark" ? "text-white/60" : "text-ink/60"
      } ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-primary" />
      {children}
    </p>
  );
}
