import Image from "next/image";

import { IconArrowUpRight } from "@/components/icons";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { hostOf, WORK, type WorkItem } from "@/lib/work";

/* ──────────────────────────────────────────────────────────
   Work — client projects as a scroll-stacked deck, on ink.

   Each card is `position: sticky`. Scrolling pins card N, then
   card N+1 slides up over it. Every card pins a little lower than
   the one before (STEP_REM), so once the deck is stacked the
   headers of the earlier cards stay visible as rows.

   Cards are as tall as their content — a header row (exactly
   STEP_REM, so a covered card shows just its header) and a body
   with the site's homepage in a browser frame at its real shape.

   Project data lives in @/lib/work (array order = deck order).
   ────────────────────────────────────────────────────────── */

/* sticky-top of the first card, and how much lower each next
   card pins (= the visible "row" of a covered card) */
const BASE_REM = 4.5;
const STEP_REM = 3.5;

/* the homepage shots are ~2400 × 1310 */
const SHOT_RATIO = 2400 / 1310;

export default function Work() {
  return (
    <section id="work" data-theme="dark" className="relative bg-ink text-white">
      <div className="container-page pt-24 lg:pt-32">
        <Reveal>
          <Eyebrow>Work</Eyebrow>
        </Reveal>
        <RevealText
          text="Client work we’re proud of."
          className="mt-5 max-w-3xl font-display text-h2 font-semibold"
        />
        <Reveal as="p" delay={0.1} className="mt-5 max-w-xl text-lead text-white/60">
          Recent sites we designed, built and launched — all live today.
        </Reveal>
      </div>

      {/* ── Sticky deck ── */}
      <div className="container-page relative mt-14 flex flex-col gap-8 pb-24 md:mt-20">
        {WORK.map((p, i) => (
          <WorkCard key={p.slug} project={p} index={i} />
        ))}

        {/* ── Pin hold ──
             Extra scroll INSIDE the deck, after the cards: the last card
             (sticky) stays pinned through it while Contact — pulled up
             by the same amount (-mt-[100svh] z-10) — slides over the
             frozen deck like a sheet. This height and Contact's -mt
             MUST match. Keep Contact directly after Work. */}
        <div aria-hidden className="pointer-events-none h-[100svh]" />
      </div>
    </section>
  );
}

function WorkCard({ project, index }: { project: WorkItem; index: number }) {
  const { n, client, location, category, title, desc, highlights, stack, url, image, testimonial } = project;

  return (
    <article
      style={{ top: `${BASE_REM + index * STEP_REM}rem` }}
      className="deck-panel sticky overflow-hidden rounded-lg"
    >
      {/* header — the row that stays visible once covered */}
      <div
        style={{ height: `${STEP_REM}rem` }}
        className="flex items-center justify-between gap-4 px-4 md:px-6"
      >
        <div className="flex min-w-0 items-baseline gap-3.5">
          <span className="font-mono text-xs text-white/50">{n}</span>
          <h3 className="truncate font-display text-lg font-semibold tracking-tight md:text-xl">
            {client}
          </h3>
          <span className="hidden truncate font-mono text-label text-white/50 lg:inline">
            {category}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-white px-3 py-1.5 text-[0.8125rem] font-semibold text-ink transition-[background-color,transform] duration-200 hover:bg-glow active:scale-[0.98]"
        >
          Visit<span className="hidden sm:inline"> live site</span>
          <span className="sr-only">: {client} (opens in a new tab)</span>
          <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:-translate-y-px group-hover/btn:translate-x-px" />
        </a>
      </div>

      {/* body — site first on phones, copy left / site right from md */}
      <div className="grid gap-5 border-t border-glow/10 p-4 md:grid-cols-12 md:gap-8 md:p-6">
        <BrowserFrame
          host={hostOf(project)}
          ratio={SHOT_RATIO}
          className="md:order-last md:col-span-7"
          viewportClassName="md:max-h-[calc(100svh-22rem)]"
        >
          <Image
            src={image}
            alt={`${client} website — homepage`}
            fill
            sizes="(min-width: 1440px) 740px, (min-width: 768px) 56vw, calc(100vw - 80px)"
            placeholder="blur"
            className="object-cover object-top"
          />
        </BrowserFrame>

        <div className="flex flex-col md:col-span-5 md:py-2">
          <p className="font-display text-lg font-medium leading-snug text-white md:text-2xl">
            {title}
          </p>
          <p className="mt-2 text-sm text-white/55">{location}</p>
          <p className="mt-4 hidden text-[0.9375rem] leading-relaxed text-white/60 xl:block">{desc}</p>
          {testimonial && (
            <figure className="mt-5 border-l-2 border-glow/40 pl-4">
              <blockquote className="text-sm leading-relaxed text-white/80 md:text-[0.9375rem]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-2 font-mono text-label text-white/50">
                — {testimonial.by}
              </figcaption>
            </figure>
          )}
          <ul className="mt-auto hidden flex-wrap gap-2 pt-6 md:flex">
            {highlights.map((h) => (
              <li
                key={h}
                className="rounded-sm border border-white/10 px-2.5 py-1 text-[0.8125rem] text-white/70"
              >
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-4 hidden font-mono text-label text-white/50 md:block">{stack}</p>
        </div>
      </div>
    </article>
  );
}
