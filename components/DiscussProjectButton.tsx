"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";

import { IconArrowRight } from "@/components/icons";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { PRIMARY_CTA } from "@/lib/site";

/* Floating primary CTA — bottom-centre, homepage only.
   Hidden while a section that already carries the CTA is on screen
   — anything marked `data-cta-off` (hero, contact) and the footer —
   so it never doubles up or covers it. `data-cta-off="late"` hides
   it only once that section fills a real slice of the screen. */
export default function DiscussProjectButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-off], #footer"));
    const onScreen = new Map<Element, boolean>();
    const update = (entries: IntersectionObserverEntry[]) => {
      for (const e of entries) onScreen.set(e.target, e.isIntersecting);
      // stay hidden until every zone has reported in
      setVisible(onScreen.size === els.length && ![...onScreen.values()].some(Boolean));
    };
    const early = new IntersectionObserver(update, { rootMargin: "0px 0px 160px 0px" });
    const late = new IntersectionObserver(update, { rootMargin: "0px 0px -35% 0px" });
    for (const el of els) (el.dataset.ctaOff === "late" ? late : early).observe(el);
    return () => {
      early.disconnect();
      late.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center md:bottom-6"
        >
          <Link
            href={PRIMARY_CTA.href}
            className="group btn-fx pointer-events-auto flex items-center gap-2 whitespace-nowrap rounded-md border border-white/[0.08] bg-[rgb(16_19_28/0.72)] px-5 py-3 text-[0.8125rem] font-medium text-white shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[background-color,transform] duration-200 active:scale-[0.98]"
          >
            {PRIMARY_CTA.label}
            <IconArrowRight className="h-3.5 w-3.5 text-glow transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </m.div>
      )}
    </AnimatePresence>
  );
}
