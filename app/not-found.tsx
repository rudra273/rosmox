import type { Metadata } from "next";

import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { cssDelay } from "@/lib/motion";
import { PRIMARY_CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
};

/* Branded 404 — a pipeline with a break in it, drawn in the
   same blueprint language as the homepage hero. */
export default function NotFound() {
  return (
    <section
      data-theme="dark"
      className="relative flex min-h-[86svh] items-center overflow-hidden bg-ink"
    >
      {/* engineering grid, faded at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-1/2 h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container-page relative grid items-center gap-14 py-32 lg:grid-cols-2">
        <div>
          <div className="reveal-rise">
            <Eyebrow>Error 404</Eyebrow>
          </div>
          <h1 className="mt-5 font-display text-display font-semibold text-white">
            <span className="line-mask">
              <span className="line" style={cssDelay(80)}>
                Route not found.
              </span>
            </span>
          </h1>
          <p
            className="reveal-rise mt-5 max-w-md text-lead text-white/60"
            style={cssDelay(220)}
          >
            This page was moved, renamed, or never shipped. Let&apos;s get you
            back into the pipeline.
          </p>
          <div
            className="reveal-rise mt-9 flex flex-wrap gap-3"
            style={cssDelay(340)}
          >
            <Button href="/" size="lg" arrow="right">
              Back home
            </Button>
            <Button href={PRIMARY_CTA.href} size="lg" variant="secondary">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </div>

        <BrokenPipeline />
      </div>
    </section>
  );
}

function BrokenPipeline() {
  const line = "rgba(255,255,255,0.18)";
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      className="reveal-fade h-auto w-full max-w-[560px] font-mono lg:justify-self-end"
      style={cssDelay(300)}
      aria-hidden
    >
      {/* REQUEST node */}
      <rect x="10" y="80" width="130" height="56" rx="10" fill="rgba(10,15,30,0.85)" stroke="#4da2ff" strokeOpacity="0.75" strokeWidth="1.2" />
      <circle cx="28" cy="108" r="3" fill="#82beff" />
      <text x="40" y="108" dominantBaseline="central" fontSize="14" letterSpacing="2.2" fill="rgba(255,255,255,0.88)">REQUEST</text>

      {/* pipe — then the break */}
      <path d="M140 108 H 232" stroke={line} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M232 108 l 8 -10" stroke="#4da2ff" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M282 108 l -8 10" stroke="#4da2ff" strokeWidth="1.4" strokeLinecap="round" />
      <text x="257" y="78" textAnchor="middle" fontSize="12" letterSpacing="1.6" fill="#82beff">404</text>
      <path d="M282 108 H 372" stroke={line} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 7" />

      {/* missing PAGE node */}
      <rect x="374" y="80" width="130" height="56" rx="10" stroke={line} strokeWidth="1.2" strokeDasharray="5 6" />
      <circle cx="392" cy="108" r="3" fill="rgba(255,255,255,0.18)" />
      <text x="404" y="108" dominantBaseline="central" fontSize="14" letterSpacing="2.2" fill="rgba(255,255,255,0.4)">PAGE</text>

      <text x="257" y="176" textAnchor="middle" fontSize="11" letterSpacing="1.4" fill="rgba(255,255,255,0.35)">no route matched · try another path</text>
    </svg>
  );
}
