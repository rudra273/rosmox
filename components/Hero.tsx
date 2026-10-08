import Link from "next/link";

import SignalField from "@/components/SignalField";
import { IconArrowRight } from "@/components/icons";
import Button from "@/components/ui/Button";
import { HERO_CAPABILITIES, HERO_HEADLINE, HERO_LEAD } from "@/lib/hero";
import { cssDelay as delay } from "@/lib/motion";
import { getProduct } from "@/lib/products";
import { PRIMARY_CTA } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Hero — the statement over a signal horizon.

   Exactly one screen. The Breaksmith pill, headline, lead and
   CTAs sit centred on top; every pixel below the buttons is a
   landscape of points rolling in from a glowing horizon
   (components/SignalField.tsx), so the field grows on tall
   screens and shrinks on short ones instead of running under
   the copy. What we build runs along the bottom edge.

   Copy uses the CSS first-paint reveals, so it never waits for
   JS. Each headline line carries its own white → white/60
   gradient; the extra bottom padding keeps descenders inside
   the clipped background.
   ────────────────────────────────────────────────────────── */

const FEATURED = getProduct("breaksmith");

export default function Hero() {
  return (
    <section
      id="hero"
      data-theme="dark"
      data-cta-off
      className="relative isolate flex h-svh min-h-[36rem] flex-col overflow-hidden bg-ink"
    >
      {/* light from above */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.12] blur-[120px]" />
      </div>

      {/* ── Copy ── */}
      <div className="container-page flex shrink-0 flex-col items-center pt-28 text-center lg:pt-32">
        {FEATURED && (
          <Link
            href={`/products/${FEATURED.slug}`}
            className="reveal-rise group inline-flex items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-sm text-white/70 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            style={delay(0)}
          >
            <span className="rounded-sm bg-primary/15 px-2 py-0.5 font-medium text-glow">{FEATURED.name}</span>
            Your AI testing agent
            <IconArrowRight className="h-3.5 w-3.5 text-white/45 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}

        <h1 className="mt-6 font-display text-hero font-semibold lg:mt-8">
          {HERO_HEADLINE.map((line, i) => (
            <span key={line} className="line-mask">
              <span
                className="line -mb-[0.1em] bg-gradient-to-b from-white from-40% to-white/60 bg-clip-text pb-[0.1em] text-transparent"
                style={delay(80 + i * 90)}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="reveal-rise mt-6 max-w-3xl text-balance text-lead text-white/65 lg:mt-7" style={delay(320)}>
          {HERO_LEAD}
        </p>

        <div
          className="reveal-rise mt-8 flex w-64 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:mt-10"
          style={delay(440)}
        >
          {/* phones: md, stacked at one shared width; lg in a row from sm up */}
          <Button href={PRIMARY_CTA.href} size="md" arrow="right" className="w-full sm:h-12 sm:w-auto sm:px-6 sm:text-[0.9375rem]">
            {PRIMARY_CTA.label}
          </Button>
          <Button href="/#services" size="md" variant="secondary" className="w-full sm:h-12 sm:w-auto sm:px-6 sm:text-[0.9375rem]">
            Explore our services
          </Button>
        </div>
      </div>

      {/* ── The field — whatever height is left below the buttons ── */}
      <div
        aria-hidden
        className="reveal-fade pointer-events-none relative -z-10 mt-4 min-h-0 flex-1 lg:mt-6"
        style={delay(200)}
      >
        <div className="absolute left-1/2 top-[10%] h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]" />
        <SignalField />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ── What we build ── */}
      <ul
        className="reveal-fade container-page absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 font-mono sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 text-label uppercase text-white/55 lg:bottom-8"
        style={delay(600)}
      >
        {HERO_CAPABILITIES.map((c, i) => (
          <li key={c} className="flex items-center gap-3">
            {/* dots only in the desktop row; phones stack the four */}
            {i > 0 && <span aria-hidden className="text-white/25 max-sm:hidden">·</span>}
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
