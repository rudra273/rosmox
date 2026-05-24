"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SectionHead from "./SectionHead";

const testimonials = [
  {
    avatar: "AK",
    name: "Anya Kowal",
    role: "Co-founder, Halden Labs",
    quote:
      "Rosmox shipped our v1 in eight weeks, and it's still the cleanest codebase we own.",
  },
  {
    avatar: "RM",
    name: "Rahul Menon",
    role: "VP Operations, Sundra",
    quote:
      "They treated our agent infrastructure like a real product. Our support backlog is gone.",
  },
  {
    avatar: "EC",
    name: "Elena Costa",
    role: "Founder, Mirroir Studio",
    quote:
      "Design that holds up under load. Engineering that holds up under scale.",
  },
];

const total = testimonials.length;
const wrap = (index: number) => (index % total + total) % total;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previousRectsRef = useRef<Map<number, DOMRect>>(new Map());
  const slideStepRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const animationCycleRef = useRef(0);

  // Three circular slots: previous (left), active (center), next (right).
  const slots = useMemo(
    () => [
      { offset: -1, index: wrap(active - 1) },
      { offset: 0, index: active },
      { offset: 1, index: wrap(active + 1) },
    ],
    [active],
  );

  const captureCardRects = useCallback(() => {
    const rects = new Map<number, DOMRect>();
    cardRefs.current.forEach((node, index) => {
      if (node) rects.set(index, node.getBoundingClientRect());
    });
    previousRectsRef.current = rects;
  }, []);

  const rotate = useCallback(
    (step: number) => {
      slideStepRef.current = step > 0 ? 1 : -1;
      captureCardRects();
      setActive((current) => wrap(current + step));
    },
    [captureCardRects],
  );

  useLayoutEffect(() => {
    const previousRects = previousRectsRef.current;
    if (previousRects.size === 0) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const cycle = animationCycleRef.current + 1;
    animationCycleRef.current = cycle;
    const animatedCards: HTMLButtonElement[] = [];
    const slideStep = slideStepRef.current;
    const trackWidth = cardsRef.current?.getBoundingClientRect().width ?? 0;

    cardRefs.current.forEach((node) => {
      node?.classList.remove("is-sliding", "is-sliding-active");
    });

    slots.forEach(({ index }) => {
      const node = cardRefs.current[index];
      const previousRect = previousRects.get(index);
      if (!node || !previousRect) return;

      const nextRect = node.getBoundingClientRect();
      let deltaX = previousRect.left - nextRect.left;
      if (trackWidth > 0) {
        if (slideStep > 0 && deltaX < 0) deltaX += trackWidth;
        if (slideStep < 0 && deltaX > 0) deltaX -= trackWidth;
      }
      if (Math.abs(deltaX) < 0.5) return;

      node.style.setProperty("--t-slide-x", `${deltaX}px`);
      node.classList.add("is-sliding");
      animatedCards.push(node);
    });

    rafRef.current = requestAnimationFrame(() => {
      animatedCards.forEach((node) => {
        const finish = (event?: TransitionEvent) => {
          if (event && event.propertyName !== "transform") return;
          node.removeEventListener("transitionend", finish);
          if (animationCycleRef.current !== cycle) return;

          node.classList.remove("is-sliding", "is-sliding-active");
          node.style.removeProperty("--t-slide-x");
        };

        node.addEventListener("transitionend", finish);
        window.setTimeout(finish, 460);
        node.classList.add("is-sliding-active");
        node.style.setProperty("--t-slide-x", "0px");
      });
      previousRectsRef.current = new Map();
      rafRef.current = null;
    });
  }, [active, slots]);

  // Gesture handling: wheel (two-finger / trackpad) + swipe, both rotate the
  // circular set. Loops infinitely in either direction.
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    let wheelLock = false;
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dx) < 8) return;
      e.preventDefault(); // keep the page from scrolling while swiping the strip
      if (wheelLock) return;
      wheelLock = true;
      rotate(dx > 0 ? 1 : -1);
      setTimeout(() => (wheelLock = false), 280);
    };

    let startX: number | null = null;
    const onPointerDown = (e: PointerEvent) => {
      startX = e.clientX;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      rotate(dx < 0 ? 1 : -1); // drag left → next, right → prev
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [rotate]);

  return (
    <section id="words">
      <div className="container">
        <SectionHead
          label="From clients"
          title="Words from the people we've shipped with."
        />
        <div className="testimonials-shell">
          <div className="testimonials" aria-live="polite">
            <blockquote className="t-quote" key={testimonial.name}>
              <span className="t-mark t-mark-open">&ldquo;</span>
              <p className="t-quote-text">{testimonial.quote}</p>
              <span className="t-mark t-mark-close">&rdquo;</span>
            </blockquote>
            <div
              className="t-cards"
              role="tablist"
              aria-label="Choose a testimonial"
              ref={cardsRef}
              style={{ touchAction: "pan-y" }}
            >
              {slots.map(({ offset, index }) => {
                const item = testimonials[index];
                const isActive = offset === 0;
                return (
                  <button
                    key={index}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={
                      offset < 0
                        ? "Show previous testimonial"
                        : "Show next testimonial"
                    }
                    className={`t-profile${isActive ? " is-active" : ""}`}
                    onClick={() => rotate(isActive ? 1 : offset)}
                  >
                    <div className="t-avatar">{item.avatar}</div>
                    <div>
                      <div className="t-name">{item.name}</div>
                      <div className="t-role">{item.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
