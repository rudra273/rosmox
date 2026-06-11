"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape closes the takeover
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // lock body scroll while the takeover is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`masthead${menuOpen ? " menu-open" : ""}`}>
        <div className="masthead-inner">
          <Link href="/" className="wordmark" aria-label="Rosmox — home">
            Rosmox<sup>®</sup>
          </Link>
          <span className="masthead-tag">AI software studio</span>
          <nav className="masthead-links" aria-label="Primary">
            {links.slice(0, 4).map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="btn btn-solid nav-cta">
            Start a project <span className="arr">→</span>
          </Link>
          <button
            type="button"
            className="menu-word"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="takeover-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-dot" aria-hidden="true" />
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <nav
        id="takeover-menu"
        className={`takeover${menuOpen ? " open" : ""}`}
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div className="takeover-links">
          {links.map((l, index) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ "--i": index } as CSSProperties}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="t-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="takeover-foot">
          <a href="mailto:hello@rosmox.com" tabIndex={menuOpen ? 0 : -1}>
            hello@rosmox.com
          </a>
          <span>AI software studio — est. 2025</span>
        </div>
      </nav>
    </>
  );
}
