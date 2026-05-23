import Link from "next/link";
import type { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

interface PrimaryBtnProps {
  href: string;
  children: ReactNode;
  /** "primary" = filled (.btn-primary), "ghost" = outlined (.btn-ghost) */
  variant?: "primary" | "ghost";
  /** show the trailing arrow icon */
  arrow?: boolean;
  /** arrow icon size in px (draft1 uses 13 in hero/cta, 12 in nav/products) */
  arrowSize?: number;
}

/**
 * Shared button matching draft1's `.btn` / `.btn-primary` / `.btn-ghost`.
 * Renders an internal link, anchor (mailto/#), based on href.
 */
export default function PrimaryBtn({
  href,
  children,
  variant = "primary",
  arrow = false,
  arrowSize = 13,
}: PrimaryBtnProps) {
  const className = `btn btn-${variant}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon size={arrowSize} />}
    </>
  );

  // External / hash / mailto links use a plain anchor; internal routes use next/link.
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
