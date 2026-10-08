"use client";

import { useEffect, useState, type ReactNode } from "react";

/* ──────────────────────────────────────────────────────────
   Route transition. A template re-mounts on every navigation,
   so the incoming page plays `.page-enter` (globals.css).

   Only CLIENT navigations animate: on the first load the page
   must paint immediately (the hero has its own first-paint
   reveals), so the very first mount renders without the class
   — on the server and during hydration alike, so they match.
   ────────────────────────────────────────────────────────── */

let hydrated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => typeof window !== "undefined" && hydrated);

  useEffect(() => {
    hydrated = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
