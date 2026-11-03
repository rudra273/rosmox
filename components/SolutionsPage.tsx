"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useInView } from "framer-motion";

import { IconArrowRight } from "@/components/icons";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { cssDelay, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";
import { PRIMARY_CTA, SITE } from "@/lib/site";
import {
  CONNECTED_FLOW,
  FIRST_CALL_CHECKLIST,
  INDUSTRY_PLAYBOOKS,
  PARTNER_PILLARS,
  SOLUTION_PROCESS,
  SOLUTIONS,
  SOLUTIONS_HERO,
} from "@/lib/solutions";

/* ──────────────────────────────────────────────────────────
   SolutionsPage — body of /solutions.

     1. Hero (dark)             — headline, lead, CTAs + jump cards
                                  to the 5 business solutions
     2. Our Solutions (light)   — detailed breakdown of all 5
                                  solutions, capabilities & outcomes
     3. Better Together (dark)  — 5-stage connected business flow +
                                  3 partnership pillars
     4. By Industry (light)     — tailored starting points across
                                  6 key sectors
     5. How We Work & CTA (dark)— 4 steps, first-call checklist,
                                  and direct contact CTA

   Content lives in lib/solutions.ts.
   ────────────────────────────────────────────────────────── */

export default function SolutionsPage() {
  const flowRef = useRef<HTMLOListElement>(null);
  const flowInView = useInView(flowRef, VIEWPORT);

  return (
    <>
      {/* ── 1. Hero (dark) ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
          {/* above-the-fold copy uses CSS first-paint reveals */}
          <Eyebrow className="reveal-rise">{SOLUTIONS_HERO.eyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-4xl font-display text-display font-semibold text-white">
            <span className="line-mask">
              <span className="line" style={cssDelay(80)}>
                {SOLUTIONS_HERO.headline}
              </span>
            </span>
          </h1>

          <p
            className="reveal-rise mt-6 max-w-2xl text-lead text-white/60"
            style={cssDelay(220)}
          >
            {SOLUTIONS_HERO.lead}
          </p>

          <div
            className="reveal-rise mt-9 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center"
            style={cssDelay(300)}
          >
            <Button
              href={PRIMARY_CTA.href}
              size="lg"
              arrow="right"
              className="w-full sm:w-auto"
            >
              {PRIMARY_CTA.label}
            </Button>
            <Button
              href="#by-industry"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Solutions by industry
            </Button>
          </div>

          {/* Jump links to the 5 core business solutions */}
          <nav
            aria-label="Solutions on this page"
            className="reveal-lift mt-14 md:mt-16"
            style={cssDelay(380)}
          >
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="group flex h-full flex-col justify-between gap-4 rounded-md border border-white/10 bg-elevated/60 p-4 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 font-mono text-xs text-glow">
                        {s.n}
                      </span>
                      <IconArrowRight className="h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold leading-snug text-white">
                        {s.title}
                      </p>
                      <p className="mt-1.5 font-mono text-label text-white/45">
                        {s.tag}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── 2. Core Business Solutions (light) ── */}
      <section data-theme="light" className="section-y bg-paper text-ink">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">Our Solutions</Eyebrow>
          </Reveal>
          <RevealText
            text="Get found. Get organised. Stay connected."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold"
          />
          <Reveal
            as="p"
            delay={0.1}
            className="mt-5 max-w-2xl text-lead text-ink/65"
          >
            Start with the single area that needs attention right now, or combine
            them into one smooth system for your team and customers.
          </Reveal>

          <div className="mt-14 border-t border-ink/10">
            {SOLUTIONS.map((solution) => (
              <article
                key={solution.slug}
                id={solution.slug}
                className="grid scroll-mt-24 gap-10 border-b border-ink/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
              >
                {/* Left column: Solution identity, audience, and "What changes" */}
                <Reveal className="flex flex-col justify-between lg:col-span-4">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-label text-primary-ink">
                      <span>{solution.n}</span>
                      <span aria-hidden>·</span>
                      <span>{solution.tag}</span>
                    </div>

                    <h2 className="mt-4 font-display text-h3 font-semibold text-ink">
                      {solution.title}
                    </h2>

                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/65">
                      {solution.audience}
                    </p>

                    {/* What changes callout */}
                    <div className="mt-6 rounded-md border border-ink/10 bg-paper-2/80 p-5">
                      <p className="font-mono text-label text-primary-ink">
                        WHAT CHANGES
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">
                        {solution.outcome}
                      </p>
                    </div>
                  </div>

                  {solution.links && solution.links.length > 0 && (
                    <div className="mt-6 flex flex-col gap-2.5 border-t border-ink/10 pt-5">
                      {solution.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-ink"
                        >
                          {link.label}
                          <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </Reveal>

                {/* Right column: Lead + 6 capability cards */}
                <div className="lg:col-span-8">
                  <Reveal
                    as="p"
                    delay={0.05}
                    className="font-display text-xl font-medium leading-snug text-ink md:text-2xl"
                  >
                    {solution.lead}
                  </Reveal>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {solution.capabilities.map((cap, idx) => (
                      <Reveal
                        as="li"
                        key={cap.title}
                        delay={0.08 + (idx % 2) * STAGGER}
                        className="group relative rounded-md border border-ink/10 bg-white p-5 transition-colors duration-200 hover:border-ink/20"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 shrink-0 bg-primary-ink"
                          />
                          <h3 className="font-display text-base font-semibold tracking-tight text-ink md:text-lg">
                            {cap.title}
                          </h3>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                          {cap.desc}
                        </p>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Better Together — Connected System (dark) ── */}
      <section data-theme="dark" className="section-y bg-ink text-white">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Better Together</Eyebrow>
          </Reveal>
          <RevealText
            text="One connected system, not five separate tools."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold text-white"
          />
          <Reveal
            as="p"
            delay={0.1}
            className="mt-5 max-w-2xl text-lead text-white/60"
          >
            When your website, enquiries, WhatsApp messages, billing counter, and
            daily reports talk to each other, information only has to be entered
            once.
          </Reveal>

          {/* 5-stage connected pipeline */}
          <ol
            ref={flowRef}
            className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-6"
          >
            <m.span
              aria-hidden
              initial={false}
              animate={{ scaleX: flowInView ? 1 : 0 }}
              transition={{ duration: 1.4, ease: EASE_OUT }}
              className="absolute inset-x-0 top-[18px] hidden h-px origin-left bg-gradient-to-r from-primary via-primary/50 to-white/10 md:block"
            />
            {CONNECTED_FLOW.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                delay={0.12 + i * 0.1}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-primary/50 bg-ink font-mono text-xs text-glow">
                    {step.n}
                  </span>
                  <span className="font-mono text-label text-white/45">
                    {step.stage}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </ol>

          {/* 3 partnership pillars */}
          <div className="mt-16 border-t border-white/10 pt-14">
            <Reveal>
              <p className="font-mono text-label uppercase text-white/50">
                Your technology partner, from day one
              </p>
            </Reveal>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {PARTNER_PILLARS.map((pillar, i) => (
                <Reveal
                  as="li"
                  key={pillar.n}
                  delay={i * STAGGER}
                  className="rounded-md border border-white/10 bg-elevated/60 p-6"
                >
                  <span className="font-mono text-xs text-glow">
                    {pillar.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                    {pillar.desc}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Solutions by Industry (light) ── */}
      <section
        id="by-industry"
        data-theme="light"
        className="section-y scroll-mt-20 bg-paper text-ink"
      >
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">Solutions by Industry</Eyebrow>
          </Reveal>
          <RevealText
            text="What we’d build for a business like yours."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold"
          />
          <Reveal
            as="p"
            delay={0.1}
            className="mt-5 max-w-2xl text-lead text-ink/65"
          >
            Every business runs differently, but these are the combinations we
            typically recommend as a practical starting point.
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_PLAYBOOKS.map((item, i) => (
              <Reveal
                as="li"
                key={item.slug}
                delay={(i % 3) * STAGGER}
                className="flex h-full flex-col justify-between rounded-lg border border-ink/10 bg-white p-6 md:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-label text-ink/55">
                    <span className="text-primary-ink">{item.n}</span>
                    <span>{item.tag}</span>
                  </div>

                  <h3 className="mt-4 font-display text-h3 font-semibold text-ink">
                    {item.industry}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                    {item.summary}
                  </p>

                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <p className="font-mono text-label text-ink/55">
                      TYPICAL STARTING POINT
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {item.startingPoint.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2.5 text-sm text-ink/80"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary-ink"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-ink/10 pt-4">
                  <p className="font-mono text-label text-primary-ink">
                    RESULTS TO AIM FOR
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink/85">
                    {item.outcome}
                  </p>
                  {item.relatedHref && (
                    <Link
                      href={item.relatedHref.href}
                      className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-ink"
                    >
                      {item.relatedHref.label}
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Custom industry callout */}
          <Reveal
            delay={0.15}
            className="mt-10 flex flex-col items-start justify-between gap-6 rounded-lg border border-ink/10 bg-paper-2 p-6 md:flex-row md:items-center md:p-8"
          >
            <div className="max-w-2xl">
              <h3 className="font-display text-xl font-semibold text-ink">
                Don&apos;t see your industry here?
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">
                The same building blocks fit almost any growing business —
                clinics, coaching institutes, salons, manufacturers, agencies, and
                more. Tell us how your day runs and we&apos;ll suggest where to
                start.
              </p>
            </div>
            <Button href={PRIMARY_CTA.href} arrow="right">
              Talk to our team
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ── 5. How We Work + First-Call Checklist + CTA (dark) ── */}
      <section
        data-theme="dark"
        className="section-y relative overflow-clip border-t border-white/10 bg-surface text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 50% 0%, rgba(77,162,255,0.12), transparent 70%)",
          }}
        />

        <div className="container-page relative">
          <Reveal>
            <Eyebrow>How we work with you</Eyebrow>
          </Reveal>
          <RevealText
            text="Simple steps. No surprises."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold text-white"
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTION_PROCESS.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                delay={i * STAGGER}
                className="rounded-md border border-white/10 bg-ink/70 p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-primary/50 font-mono text-xs text-glow">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </ol>

          {/* Before our first call checklist */}
          <Reveal
            delay={0.15}
            className="mt-12 rounded-lg border border-white/10 bg-ink/80 p-6 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <p className="font-mono text-label uppercase text-glow">
                  Before our first call
                </p>
                <h3 className="mt-3 font-display text-h3 font-semibold text-white">
                  Helpful to have on hand.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Don&apos;t worry if you don&apos;t have all of these ready — a
                  rough idea of what you want to improve is enough to start.
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
                {FIRST_CALL_CHECKLIST.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.02] p-4 text-sm text-white/80"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-primary/40 font-mono text-xs text-glow">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Closing CTA */}
          <div className="mt-20 border-t border-white/10 pt-16 text-center">
            <RevealText
              text="Tell us about your business. We’ll take it from there."
              className="mx-auto max-w-2xl font-display text-h2 font-semibold text-white"
            />
            <Reveal
              as="p"
              delay={0.1}
              className="mx-auto mt-5 max-w-xl text-lead text-white/60"
            >
              A short conversation is all it takes to see where a better website,
              connected billing, or practical automation can save your team time.
            </Reveal>
            <Reveal
              delay={0.15}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button href={PRIMARY_CTA.href} size="lg" arrow="right">
                {PRIMARY_CTA.label}
              </Button>
              <Button
                href={`mailto:${SITE.email}`}
                size="lg"
                variant="secondary"
              >
                {SITE.email}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
