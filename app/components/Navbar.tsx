"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

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

  // pill gains depth once the page scrolls
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 16);
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
      <div className="nav-pill">
        <Link href="/" className="brand" aria-label="Rosmox — home">
          <span className="brand-orb" aria-hidden="true" />
          Rosmox
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-grad nav-cta">
          Start a project <span className="arr">→</span>
        </Link>
        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-links">
          {[...links, { href: "/contact", label: "Contact" }].map((l, index) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ "--i": index } as CSSProperties}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {l.label}
              <span className="mm-num mono" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="btn btn-grad mobile-menu-cta"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        >
          Start a project <span className="arr">→</span>
        </Link>
      </nav>
    </header>
  );
}
