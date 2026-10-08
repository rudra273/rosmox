import type { ReactElement, SVGProps } from "react";

import type { PrincipleSlug } from "@/lib/about";
import type { ServiceSlug } from "@/lib/services";

/* ──────────────────────────────────────────────────────────
   One icon set: 24px grid, 1.6 stroke, round caps/joins,
   currentColor. Size with className (h-4 w-4, h-5 w-5 …).
   ────────────────────────────────────────────────────────── */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconAI(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8.5 13 11l2.5 1-2.5 1-1 2.5-1-2.5L8.5 12l2.5-1 1-2.5Z" />
    </Base>
  );
}

export function IconWeb(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="M13.5 7.5 10.5 16.5" />
    </Base>
  );
}

export function IconMobile(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M10.5 17.5h3" />
    </Base>
  );
}

export function IconPlayStore(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 3.5 20 12 5 20.5V3.5Z" />
      <path d="m5 3.5 11 13M5 20.5 16 7.5" />
    </Base>
  );
}

export function IconTesting(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8 12 2.5 2.5L16 9" />
    </Base>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </Base>
  );
}

export const SERVICE_ICONS: Record<ServiceSlug, (p: IconProps) => ReactElement> = {
  "artificial-intelligence": IconAI,
  "product-platform-development": IconWeb,
  "software-testing-qa": IconTesting,
  "seo-ai-search": IconSearch,
};

/* ── About principles (lib/about.ts) ──
   01 quality → badge check · 02 data → shield ·
   03 clarity → document · 04 support → life buoy */

function IconQuality(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </Base>
  );
}

function IconShield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="8.5" r="0.5" />
    </Base>
  );
}

function IconDocument(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Base>
  );
}

function IconSupport(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="m5.6 5.6 3.6 3.6" />
      <path d="m14.8 14.8 3.6 3.6" />
      <path d="m14.8 9.2 3.6-3.6" />
      <path d="m5.6 18.4 3.6-3.6" />
    </Base>
  );
}

export const PRINCIPLE_ICONS: Record<PrincipleSlug, (p: IconProps) => ReactElement> = {
  quality: IconQuality,
  "data-care": IconShield,
  clarity: IconDocument,
  support: IconSupport,
};

/* ── UI glyphs ── */

/** → used in buttons/links; slides on hover via group-hover */
export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

/** ↗ for links that leave the site */
export function IconArrowUpRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Base>
  );
}

/** padlock — browser-frame address bar */
export function IconLock(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Base>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}
