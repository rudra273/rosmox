"use client";

import { useId, useState } from "react";

import { IconArrowUpRight } from "@/components/icons";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   FAQ — section eyebrow, then one large rounded card on the light Contact surface
   (the former Approach card design):

     · left  — heading, a line of context, the direct email
     · right — the questions as an accordion, one open at a time

   Panels open with grid-rows 0fr → 1fr, so they animate to the
   answer's real height. Also emits FAQPage JSON-LD.
   ────────────────────────────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <Eyebrow tone="light">FAQ</Eyebrow>
      </Reveal>

      <div className="mt-6 rounded-lg bg-paper-2/70 p-6 md:p-8 lg:p-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left — heading + direct line ── */}
          <div className="flex flex-col">
            <RevealText
              as="h3"
              text="Common questions"
              className="max-w-xl font-display text-h2 font-semibold"
            />
            <p className="mt-5 max-w-md text-lead text-ink/65">
              Pricing, timelines, ownership and how we work.
            </p>

            <div className="mt-10 lg:mt-auto lg:pt-16">
              <p className="text-sm text-ink/60">
                Something else on your mind?
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="group mt-1 inline-flex items-center gap-2 font-display text-xl font-medium text-ink transition-colors duration-200 hover:text-primary-ink"
              >
                {SITE.email}
                <IconArrowUpRight className="h-4 w-4 text-primary-ink transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            </div>
          </div>

          {/* ── Right — questions accordion ── */}
          <ol className="flex flex-col gap-2.5">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;
              return (
                <li
                  key={f.q}
                  className={`rounded-md bg-white transition-shadow duration-300 ${
                    isOpen
                      ? "shadow-[0_0_0_1px_rgba(26,102,209,0.25),0_16px_40px_-24px_rgba(4,6,13,0.35)]"
                      : "shadow-[0_1px_0_rgba(4,6,13,0.04)] hover:shadow-[0_0_0_1px_rgba(4,6,13,0.08)]"
                  }`}
                >
                  <h4>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen((o) => (o === i ? null : i))}
                      className="group flex w-full items-center gap-4 rounded-md px-5 py-4 text-left"
                    >
                      <span
                        className={`font-mono text-xs transition-colors duration-300 ${
                          isOpen ? "text-primary-ink" : "text-ink/55"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-sm font-semibold tracking-tight md:text-base">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          isOpen
                            ? "bg-primary-ink text-white"
                            : "bg-ink/[0.05] text-ink/70 group-hover:bg-ink/[0.09]"
                        }`}
                      >
                        <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                        <span
                          className={`absolute h-3 w-[1.5px] rounded-full bg-current transition-transform duration-300 ease-out ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                  </h4>

                  {/* grid-rows 0fr → 1fr: animates to the content's real height */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p
                        className={`px-5 pb-5 pl-[3.25rem] text-[0.9375rem] leading-relaxed text-ink/70 transition-[opacity,transform] duration-500 ease-out ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-1 opacity-0"
                        }`}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
