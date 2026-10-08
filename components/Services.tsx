"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import ServiceGraphic from "@/components/ServiceGraphics";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { SERVICES, type Service } from "@/lib/services";

/* ──────────────────────────────────────────────────────────
   Services — Sui-style scroll timeline.

   A dashed centre line, a blue progress fill and a travelling
   marker track scroll. Cards alternate left / right.

   The marker drives everything: the moment it reaches a row's
   node, that card UNFOLDS —
     · the node lights and pings, the connector draws out
     · the title decodes out of a scramble
     · the box's bottom edge slides down, revealing the body
       (clip-path + translate — the card's layout box never
       changes height, so the page never shifts under you)
     · the service illustration draws itself in
   Cards the marker has passed stay open; scrolling back up
   folds them again. Every open card runs its illustration's
   idle loop; the newest one is "focused": blue frame and
   full-strength drawing.
   ────────────────────────────────────────────────────────── */

const SCRAMBLE = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789#%&/<>*+=";
const NODE_OFFSET = 36; // px — node sits at top-9 of each row

export default function Services() {
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeOffsets = useRef<number[]>([]);
  const [openCount, setOpenCount] = useState(0);

  // Progress of the timeline column through the viewport centre.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.6", "end 0.4"],
  });
  const markerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* How many rows the marker has reached: marker px vs node px */
  const sync = (p: number) => {
    const h = listRef.current?.offsetHeight ?? 0;
    const markerPx = p * h;
    const n = nodeOffsets.current.filter((o) => markerPx >= o).length;
    setOpenCount((c) => (c === n ? c : n));
  };

  useLayoutEffect(() => {
    const measure = () => {
      nodeOffsets.current = rowRefs.current.map(
        (el) => (el?.offsetTop ?? 0) + NODE_OFFSET,
      );
      sync(scrollYProgress.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", sync);

  const opened = reduceMotion ? SERVICES.length : openCount;

  return (
    <section id="services" data-theme="dark" className="bg-ink text-white">
      <div className="container-page section-y">
        {/* ── Heading ── */}
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>
        <RevealText
          text="Expertise that moves you forward."
          className="mt-5 max-w-3xl font-display text-h2 font-semibold lg:max-w-none lg:whitespace-nowrap"
        />
        <Reveal as="p" delay={0.1} className="mt-5 max-w-xl text-lead text-white/60">
          We bring the skills and perspective to help your business take its next step.
        </Reveal>

        {/* ── Timeline ── */}
        <div ref={listRef} className="relative mt-16 lg:mt-24">
          {/* Centre dashed line + progress + marker */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[11px] w-px -translate-x-1/2 md:left-1/2"
          >
            <div className="absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.28)_0_2px,transparent_2px_12px)]" />
            {!reduceMotion && (
              <>
                <m.div
                  style={{ scaleY: scrollYProgress }}
                  className="absolute inset-0 origin-top bg-gradient-to-b from-primary/30 via-primary/80 to-primary"
                />
                {/* full-height carrier, translated by % of its own height */}
                <m.div style={{ y: markerY }} className="absolute inset-x-0 top-0 h-full">
                  {/* comet tail */}
                  <span className="absolute -top-16 left-1/2 h-16 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent to-glow/70 blur-[1px]" />
                  <span className="absolute left-1/2 top-0 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0_0_18px_rgba(130,190,255,0.95)]" />
                </m.div>
              </>
            )}
          </div>

          {/* Rows — on desktop the zigzag is a staircase: each card
              starts exactly where the previous one ends */}
          <div className="flex flex-col gap-10 md:gap-0">
            {SERVICES.map((s, i) => (
              <div
                key={s.slug}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
              >
                <ServiceRow
                  service={s}
                  side={i % 2 === 0 ? "right" : "left"}
                  open={i < opened}
                  focused={!reduceMotion && i === opened - 1}
                  reduceMotion={reduceMotion}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── One timeline row — node + connector + card ── */

function ServiceRow({
  service,
  side,
  open,
  focused,
  reduceMotion,
}: {
  service: Service;
  side: "left" | "right";
  open: boolean;
  focused: boolean;
  reduceMotion: boolean;
}) {
  const rightSide = side === "right";

  return (
    <div className="relative pl-8 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0">
      {/* node where this row meets the centre line */}
      <span
        aria-hidden
        className={[
          "absolute left-[11px] top-9 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 transition-[background-color,box-shadow] duration-500 md:left-1/2",
          open
            ? "bg-primary shadow-[0_0_12px_rgba(77,162,255,0.8)]"
            : "bg-white/25",
        ].join(" ")}
      />
      {/* one-shot ping each time the row opens */}
      {open && !reduceMotion && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-[11px] top-9 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
        >
          <span className="svc-ping block h-[7px] w-[7px] border border-primary" />
        </span>
      )}
      {/* connector draws out toward the card */}
      <span
        aria-hidden
        className={[
          "absolute top-9 hidden h-px w-16 -translate-y-1/2 bg-white/15 md:block",
          rightSide ? "left-1/2" : "right-1/2",
        ].join(" ")}
      >
        <span
          className={[
            "absolute inset-0 bg-primary/70 transition-transform duration-500 ease-out",
            rightSide ? "origin-left" : "origin-right",
            open ? "scale-x-100" : "scale-x-0",
          ].join(" ")}
        />
      </span>

      {/* desktop cards are capped and hug the centre line */}
      <div className={rightSide ? "md:col-start-2 md:max-w-lg" : "md:col-start-1 md:ml-auto md:max-w-lg"}>
        <ServiceCard
          service={service}
          open={open}
          focused={focused}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
}

/* ── The unfolding card ──
   `progress` (0 closed → 1 open) drives two things in lockstep:
     · clip-path on the card body: reveals top → bottom
     · the bottom edge (+ its corner squares) translating down
       from the header line to the card's real bottom
   --hh is the header height, so both work in pure CSS calc()
   without measuring anything. */

function ServiceCard({
  service,
  open,
  focused,
  reduceMotion,
}: {
  service: Service;
  open: boolean;
  focused: boolean;
  reduceMotion: boolean;
}) {
  const { n, title, desc, slug } = service;

  /* The illustration (dozens of animated paths) mounts the first
     time the card opens — it draws in at that moment anyway, and
     skipping it at load keeps hydration light. */
  const [graphicMounted, setGraphicMounted] = useState(false);
  if (open && !graphicMounted) setGraphicMounted(true);

  const progress = useMotionValue(reduceMotion ? 1 : 0);
  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, open ? 1 : 0, {
      duration: open ? 0.95 : 0.6,
      ease: open ? EASE_OUT : EASE_IN_OUT,
    });
    return () => controls.stop();
  }, [open, reduceMotion, progress]);

  const clipPath = useTransform(
    progress,
    (v) => `inset(-6px -6px calc((100% - var(--hh)) * ${(1 - v).toFixed(4)}) -6px)`,
  );
  const edgeY = useTransform(
    progress,
    (v) => `calc((var(--hh) - 100%) * ${(1 - v).toFixed(4)})`,
  );

  const frame = focused ? "border-primary/40" : "border-white/10";
  const corner = open ? (focused ? "bg-primary" : "bg-glow/60") : "bg-white/20";

  return (
    <div className="relative [--hh:69px] md:[--hh:77px]">
      {/* top corner squares (static) */}
      <span aria-hidden className={`absolute left-0 top-0 z-10 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${corner}`} />
      <span aria-hidden className={`absolute right-0 top-0 z-10 h-[5px] w-[5px] -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${corner}`} />

      {/* card body — clipped, never resized */}
      <m.article
        style={{ clipPath }}
        className={`relative border-x border-t bg-elevated/60 transition-colors duration-500 ${frame}`}
      >
        {/* header */}
        <div
          className={`flex h-[var(--hh)] items-center gap-4 border-b px-4 transition-colors duration-500 md:px-5 ${frame}`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center border font-mono text-xs transition-colors duration-500 ${
              open ? "border-primary/50 text-glow" : "border-white/15 text-white/60"
            }`}
          >
            {n}
          </span>
          <h3
            className={`font-mono text-sm uppercase tracking-[0.12em] transition-colors duration-500 ${
              open ? "text-white" : "text-white/50"
            }`}
          >
            <ScrambleTitle text={title} play={open} reduceMotion={reduceMotion} />
          </h3>
          <span
            aria-hidden
            className={`ml-auto h-1.5 w-1.5 rounded-full transition-[background-color,box-shadow] duration-500 ${
              focused
                ? "bg-glow shadow-[0_0_10px_rgba(130,190,255,0.9)]"
                : open
                  ? "bg-white/30"
                  : "bg-white/10"
            }`}
          />
        </div>

        {/* illustration on a faint blueprint dot-grid — inert while
            folded so hidden content never takes keyboard focus */}
        <div className="relative h-[200px] md:h-[230px]" inert={!open && !reduceMotion}>
          <div
            aria-hidden
            className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
          />
          <m.div
            initial={false}
            animate={{ opacity: focused || reduceMotion ? 1 : 0.6 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="absolute inset-0 px-4 py-2.5"
          >
            {(graphicMounted || reduceMotion) && (
              <ServiceGraphic
                art={slug}
                open={open}
                reduceMotion={reduceMotion}
              />
            )}
          </m.div>
        </div>

        {/* body: description — always reserves two lines so every
            card is the same height, whether its copy wraps or not */}
        <m.div
          initial={false}
          animate={
            open || reduceMotion
              ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.35 } }
              : { opacity: 0, y: 8, transition: { duration: 0.25 } }
          }
          className="border-t border-white/10 p-4 md:p-5"
          inert={!open && !reduceMotion}
        >
          <p className="min-h-[2lh] text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">{desc}</p>
        </m.div>
      </m.article>

      {/* bottom edge + corners — slides down with the clip */}
      <m.div
        aria-hidden
        style={{ y: edgeY }}
        className="pointer-events-none absolute inset-0"
      >
        <span className={`absolute inset-x-0 bottom-0 h-px transition-colors duration-500 ${focused ? "bg-primary/40" : "bg-white/10"}`} />
        <span className={`absolute bottom-0 left-0 h-[5px] w-[5px] -translate-x-1/2 translate-y-1/2 transition-colors duration-500 ${corner}`} />
        <span className={`absolute bottom-0 right-0 h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 transition-colors duration-500 ${corner}`} />
      </m.div>
    </div>
  );
}

/* ── Title that decodes out of a scramble ──
   Real text at rest (SSR, closed and open). Each time `play`
   turns true the chars scramble and resolve left→right over
   ~650ms. Spans are mutated directly to avoid re-renders, and
   the real text is always restored on cleanup. */

function ScrambleTitle({
  text,
  play,
  reduceMotion,
}: {
  text: string;
  play: boolean;
  reduceMotion: boolean;
}) {
  const chars = text.replace(/ /g, "").split("");
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!play || reduceMotion) return;
    const n = chars.length;
    const DURATION = 650;
    const startTime = performance.now();
    let raf = 0;

    const paint = (p: number) => {
      for (let i = 0; i < n; i++) {
        const el = spanRefs.current[i];
        const ch = chars[i];
        if (!el) continue;
        const cp = clamp((p - (i / n) * 0.5) / 0.5, 0, 1);
        el.textContent = cp >= 1 ? ch : randGlyph();
        el.style.opacity = cp >= 1 ? "" : String(0.35 + cp * 0.65);
      }
    };

    const tick = (now: number) => {
      const t = clamp((now - startTime) / DURATION, 0, 1);
      paint(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      paint(1); // never leave scrambled glyphs behind
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, reduceMotion]);

  /* letters are inline-blocks (so glyph swaps never reflow); each
     word is a nowrap group so lines only break between words */
  let idx = 0;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="whitespace-nowrap">
              {word.split("").map((ch) => {
                const i = idx++;
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      spanRefs.current[i] = el;
                    }}
                    className="inline-block"
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </>
  );
}

/* ── helpers ── */

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function randGlyph() {
  return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
}
