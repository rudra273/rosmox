"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ContactPage() {
  useEffect(() => {
    // Scroll reveal logic
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="flex-1">
        <section className="section" style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
          <div className="section-inner max-w-[1100px] mx-auto px-8">
            <div className="text-center mb-16" data-animate>
              <span className="section-label">Contact Us</span>
              <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', marginBottom: '1rem' }}>
                Let&apos;s build the future.
              </h1>
              <p className="hero-description" style={{ maxWidth: '600px' }}>
                Have a project in mind or want to learn more about our AI-powered SaaS solutions? Drop us a message and our team will get back to you.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12 items-start mt-12 text-left">
              
              {/* Contact Info (Left) */}
              <div className="md:col-span-2 space-y-6" data-animate>
                <div className="service-card" style={{ padding: '2rem' }}>
                  <h3 className="service-title" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Reach out directly</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', marginBottom: '0.25rem' }}>Email</p>
                      <a href="mailto:hello@rosmox.com" style={{ color: 'var(--text-primary)', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color='var(--accent-1)'} onMouseOut={e => e.currentTarget.style.color='var(--text-primary)'}>hello@rosmox.com</a>
                    </div>
                    
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', marginBottom: '0.25rem' }}>Location</p>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Bhubaneswar, India</p>
                    </div>

                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', marginBottom: '0.25rem' }}>Working Hours</p>
                      <p style={{ color: 'var(--text-secondary)' }}>Monday - Friday<br/>9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right) */}
              <div className="md:col-span-3" data-animate>
                <div className="service-card" style={{ padding: '2.5rem' }}>
                  
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5 flex flex-col">
                        <label htmlFor="firstName" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>First Name</label>
                        <input 
                          type="text" 
                          id="firstName"
                          placeholder="John" 
                          style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-muted)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent-1)'; e.target.style.boxShadow = '0 0 0 1px var(--accent-1)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                      <div className="space-y-1.5 flex flex-col">
                        <label htmlFor="lastName" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Last Name</label>
                        <input 
                          type="text" 
                          id="lastName"
                          placeholder="Doe" 
                          style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-muted)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent-1)'; e.target.style.boxShadow = '0 0 0 1px var(--accent-1)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        placeholder="john@example.com" 
                        style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-muted)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent-1)'; e.target.style.boxShadow = '0 0 0 1px var(--accent-1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label htmlFor="subject" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Subject</label>
                      <div style={{ position: 'relative' }}>
                        <select 
                          id="subject"
                          style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-muted)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s', appearance: 'none', cursor: 'pointer' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent-1)'; e.target.style.boxShadow = '0 0 0 1px var(--accent-1)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales & Partnerships</option>
                          <option value="support">Technical Support</option>
                        </select>
                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-tertiary)' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Message</label>
                      <textarea 
                        id="message"
                        rows="4" 
                        placeholder="How can we help you?" 
                        style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-muted)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s', resize: 'vertical', minHeight: '100px' }}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent-1)'; e.target.style.boxShadow = '0 0 0 1px var(--accent-1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border-muted)'; e.target.style.boxShadow = 'none'; }}
                      ></textarea>
                    </div>

                    <button type="submit" className="cta-button" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                      Send Message <span className="link-arrow">→</span>
                    </button>
                  </form>

                </div>
              </div>
              
            </div>
          </div>
        </section>
    </main>
  );
}
