"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import ArrowIcon from "./ui/ArrowIcon";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Escape closes the menu
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // scrolled state + scroll-progress seam, rAF-throttled
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(y / max, 1) : 0;
      document
        .querySelector<HTMLElement>(".nav-progress")
        ?.style.setProperty("--scroll-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <span className="nav-progress" aria-hidden="true" />
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Rosmox — home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Rosmox</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">
          Start a project
          <ArrowIcon size={12} />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
        <div className="mobile-menu-links">
          {links.map((l, index) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ "--i": index } as CSSProperties}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {l.label}
              <span className="menu-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="mobile-menu-cta"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        >
          Start a project
          <ArrowIcon size={13} />
        </Link>
      </nav>
    </header>
  );
}
