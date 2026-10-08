"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

import { IconArrowRight, IconArrowUpRight, SERVICE_ICONS } from "@/components/icons";
import ServiceGraphic from "@/components/ServiceGraphics";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { cssDelay, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";
import { PRODUCTS } from "@/lib/products";
import { SERVICE_PAGE_COPY, SERVICES, type Service } from "@/lib/services";
import { PRIMARY_CTA } from "@/lib/site";
import { hostOf, WORK } from "@/lib/work";

/* ──────────────────────────────────────────────────────────
   ServiceDetail — body of /services/[slug].

     1. Hero (dark)      — title, intro, CTAs + the service's
                           blueprint illustration, drawn live
     2. Deliverables     — the 4 sub-services in a hairline grid
                           (+ tools & stack when the service lists any)
     3. How we work      — 4 steps on a drawn timeline
     4. Proof            — real client sites or our own products
     5. CTA + other services

   Everything is driven by lib/services.ts; proof only links to
   real entries in lib/work.ts / lib/products.ts.
   ────────────────────────────────────────────────────────── */

export default function ServiceDetail({ service }: { service: Service }) {
  const reduceMotion = useReducedMotion() ?? false;
  const processRef = useRef<HTMLOListElement>(null);
  const processInView = useInView(processRef, VIEWPORT);
  const { n, slug, title, desc, headline, tag, deliverables, stack, process, secondaryCta } = service;
  const Icon = SERVICE_ICONS[slug];

  const work = service.work
    .map((s) => WORK.find((w) => w.slug === s))
    .filter((w): w is (typeof WORK)[number] => !!w);
  const products = service.products
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is (typeof PRODUCTS)[number] => !!p);
  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <>
      {/* ── 1. Hero ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container-page relative grid items-center gap-14 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            {/* above-the-fold copy uses CSS first-paint reveals */}
            <nav
              aria-label="Breadcrumb"
              className="reveal-rise mb-8 flex items-center gap-2 font-mono text-label text-white/50"
            >
              <Link href="/#services" className="transition-colors hover:text-white">
                SERVICES
              </Link>
              <span aria-hidden>/</span>
              <span className="text-glow">{n}</span>
            </nav>

            <h1 className="font-display text-display font-semibold text-white">
              <span className="line-mask">
                <span className="line" style={cssDelay(80)}>
                  {title}
                </span>
              </span>
            </h1>
            <p className="reveal-rise mt-6 max-w-xl text-lead text-white/60" style={cssDelay(220)}>
              {desc}
            </p>
            <div
              className="reveal-rise mt-9 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center"
              style={cssDelay(320)}
            >
              <Button href={PRIMARY_CTA.href} size="lg" arrow="right" className="w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Button>
              <Button href={secondaryCta.href} size="lg" variant="secondary" className="w-full sm:w-auto">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* live illustration in a blueprint panel */}
          <div className="reveal-fade lg:col-span-6" style={cssDelay(150)}>
            <div className="relative border border-white/10 bg-elevated/60">
              {(["left-0 top-0 -translate-x-1/2 -translate-y-1/2", "right-0 top-0 translate-x-1/2 -translate-y-1/2", "bottom-0 left-0 -translate-x-1/2 translate-y-1/2", "bottom-0 right-0 translate-x-1/2 translate-y-1/2"] as const).map((pos) => (
                <span key={pos} aria-hidden className={`absolute h-[5px] w-[5px] bg-primary ${pos}`} />
              ))}
              <div className="flex items-center gap-4 border-b border-white/10 px-5 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/50 font-mono text-xs text-glow">
                  {n}
                </span>
                <span className="font-mono text-sm uppercase tracking-[0.12em] text-white">{title}</span>
                <span aria-hidden className="ml-auto h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_rgba(130,190,255,0.9)]" />
              </div>
              <div className="relative h-[260px] md:h-[320px]">
                <div
                  aria-hidden
                  className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
                />
                <div className="absolute inset-0 px-6 py-4">
                  <ServiceGraphic art={slug} open reduceMotion={reduceMotion} />
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
                <Icon className="h-4 w-4 text-white/45" />
                <span className="font-mono text-label text-white/50">{tag}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Deliverables ── */}
      <section data-theme="light" className="section-y bg-paper text-ink">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">{SERVICE_PAGE_COPY.capabilitiesLabel}</Eyebrow>
          </Reveal>
          <RevealText text={headline} className="mt-5 max-w-3xl font-display text-h2 font-semibold" />

          <ul className="mt-14 grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((d, i) => (
              <Reveal
                as="li"
                key={d.title}
                delay={(i % 4) * STAGGER}
                className="group relative border-b border-ink/10 py-8 sm:max-lg:pr-6 sm:max-lg:even:border-l sm:max-lg:even:pl-6 sm:max-lg:even:pr-0 lg:py-10 lg:pr-6 lg:[&:nth-child(4n)]:pr-0 lg:[&:not(:nth-child(4n+1))]:border-l lg:[&:not(:nth-child(4n+1))]:pl-6"
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="font-mono text-xs text-ink/55">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink/65">{d.desc}</p>
              </Reveal>
            ))}
          </ul>

          {stack.length > 0 && (
            <Reveal className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="font-mono text-label uppercase text-ink/55">Tools &amp; stack</span>
              <ul className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm border border-ink/10 bg-white px-3 py-1.5 text-[0.8125rem] text-ink/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 3. How we work ── */}
      <section id="how-we-work" data-theme="dark" className="section-y scroll-mt-24 bg-ink">
        <div className="container-page">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
          </Reveal>
          <RevealText
            text={process.headline}
            className="mt-5 max-w-3xl font-display text-h2 font-semibold text-white"
          />

          {/* the list (which has real area) is what's observed — a
              scaleX(0) line has no box for the in-view observer */}
          <ol ref={processRef} className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
            {/* the timeline draws across as the steps arrive */}
            <m.span
              aria-hidden
              initial={false}
              animate={{ scaleX: processInView ? 1 : 0 }}
              transition={{ duration: 1.4, ease: EASE_OUT }}
              className="absolute inset-x-0 top-[18px] hidden h-px origin-left bg-gradient-to-r from-primary via-primary/50 to-white/10 md:block"
            />
            {process.steps.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.15 + i * 0.12} className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-primary/50 bg-ink font-mono text-xs text-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{p.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. Proof ── */}
      {(work.length > 0 || products.length > 0) && (
        <section id={work.length ? "selected-work" : "related-products"} data-theme="dark" className="section-y scroll-mt-24 border-t border-white/10 bg-ink">
          <div className="container-page">
            <Reveal>
              <Eyebrow>{work.length ? "Selected work" : "Built by us"}</Eyebrow>
            </Reveal>
            <RevealText
              text={work.length ? SERVICE_PAGE_COPY.workHeadline : SERVICE_PAGE_COPY.productsHeadline}
              className="mt-5 max-w-3xl font-display text-h2 font-semibold text-white"
            />

            <ul className={`mt-12 grid gap-6 ${work.length > 1 ? "md:grid-cols-3" : ""}`}>
              {work.map((w, i) => (
                <Reveal as="li" key={w.slug} delay={i * STAGGER}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-lg border border-white/10 bg-elevated/60 transition-colors duration-300 hover:border-white/20"
                  >
                    <div className="flex h-8 items-center gap-2 border-b border-white/[0.08] px-3">
                      <span aria-hidden className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                      </span>
                      <span className="mx-auto truncate text-xs text-white/55">{hostOf(w)}</span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={w.image}
                        alt={`${w.client} website — homepage`}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        placeholder="blur"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-label" style={{ color: w.accent }}>
                        {w.category}
                      </p>
                      <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-white">
                        {w.client}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                        Visit live site
                        <span className="sr-only">(opens in a new tab)</span>
                        <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}

              {products.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * STAGGER}>
                  {/* a lone product card goes wide: image left, copy right */}
                  <Link
                    href={`/products/${p.slug}`}
                    className={`group overflow-hidden rounded-lg border border-white/10 bg-elevated/60 transition-colors duration-300 hover:border-white/20 ${
                      products.length === 1 ? "grid md:grid-cols-[1.3fr_1fr] md:items-center" : "block"
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/9] overflow-hidden border-white/10 ${
                        products.length === 1 ? "border-b md:border-b-0 md:border-r" : "border-b"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={`${p.name} product preview`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6 md:p-10">
                      <p className="font-mono text-label" style={{ color: p.accent }}>
                        {p.tag}
                      </p>
                      <h3 className="mt-3 font-display text-h3 font-semibold text-white">{p.name}</h3>
                      <p className="mt-2 text-[0.9375rem] text-white/60">{p.tagline}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                        View product
                        <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 5. CTA + other services ── */}
      <section data-theme="dark" className="section-y relative overflow-clip bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 50% 0%, rgba(77,162,255,0.12), transparent 70%)",
          }}
        />
        <div className="container-page relative">
          <div className="text-center">
            <RevealText
              text={SERVICE_PAGE_COPY.ctaHeadline}
              className="mx-auto max-w-2xl font-display text-h2 font-semibold text-white"
            />
            <Reveal as="p" delay={0.1} className="mx-auto mt-5 max-w-md text-lead text-white/60">
              {SERVICE_PAGE_COPY.ctaDescription}
            </Reveal>
            <Reveal delay={0.15} className="mt-9 flex justify-center">
              <Button href={PRIMARY_CTA.href} size="lg" arrow="right">
                {PRIMARY_CTA.label}
              </Button>
            </Reveal>
          </div>

          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="font-mono text-label uppercase text-white/50">Other services</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {others.map((s) => {
                const OtherIcon = SERVICE_ICONS[s.slug];
                return (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      className="group flex h-full items-center gap-4 rounded-md border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/[0.06] text-glow transition-colors duration-200 group-hover:bg-primary/15">
                        <OtherIcon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white">{s.title}</span>
                        <span className="block truncate text-[0.8125rem] text-white/55">{s.desc}</span>
                      </span>
                      <IconArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
