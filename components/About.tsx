"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";

import { IconArrowRight, PRINCIPLE_ICONS } from "@/components/icons";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { PRINCIPLES } from "@/lib/about";
import { STAGGER } from "@/lib/motion";

/* Big statement — revealed word by word on scroll.
   `hl` words get a black highlight box that fills in. */
const HEADING: { t: string; hl?: boolean }[] = [
  { t: "We" }, { t: "bring" }, { t: "AI" }, { t: "and" },
  { t: "engineering" }, { t: "together" }, { t: "to" }, { t: "transform", hl: true },
  { t: "the" }, { t: "technology" }, { t: "you" }, { t: "rely" },
  { t: "on" }, { t: "and" }, { t: "create" }, { t: "new" },
  { t: "possibilities", hl: true }, { t: "for" }, { t: "your" }, { t: "business." },
];

function Word({
  word,
  progress,
  range,
}: {
  word: { t: string; hl?: boolean };
  progress: MotionValue<number>;
  range: [number, number];
}) {
  /* 0.45 floor: unread words still clear WCAG AA for large text
     (~3.2:1 on paper), so the reveal never hides content */
  const opacity = useTransform(progress, range, [0.45, 1]);

  return (
    <span className="mr-[0.28em] inline-block">
      <m.span
        style={{ opacity }}
        className={
          word.hl
            ? "rounded-sm bg-ink px-2 py-0.5 text-paper"
            : "text-ink"
        }
      >
        {word.t}
      </m.span>
    </span>
  );
}

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.85", "start 0.3"],
  });

  return (
    <section id="about" data-theme="light">
      {/* ── White part — big statement ── */}
      <div className="bg-paper text-ink">
        <div className="container-page pb-16 pt-20 lg:pb-24 lg:pt-28">
          <Reveal>
            <Eyebrow tone="light">About</Eyebrow>
          </Reveal>

          {/* em-based cap scales with the type, so it breaks into
              four lines at every desktop width */}
          <h2
            ref={headingRef}
            className="mt-10 max-w-[18em] font-display text-statement font-semibold"
          >
            {HEADING.map((word, i) => {
              const start = i / HEADING.length;
              const end = start + 1 / HEADING.length;
              return (
                <Word
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>
        </div>
      </div>

      {/* ── Operating principles — 4-up grid on hairlines.
           Each block links to its detail section on /about. ── */}
      <div className="bg-paper text-ink">
        <div className="container-page pb-20 lg:pb-28">
          <ul className="grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4 lg:border-b">
            {PRINCIPLES.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[p.slug];
              return (
                <Reveal
                  as="li"
                  key={p.slug}
                  delay={i * STAGGER}
                  className="group relative border-b border-ink/10 sm:max-lg:even:border-l lg:border-b-0 lg:[&:not(:first-child)]:border-l"
                >
                  <Link
                    href={`/about#${p.slug}`}
                    className="flex h-full flex-col py-8 sm:max-lg:pr-6 sm:max-lg:group-even:pl-6 sm:max-lg:group-even:pr-0 lg:px-8 lg:py-10 lg:group-first:pl-0 lg:group-last:pr-0"
                  >
                    {/* accent line draws across the top on hover */}
                    <span
                      aria-hidden
                      className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-ink/55">{p.n}</span>
                      <Icon className="h-5 w-5 text-primary-ink transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="mt-8 font-display text-xl font-semibold tracking-tight lg:mt-12">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink/65">
                      {p.desc}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-ink">
                      Learn more
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
