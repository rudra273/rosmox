import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/* Shared building blocks for the product "spec sheet" pages.
   All server-safe — no hooks, no client code. */

export function CrumbBar({
  backHref,
  backLabel,
  right,
}: {
  backHref: string;
  backLabel: string;
  right?: string;
}) {
  return (
    <nav className="crumb-bar" aria-label="Breadcrumb">
      <div className="container crumb-inner mono">
        <Link href={backHref} className="crumb-back">
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
        {right && <span className="crumb-right">{right}</span>}
      </div>
    </nav>
  );
}

export function ProjectHero({
  badge,
  year,
  title,
  desc,
  logo,
  children,
}: {
  badge: string;
  year: string;
  title: string;
  desc: ReactNode;
  logo?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <header className="proj-hero">
      <div className="container">
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={88}
            height={88}
            className="proj-logo"
            priority
          />
        )}
        <div className="proj-meta mono">
          <span className="proj-badge">{badge}</span>
          <span className="proj-year">{year}</span>
        </div>
        <h1 className="display proj-title">{title}</h1>
        <p className="proj-desc">{desc}</p>
        {children && <div className="proj-actions">{children}</div>}
      </div>
    </header>
  );
}

export function StatusStamp({ children }: { children: ReactNode }) {
  return <span className="proj-stamp mono">{children}</span>;
}

export function ProjectSection({
  index,
  title,
  id,
  children,
}: {
  index: string;
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section className="proj-sec" id={id}>
      <div className="container">
        <div className="proj-sec-head">
          <span className="sec-index">{index}</span>
          <h2 className="display">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export function FeatureGrid({
  features,
}: {
  features: { title: string; desc: string }[];
}) {
  return (
    <div className="feat-grid">
      {features.map((f, i) => (
        <div className="feat-cell" key={f.title}>
          <span className="feat-num mono">{String(i + 1).padStart(2, "0")}</span>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function Screens({ labels }: { labels: string[] }) {
  return (
    <div className="screens">
      {labels.map((label) => (
        <div className="screen-frame" key={label}>
          <span className="mono">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="chip-list">
      {items.map((item) => (
        <li className="mono" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
