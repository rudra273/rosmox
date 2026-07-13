"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";

interface Principle {
  num: string;
  title: string;
  desc: string;
}

const principles: Principle[] = [
  {
    num: "01",
    title: "Production over demos",
    desc: "Everything we show is built to run — tests, evals, traces, and monitoring behind every feature, not a staged screen recording.",
  },
  {
    num: "02",
    title: "Private by default",
    desc: "Our AI runs on the device when it can. Data stays with the user unless they choose otherwise — no accounts required to start.",
  },
  {
    num: "03",
    title: "Fast is a feature",
    desc: "We budget performance like scope — cold start, first paint, battery. If it isn't fast on a mid-range phone, it isn't done.",
  },
  {
    num: "04",
    title: "Humans own decisions",
    desc: "Agents do the work. A person is accountable for every output that ships.",
  },
];

export default function Principles() {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.1, margin: "0px 0px -60px 0px" });

  return (
    <section id="principles" aria-labelledby="principles-title">
      <div className="container">
        <SectionHead
          label="Principles"
          index="04"
          title={<span id="principles-title">Principles, not promises.</span>}
        >
          No vanity metrics, no borrowed logos. The rules we build by — and the
          products that prove them.
        </SectionHead>

        <div ref={listRef} className={`principle-rows${inView ? " in" : ""}`}>
          {principles.map((p) => (
            <article className="principle-row" key={p.num}>
              <div className="principle-num">/{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
