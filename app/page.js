"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Scroll-triggered reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

    // Nav scroll state + hero parallax
    const handleScroll = () => {
      const y = window.scrollY;
      document.querySelector(".nav-pill")?.classList.toggle("nav-scrolled", y > 100);
      document.querySelectorAll(".hero-orb").forEach((orb, i) => {
        orb.style.transform = `translateY(${y * (i + 1) * 0.12}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mouse spotlight on hero
    const hero = heroRef.current;
    const handleMouse = (e) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
      hero.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
    };
    hero?.addEventListener("mousemove", handleMouse);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      hero?.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className="nav-pill" id="main-nav">
        <Link href="/" className="nav-logo">ROSMOX</Link>
        <div className="nav-divider" />
        <div className="nav-links">
          <a href="#products" className="nav-link">Products</a>
          <a href="mailto:placeholder@rosmox.com" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">ROSMOX</h1>
          <p className="hero-description">
            We design and build production-grade<br />apps and digital products.
          </p>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section section-about" data-animate>
        <div className="section-inner">
          <span className="section-label">About</span>
          <h2 className="section-heading">We build software<br />that ships.</h2>
          <div className="about-text">
            <p>
              ROSMOX is a product studio focused on building clean, functional
              apps and websites. We prioritize craft over complexity — shipping
              products that people actually use.
            </p>
            <p>
              Every product we release is production-grade: optimized, tested,
              and built with real users in mind.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Products ── */}
      <section className="section section-products" id="products" data-animate>
        <div className="section-inner">
          <span className="section-label">Products</span>
          <h2 className="section-heading">What we&apos;ve shipped</h2>
          <div className="products-grid">
            {/* Vidyālaya */}
            <article className="product-card">
              <div className="product-card-inner">
                <div className="product-header">
                  <div className="product-icon">📚</div>
                  <div className="product-meta">
                    <span className="product-badge">Android</span>
                    <span className="product-year">2026</span>
                  </div>
                </div>
                <h3 className="product-name">Vidyālaya</h3>
                <p className="product-description">
                  Offline textbook reader for Indian school students.
                  No ads, no tracking — just learning.
                </p>
                <div className="product-links">
                  <a href="#" className="product-link product-link-primary">
                    Play Store <span className="link-arrow">→</span>
                  </a>
                  <Link href="/projects/vidyalaya/privacy-policy" className="product-link">
                    Privacy Policy <span className="link-arrow">→</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Coming soon */}
            <article className="product-card product-card-coming">
              <div className="product-card-inner">
                <div className="product-header">
                  <div className="product-icon">⚡</div>
                </div>
                <h3 className="product-name">More coming</h3>
                <p className="product-description">
                  We&apos;re working on something new. Stay tuned.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-cta" data-animate>
        <div className="section-inner cta-inner">
          <h2 className="cta-heading">Got a project?</h2>
          <p className="cta-subtext">Let&apos;s build something together.</p>
          <a href="mailto:placeholder@rosmox.com" className="cta-button">
            Get in touch <span className="link-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer" id="footer">
        <div className="footer-inner">
          <span className="footer-logo">ROSMOX</span>
          <span className="footer-copy">© 2026 ROSMOX. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
