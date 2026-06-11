"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CrumbBar } from "../components/project/ProjectKit";

type Status = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please tell us your name.";
  if (!form.email.trim()) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(form.email)) errors.email = "That email doesn't look right.";
  if (!form.message.trim()) errors.message = "A sentence or two about the project helps us prepare.";
  else if (form.message.trim().length < 10)
    errors.message = "A little more detail helps — what are you building?";
  return errors;
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      // clear an error as soon as the field is corrected
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // No backend yet — simulate a send, then show confirmation.
    // Wire this to an API route / email service when ready.
    setTimeout(() => setStatus("success"), 700);
  };

  const fieldProps = (field: keyof FormState) => ({
    value: form[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <div className="contact">
      <CrumbBar backHref="/" backLabel="Rosmox" right="Form RX-01 — Project intake" />

      <div className="container contact-grid">
        <header className="contact-rail">
          <p className="mono contact-eyebrow">Get in touch</p>
          <h1 className="display contact-title">
            Start
            <br />
            here<span className="hero-star">.</span>
          </h1>
          <dl className="contact-facts">
            <div>
              <dt className="mono">Direct line</dt>
              <dd>
                <a href="mailto:hello@rosmox.com" className="contact-mail">
                  hello@rosmox.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono">Response time</dt>
              <dd>Within one business day</dd>
            </div>
            <div>
              <dt className="mono">Engagements</dt>
              <dd>Usually 6–12 weeks</dd>
            </div>
          </dl>
        </header>

        <div className="contact-sheet">
          {status === "success" ? (
            <div className="contact-received" role="status">
              <span className="received-stamp mono">Received</span>
              <h2 className="display">
                Thanks, {form.name.trim() || "there"}.
              </h2>
              <p>
                Message logged. We&apos;ll get back to you within one business
                day.
              </p>
              <Link href="/" className="btn btn-outline">
                Back to home
              </Link>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field-row">
                <label className={`field${errors.name ? " has-error" : ""}`}>
                  <span className="mono">01 — Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    {...fieldProps("name")}
                  />
                  {errors.name && (
                    <span className="field-error" id="name-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </label>
                <label className={`field${errors.email ? " has-error" : ""}`}>
                  <span className="mono">02 — Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...fieldProps("email")}
                  />
                  {errors.email && (
                    <span className="field-error" id="email-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </label>
              </div>
              <label className="field">
                <span className="mono">03 — Company (optional)</span>
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="Company or product"
                  {...fieldProps("company")}
                />
              </label>
              <label className={`field${errors.message ? " has-error" : ""}`}>
                <span className="mono">04 — Project details</span>
                <textarea
                  rows={6}
                  placeholder="What are you building? Timeline, scope, anything useful."
                  {...fieldProps("message")}
                />
                {errors.message && (
                  <span className="field-error" id="message-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </label>
              <button
                type="submit"
                className="btn btn-solid contact-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    Sending
                    <span className="spinner" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message <span className="arr">→</span>
                  </>
                )}
              </button>
              <p className="contact-note">
                No mailing lists. No spam. Your message goes straight to the team.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
