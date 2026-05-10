"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── SVG Icons ── */
const ChipIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
  </svg>
);

const GlobeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PhoneIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

const ServerIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const OrbitIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
  </svg>
);

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
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

    const handleScroll = () => {
      const y = window.scrollY;
      document.querySelector(".nav-pill")?.classList.toggle("nav-scrolled", y > 100);
      document.querySelectorAll(".hero-orb").forEach((orb, i) => {
        orb.style.transform = `translateY(${y * (i + 1) * 0.12}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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
          <a href="#services" className="nav-link">Services</a>
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
            We engineer intelligent, AI-powered<br />SaaS solutions for modern businesses.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-bar" data-animate>
        <div className="stats-inner">
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Products Shipped</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">1K+</span>
            <span className="stat-label">Users</span>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="section" id="services" data-animate>
        <div className="section-inner">
          <span className="section-label">What We Do</span>
          <h2 className="section-heading">Our capabilities</h2>
          <div className="services-grid">
            <div className="service-card" data-animate>
              <div className="icon-wrap"><ChipIcon size={22} /></div>
              <h3 className="service-title">Agentic AI Systems</h3>
              <p className="service-desc">Autonomous AI agents and intelligent automation pipelines that get real work done.</p>
            </div>
            <div className="service-card" data-animate>
              <div className="icon-wrap"><GlobeIcon size={22} /></div>
              <h3 className="service-title">Websites</h3>
              <p className="service-desc">Fast, modern websites built with Next.js — optimized for performance and SEO.</p>
            </div>
            <div className="service-card" data-animate>
              <div className="icon-wrap"><PhoneIcon size={22} /></div>
              <h3 className="service-title">Mobile Apps</h3>
              <p className="service-desc">Native Android apps built with Flutter — clean, fast, and production-ready.</p>
            </div>
            <div className="service-card" data-animate>
              <div className="icon-wrap"><ServerIcon size={22} /></div>
              <h3 className="service-title">Backend</h3>
              <p className="service-desc">APIs, databases, and infrastructure that scale with your product.</p>
            </div>
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
            <article className="product-card" data-animate>
              <div className="product-card-inner">
                <div className="product-header">
                  <Image
                    src="/project/vidyalaya.png"
                    alt="Vidyālaya app logo"
                    width={56}
                    height={56}
                    className="product-app-logo"
                  />
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
                  <Link href="/projects/vidyalaya" className="product-link">
                    Learn More <span className="link-arrow">→</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* OrbitAI */}
            <article className="product-card" data-animate>
              <div className="product-card-inner">
                <div className="product-header">
                  <div className="icon-wrap icon-wrap-lg"><OrbitIcon size={26} /></div>
                  <div className="product-meta">
                    <span className="product-badge">Android</span>
                    <span className="product-year">2026</span>
                  </div>
                </div>
                <h3 className="product-name">OrbitAI</h3>
                <p className="product-description">
                  On-device AI chat and productivity assistant.
                  Private, offline-capable, with RAG and local LLM inference.
                </p>
                <div className="product-links">
                  <Link href="/projects/orbitai" className="product-link product-link-primary">
                    Learn More <span className="link-arrow">→</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Storely */}
            <article className="product-card" data-animate>
              <div className="product-card-inner">
                <div className="product-header">
                  <Image
                    src="/project/storely.png"
                    alt="Storely app logo"
                    width={56}
                    height={56}
                    className="product-app-logo"
                  />
                  <div className="product-meta">
                    <span className="product-badge">Android</span>
                    <span className="product-year">2026</span>
                  </div>
                </div>
                <h3 className="product-name">Storely</h3>
                <p className="product-description">
                  Inventory, barcode scanning, and billing for store owners.
                  Local-first and built for everyday shop workflows.
                </p>
                <div className="product-links">
                  <a href="#" className="product-link product-link-primary">
                    Play Store <span className="link-arrow">→</span>
                  </a>
                  <Link href="/projects/storely" className="product-link">
                    Learn More <span className="link-arrow">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Testimonials ── */}
      <section className="section" data-animate>
        <div className="section-inner">
          <span className="section-label">Testimonials</span>
          <h2 className="section-heading">What people say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card" data-animate>
              <p className="testimonial-quote">&ldquo;ROSMOX delivered exactly what we needed — a clean, fast app that our students love. Professional team with real attention to detail.&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" />
                <div className="testimonial-info">
                  <span className="testimonial-name">Client Name</span>
                  <span className="testimonial-role">Role, Company</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card" data-animate>
              <p className="testimonial-quote">&ldquo;Working with ROSMOX was seamless. They understood our requirements perfectly and shipped ahead of schedule.&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" />
                <div className="testimonial-info">
                  <span className="testimonial-name">Client Name</span>
                  <span className="testimonial-role">Role, Company</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card" data-animate>
              <p className="testimonial-quote">&ldquo;Top-notch engineering. The backend they built handles our scale effortlessly. Highly recommend.&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" />
                <div className="testimonial-info">
                  <span className="testimonial-name">Client Name</span>
                  <span className="testimonial-role">Role, Company</span>
                </div>
              </div>
            </div>
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
        <div className="footer-grid">
          <div className="footer-column footer-brand-col">
            <span className="footer-brand">ROSMOX</span>
            <p className="footer-tagline">We build software that ships.</p>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <a href="#services" className="footer-link">Services</a>
            <a href="#products" className="footer-link">Products</a>
            <a href="#" className="footer-link">Portfolio</a>
            <a href="mailto:placeholder@rosmox.com" className="footer-link">Contact</a>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Connect</h4>
            <a href="#" className="footer-link">GitHub</a>
            <a href="#" className="footer-link">Twitter / X</a>
            <a href="#" className="footer-link">LinkedIn</a>
            <a href="mailto:placeholder@rosmox.com" className="footer-link">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 ROSMOX. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
