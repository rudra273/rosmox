"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import ArrowIcon from "./ui/ArrowIcon";

const links = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`nav${menuOpen ? " menu-open" : ""}`}>
      <div className="nav-panel">
        <div className="nav-inner">
          <a href="#" className="brand">
            <span className="brand-dot" />
            <span>Rosmox</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="/contact" className="nav-cta">
            Book a call
            <ArrowIcon size={12} />
          </a>
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
              <a
                key={l.href}
                href={l.href}
                style={{ "--i": index } as CSSProperties}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mobile-menu-divider" />
          <a
            href="/contact"
            className="mobile-menu-cta"
            style={{ "--i": links.length } as CSSProperties}
            onClick={() => setMenuOpen(false)}
          >
            Book a call
            <ArrowIcon size={13} />
          </a>
        </nav>
      </div>
    </header>
  );
}
