"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";

interface WorkItem {
  size: "lg" | "md" | "sm";
  vis: string; // vis-1 .. vis-5
  name: string;
  role: string;
  live: boolean;
}

const items: WorkItem[] = [
  {
    size: "lg",
    vis: "vis-1",
    name: "Halden Labs — analytics dashboard",
    role: "Web platform · React · D3 · 2025",
    live: true,
  },
  { size: "md", vis: "vis-2", name: "North Atlas", role: "Marketing site · 2025", live: true },
  { size: "md", vis: "vis-3", name: "Verge & Co.", role: "Developer portal · 2024", live: true },
  { size: "sm", vis: "vis-4", name: "Sundra", role: "Android app · 2024", live: false },
  { size: "sm", vis: "vis-5", name: "Kindred Health", role: "Patient portal · 2025", live: true },
  { size: "sm", vis: "vis-2", name: "Mirroir Studio", role: "Portfolio site · 2024", live: false },
];

export default function Work() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.15, margin: "0px 0px -60px 0px" });

  return (
    <section id="work">
      <div className="container">
        <SectionHead label="Selected work" title="Sites, apps & systems we've shipped.">
          A small sample. We work with founders, ops teams, and agencies —
          usually in 6–12 week engagements.
        </SectionHead>

        <div ref={gridRef} className={`work${inView ? " in" : ""}`}>
          {items.map((item, i) => (
            <div className={`work-item ${item.size} ${item.vis}`} key={`${item.name}-${i}`}>
              {item.live && <span className="live-dot" />}
              <div className="work-meta">
                <div className="client-name">{item.name}</div>
                <div className="client-role">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
