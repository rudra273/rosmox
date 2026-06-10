"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

const phases = [
  {
    num: "Phase 01 / 04",
    title: "The brief",
    desc: "You bring the problem and the constraints. One working session, no decks.",
  },
  {
    num: "Phase 02 / 04",
    title: "The plan",
    desc: "We break it into a system: scope, architecture, milestones — visible from day one.",
  },
  {
    num: "Phase 03 / 04",
    title: "The build",
    desc: "Design, engineering, and QA run in parallel — with humans owning every decision that matters.",
  },
  {
    num: "Phase 04 / 04",
    title: "The ship",
    desc: "Launch, monitor, iterate. We stay on after release to make sure it lands.",
  },
];

/** node boxes: [x, y, w, h, label, sub] */
const nodes: Array<[number, number, number, number, string, string, number]> = [
  [10, 120, 150, 44, "Brief", "your problem", 0],
  [260, 120, 150, 44, "Plan", "scope · architecture", 1],
  [520, 38, 170, 44, "Design", "interface · motion", 2],
  [520, 120, 170, 44, "Engineering", "product · agents", 2],
  [520, 202, 170, 44, "QA + Evals", "tests · traces", 2],
  [800, 120, 150, 44, "Ship", "launch · iterate", 3],
];

const rails = [
  "M160 142 L260 142",
  "M410 142 C 465 142, 465 60, 520 60",
  "M410 142 L520 142",
  "M410 142 C 465 142, 465 224, 520 224",
  "M690 60 C 745 60, 745 142, 800 142",
  "M690 142 L800 142",
  "M690 224 C 745 224, 745 142, 800 142",
];

/**
 * AgentFlow — the pinned mid-page set piece. As the visitor scrolls, the
 * signal travels through the build pipeline: brief -> plan -> parallel
 * agents -> ship. With reduced motion the section unpins and renders the
 * finished diagram with all phases stacked (handled in CSS).
 */
export default function AgentFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPhase(v < 0.28 ? 0 : v < 0.52 ? 1 : v < 0.78 ? 2 : 3);
  });

  // each wire segment draws across its slice of the pinned scroll
  const seg1 = useTransform(progress, [0.08, 0.26], [0, 1]);
  const seg2 = useTransform(progress, [0.3, 0.5], [0, 1]);
  const seg3 = useTransform(progress, [0.56, 0.76], [0, 1]);
  const segs = [seg1, seg2, seg2, seg2, seg3, seg3, seg3];

  const activePhase = reduced ? 3 : phase;

  return (
    <section className="agentflow" ref={sectionRef} aria-labelledby="agentflow-title">
      <div className="agentflow-sticky">
        <div className="agentflow-head">
          <div className="section-label">
            <span className="index" aria-hidden="true">02</span>
            How we build
          </div>
          <h2 id="agentflow-title">
            One brief in. <span className="serif">A working system out.</span>
          </h2>
        </div>

        <div className="agentflow-stage">
          <svg viewBox="0 0 960 284" aria-hidden="true">
            <defs>
              <linearGradient id="af-seam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#66A3FF" />
                <stop offset="100%" stopColor="#8BD9FF" />
              </linearGradient>
            </defs>

            {/* faint rails, always visible */}
            {rails.map((d) => (
              <path key={`rail-${d}`} className="af-rail" d={d} />
            ))}

            {/* the signal wires draw in as you scroll */}
            {rails.map((d, i) => (
              <motion.path
                key={`wire-${d}`}
                className="af-wire"
                d={d}
                style={{ pathLength: reduced ? 1 : segs[i] }}
              />
            ))}

            {nodes.map(([x, y, w, h, label, sub, ph]) => (
              <g
                key={label}
                className={`af-node${activePhase >= ph ? " active" : ""}`}
              >
                <rect className="af-node-box" x={x} y={y} width={w} height={h} rx={10} />
                <circle className="af-node-dot" cx={x + 20} cy={y + h / 2} r={4} />
                <text className="af-node-label" x={x + 34} y={y + h / 2 - 2}>
                  {label}
                </text>
                <text className="af-node-sub" x={x + 34} y={y + h / 2 + 13}>
                  {sub}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="agentflow-caption">
          {phases.map((p, i) => (
            <div className={`af-phase${activePhase === i || reduced ? " active" : ""}`} key={p.num}>
              <div className="af-phase-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="agentflow-progress" aria-hidden="true">
          <span>signal</span>
          <span className="bar">
            <motion.span className="bar-fill" style={{ scaleX: progress }} />
          </span>
          <span>ship</span>
        </div>
      </div>
    </section>
  );
}
