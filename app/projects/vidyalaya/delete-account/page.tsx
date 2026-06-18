"use client";

import Link from "next/link";
import { useState } from "react";

const SUPPORT_EMAIL = "rosmoxx@gmail.com";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const subject = "Vidyālaya — Account Deletion Request";
    const body = [
      "Hello ROSMOX team,",
      "",
      "I would like to request the deletion of my Vidyālaya account and all associated data.",
      "",
      `Account email: ${email}`,
      reason ? `Reason (optional): ${reason}` : "",
      "",
      "Please confirm once my account and data have been deleted.",
      "",
      "Thank you.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    // Open Gmail's web compose window prefilled to our support inbox.
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(SUPPORT_EMAIL)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="privacy-page">
      <nav className="privacy-nav">
        <Link href="/projects/vidyalaya" className="back-link">
          <span className="back-arrow">←</span> Vidyālaya
        </Link>
      </nav>

      <article className="privacy-container">
        <header className="privacy-header">
          <span className="privacy-badge">Vidyālaya</span>
          <h1 className="privacy-title">Delete Your Account</h1>
          <p className="privacy-date">Request account &amp; data deletion</p>
        </header>

        <div className="privacy-content">
          <section>
            <p>
              You can request deletion of your Vidyālaya account and all data
              associated with it — including your profile, saved conversations,
              and learning history. Enter the email address you signed in with
              and submit the form below. This opens a pre-filled email to our
              team at{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="privacy-link">
                {SUPPORT_EMAIL}
              </a>
              . We&apos;ll process your request and confirm once your account and
              data have been deleted.
            </p>
          </section>

          <form className="delete-form" onSubmit={handleSubmit}>
            <div className="delete-field">
              <label htmlFor="email">Account email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="delete-field">
              <label htmlFor="reason">
                Reason for leaving <span className="delete-optional">(optional)</span>
              </label>
              <textarea
                id="reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Anything you'd like us to know"
              />
            </div>

            <button type="submit" className="delete-submit">
              Request account deletion
            </button>

            <p className="delete-note">
              Submitting opens Gmail with your request pre-filled. If Gmail
              doesn&apos;t open, email us directly at{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="privacy-link">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </form>
        </div>
      </article>
    </div>
  );
}
