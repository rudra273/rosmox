"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import ArrowIcon from "../components/ui/ArrowIcon";

type Status = "idle" | "submitting" | "success";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // No backend yet — simulate a send, then show confirmation.
    // Wire this to an API route / email service when ready.
    setTimeout(() => setStatus("success"), 700);
  };

  return (
    <main className="contact-page">
      <nav className="privacy-nav">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span> ROSMOX
        </Link>
      </nav>

      <div className="container">
        <div className="contact-wrap">
          <div className="section-label">Get in touch</div>
          <h1 className="contact-title">
            Let&apos;s build something <span className="serif">people use.</span>
          </h1>
          <p className="contact-sub">
            Tell us about the project. We respond within one business day — or
            email us directly at{" "}
            <a href="mailto:hello@rosmox.com" className="contact-mail">
              hello@rosmox.com
            </a>
            .
          </p>

          {status === "success" ? (
            <div className="contact-success">
              <div className="contact-success-dot" />
              <h3>Thanks, {form.name || "there"} — message received.</h3>
              <p>We&apos;ll get back to you within one business day.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="field">
                <span>Company (optional)</span>
                <input
                  type="text"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Company or product"
                />
              </label>
              <label className="field">
                <span>Project details</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What are you building? Timeline, scope, anything useful."
                />
              </label>
              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                <ArrowIcon size={13} />
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
