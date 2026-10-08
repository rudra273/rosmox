import Link from "next/link";

import { IconArrowRight, PRINCIPLE_ICONS } from "@/components/icons";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { PRINCIPLES, TEAM } from "@/lib/about";
import { cssDelay, STAGGER } from "@/lib/motion";
import { PRIMARY_CTA } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   AboutPage — body of /about.

     1. Hero (dark)        — headline + jump links to each principle
     2. Principles (light) — one section per principle, id = slug,
                             so the homepage blocks land on /about#<slug>
     3. Team (dark)        — #team
     4. CTA

   Content lives in lib/about.ts.
   ────────────────────────────────────────────────────────── */

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
          {/* above-the-fold copy uses CSS first-paint reveals */}
          <Eyebrow className="reveal-rise">About ROSMOX</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display font-semibold text-white">
            <span className="line-mask">
              <span className="line" style={cssDelay(80)}>
                We bring AI expertise and a personal commitment to your business.
              </span>
            </span>
          </h1>
          <p className="reveal-rise mt-6 max-w-2xl text-lead text-white/60" style={cssDelay(220)}>
            We combine curiosity, practical thinking, and engineering experience to help you move forward.
            Understanding your goals shapes our approach. Taking responsibility for the work shapes everything that follows.
          </p>

          <nav aria-label="On this page" className="reveal-rise mt-12" style={cssDelay(320)}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPLES.map((p) => {
                const Icon = PRINCIPLE_ICONS[p.slug];
                return (
                  <li key={p.slug}>
                    <a
                      href={`#${p.slug}`}
                      className="group flex h-full items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/[0.06] text-glow transition-colors duration-200 group-hover:bg-primary/15">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white/80">{p.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── 2. Principles ── */}
      <section data-theme="light" className="section-y bg-paper text-ink">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">How we work</Eyebrow>
          </Reveal>
          <RevealText
            text="What you can expect from us"
            className="mt-5 max-w-3xl font-display text-h2 font-semibold"
          />

          <div className="mt-14 border-t border-ink/10">
            {PRINCIPLES.map((p) => {
              const Icon = PRINCIPLE_ICONS[p.slug];
              return (
                <article
                  key={p.slug}
                  id={p.slug}
                  className="grid scroll-mt-24 gap-8 border-b border-ink/10 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
                >
                  <Reveal className="lg:col-span-4">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-ink/55">{p.n}</span>
                      <Icon className="h-5 w-5 text-primary-ink" />
                    </div>
                    <h2 className="mt-5 font-display text-h3 font-semibold">{p.title}</h2>
                  </Reveal>

                  <div className="lg:col-span-8">
                    <Reveal as="p" delay={0.05} className="font-display text-xl font-medium leading-snug md:text-2xl">
                      {p.lead}
                    </Reveal>
                    <Reveal as="p" delay={0.1} className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/65 md:text-base">
                      {p.body}
                    </Reveal>
                    <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {p.points.map((pt, i) => (
                        <Reveal
                          as="li"
                          key={pt}
                          delay={0.1 + i * STAGGER}
                          className="flex items-start gap-3 text-[0.9375rem] text-ink/80"
                        >
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                          {pt}
                        </Reveal>
                      ))}
                    </ul>
                    {p.link && (
                      <Reveal delay={0.2} className="mt-8">
                        <Link
                          href={p.link.href}
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-ink"
                        >
                          {p.link.label}
                          <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      </Reveal>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Team ── */}
      <section id="team" data-theme="dark" className="section-y scroll-mt-16 bg-ink text-white">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Team</Eyebrow>
          </Reveal>
          <RevealText
            text="The people you'll work with."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold"
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                delay={i * STAGGER}
                className="flex items-center gap-5 rounded-md border border-white/10 bg-elevated/60 p-6"
              >
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 font-display text-xl font-semibold text-glow"
                >
                  {initials(t.name)}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{t.name}</h3>
                  <p className="mt-1 font-mono text-label uppercase text-white/50">{t.role}</p>
                  {t.bio && <p className="mt-3 text-sm leading-relaxed text-white/60">{t.bio}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section data-theme="dark" className="section-y relative overflow-clip border-t border-white/10 bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 50% 0%, rgba(77,162,255,0.12), transparent 70%)",
          }}
        />
        <div className="container-page relative text-center">
          <RevealText
            text="Let’s talk about your next step."
            className="mx-auto max-w-2xl font-display text-h2 font-semibold text-white"
          />
          <Reveal as="p" delay={0.1} className="mx-auto mt-5 max-w-md text-lead text-white/60">
            Tell us what you want to build, improve, or change. We&apos;ll discuss your goals and where we can help.
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex justify-center">
            <Button href={PRIMARY_CTA.href} size="lg" arrow="right">
              {PRIMARY_CTA.label}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
