import Faq from "@/components/Faq";
import { PRINCIPLE_ICONS } from "@/components/icons";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { PRINCIPLES } from "@/lib/about";
import { PRIMARY_CTA, SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   FAQ + Contact — one light sheet, two sections.

   The FAQ (components/Faq.tsx) comes first, so doubts are answered
   right before the ask. Then centred copy on the same light sheet: the pitch, the
   four promises from lib/about.ts, and two ways in — the full form
   on /contact, or email. The form itself lives on /contact
   (components/ContactPage.tsx), not here.

   Both are <section id>s, so the navbar scrollspy lights FAQ, then
   "Let's talk".

   NOTE: while <Work /> is commented out in app/page.tsx the sheet
   has no `-mt-[100svh]`. Put it back when Work returns — it slides
   the sheet over the pinned Work deck (see "Pin hold" in Work.tsx);
   without Work it would cover the Products cards instead.
   ────────────────────────────────────────────────────────── */

export default function Contact() {
  return (
    <div data-theme="light" className="section-y relative z-10 bg-paper text-ink">
      <section id="faq" data-theme="light" className="container-page scroll-mt-24">
        <Faq />
      </section>

      <section
        id="contact"
        data-theme="light"
        data-cta-off="late"
        className="container-page mt-28 scroll-mt-24 lg:mt-40"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow tone="light">Work with us</Eyebrow>
          </Reveal>
          <RevealText
            text="Your goals. Your customers. Our focus."
            className="mt-6 text-balance font-display text-h2 font-semibold"
          />
          <Reveal as="p" delay={0.1} className="mt-6 max-w-xl text-lead text-ink/65">
            From new products to better customer experiences — we help your business take the
            next step.
          </Reveal>

          <Reveal delay={0.15} className="mt-12 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={PRIMARY_CTA.href} size="lg" arrow="right">
              {PRIMARY_CTA.label}
            </Button>
            <Button href={`mailto:${SITE.email}`} size="lg" variant="secondary-light">
              {SITE.email}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="mx-auto mt-24 max-w-5xl border-t border-ink/10 pt-12 lg:mt-32">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => {
              const Icon = PRINCIPLE_ICONS[p.slug];
              return (
                <li key={p.slug} className="flex items-center gap-3 sm:flex-col sm:text-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-ink/75">{p.title}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
