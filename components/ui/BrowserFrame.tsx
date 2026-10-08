import type { ReactNode } from "react";

import { IconLock } from "@/components/icons";

/* ──────────────────────────────────────────────────────────
   BrowserFrame — a quiet browser window around a screenshot:
   traffic lights, an address bar with the site's host, and a
   viewport of a fixed aspect `ratio` (width / height) that the
   children fill (use next/image `fill`). `viewportClassName` can
   cap the viewport (e.g. a max-height on short screens).
   ────────────────────────────────────────────────────────── */

export default function BrowserFrame({
  host,
  ratio = 16 / 9,
  className = "",
  viewportClassName = "",
  children,
}: {
  host: string;
  ratio?: number;
  className?: string;
  viewportClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`overflow-hidden rounded-lg border border-white/10 bg-elevated ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.08] bg-white/[0.03] px-3.5 md:h-10 md:px-4">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto flex h-6 min-w-0 max-w-[70%] items-center gap-2 rounded-sm bg-white/[0.06] px-3 text-xs text-white/60">
          <IconLock className="h-3 w-3 shrink-0 text-white/50" />
          <span className="truncate">{host}</span>
        </span>
        {/* balances the traffic lights so the address bar centres */}
        <span aria-hidden className="w-[2.625rem] shrink-0" />
      </div>
      <div className={`relative overflow-hidden ${viewportClassName}`} style={{ aspectRatio: ratio }}>
        {children}
      </div>
    </div>
  );
}
