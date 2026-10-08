import ContactForm from "@/components/ContactForm";
import { IconArrowUpRight } from "@/components/icons";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { cssDelay } from "@/lib/motion";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   ContactPage — body of /contact (the navbar's "Let's talk").

     1. Hero (dark)    — headline + one line on what to send
     2. Contact (light) — next steps and the direct line on the
                          left; the form in a white card on the
                          right (stacked on phones)
   ────────────────────────────────────────────────────────── */

/* Draft copy — confirm it matches how engagements actually start */
const NEXT_STEPS = [
  "We read every message and reply within a day.",
  "A short call to understand the problem, the data and the deadline.",
  "A written proposal: scope, timeline and the team who'll build it.",
];

export default function ContactPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
          {/* above-the-fold copy uses CSS first-paint reveals */}
          <Eyebrow className="reveal-rise">Contact</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display font-semibold text-white">
            <span className="line-mask">
              <span className="line" style={cssDelay(80)}>
                Let&apos;s build what&apos;s next.
              </span>
            </span>
          </h1>
          <p className="reveal-rise mt-6 max-w-2xl text-lead text-white/60" style={cssDelay(220)}>
            Tell us about your product, platform or problem — what you want to build, improve or
            change for your customers. We&apos;ll get back within a day.
          </p>
        </div>
      </section>

      {/* ── 2. Form ── */}
      <section id="contact" data-theme="light" className="section-y bg-paper text-ink">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: next steps, direct line ── */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-mono text-label uppercase text-ink/60">What happens next</h2>
              <ol className="mt-5 flex flex-col gap-4">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-ink/15 font-mono text-xs text-primary-ink">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[0.9375rem] leading-relaxed text-ink/75">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 border-t border-ink/10 pt-6">
              <p className="text-sm text-ink/60">Prefer email?</p>
              <a
                href={`mailto:${SITE.email}`}
                className="group mt-1 inline-flex items-center gap-2 font-display text-xl font-medium text-ink transition-colors duration-200 hover:text-primary-ink"
              >
                {SITE.email}
                <IconArrowUpRight className="h-4 w-4 text-primary-ink transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            </Reveal>
          </div>

          {/* ── Right: form ── */}
          <Reveal delay={0.1} className="lg:col-span-7 xl:col-span-6 xl:col-start-7">
            <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(4,6,13,0.35)] md:p-8">
              <ContactForm tone="light" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
