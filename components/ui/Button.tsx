import Link from "next/link";
import type { ReactNode } from "react";

import { IconArrowRight, IconArrowUpRight } from "@/components/icons";

/* ──────────────────────────────────────────────────────────
   Button — every CTA on the site. Renders a Next <Link> for
   internal routes and a plain <a> for mailto / external.

   States: hover (inset pill, same as the navbar CTA + arrow slide), press (scale .98),
   focus-visible (global ring in globals.css).
   ────────────────────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "secondary-light" | "inverse";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-ink",
  secondary:
    "border border-white/15 bg-white/[0.04] text-white hover:border-white/25",
  "secondary-light":
    "border border-ink/15 bg-transparent text-ink hover:border-ink/25",
  inverse: "bg-white text-ink",
};

/* hover pill tint (see .btn-fx in globals.css) */
const PILL: Record<Variant, string> = {
  primary: "btn-fx-on-primary",
  secondary: "",
  "secondary-light": "btn-fx-on-light",
  inverse: "btn-fx-on-light",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-[0.8125rem]",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-12 gap-2 px-6 text-[0.9375rem]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** "right" slides on hover; "external" for links that leave the site */
  arrow?: "right" | "external";
  className?: string;
  onClick?: () => void;
}) {
  const classes = `group/btn btn-fx ${PILL[variant]} inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow === "right" && (
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
      )}
      {arrow === "external" && (
        <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/btn:-translate-y-px group-hover/btn:translate-x-px" />
      )}
    </>
  );

  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={onClick}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
