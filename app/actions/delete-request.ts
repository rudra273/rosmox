"use server";

import { MIN_FILL_MS } from "@/lib/contact";
import {
  DELETE_REQUEST_TO,
  readDelete,
  validateDelete,
  type DeleteState,
} from "@/lib/delete-request";

/* ──────────────────────────────────────────────────────────
   Vidya AI account-deletion request → email (Resend HTTP API).
     RESEND_API_KEY     — required (server-side only, never in code)
     DELETE_TO_EMAIL    — inbox (default rosmoxx@gmail.com)
     DELETE_FROM_EMAIL  — sender (default onboarding@resend.dev, which
                          Resend only lets deliver to your own account
                          email; verify a domain to lift that)
   On any failure the form shows a mail-app fallback, so a request
   is never silently dropped.
   ────────────────────────────────────────────────────────── */

export async function sendDeleteRequest(
  _prev: DeleteState,
  fd: FormData,
): Promise<DeleteState> {
  const v = readDelete(fd);

  const honeypot = String(fd.get("website") ?? "");
  const startedAt = Number(fd.get("started_at") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" };
  }

  const values = { name: v.name, email: v.email, reason: v.reason };
  const errors = validateDelete(v);
  if (errors) return { status: "error", errors, values };

  const text = [
    "Vidya AI — account deletion request",
    "",
    `Name:          ${v.name}`,
    `Google email:  ${v.email}`,
    `Reason:        ${v.reason || "—"}`,
    `Received:      ${new Date().toISOString()}`,
    "",
    "Delete the account and all associated data within 30 days.",
    "Reply to this email to confirm with the user once done.",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[delete-request] RESEND_API_KEY not set — not sent:\n" + text);
      return { status: "success" };
    }
    console.error("[delete-request] RESEND_API_KEY missing in production");
    return { status: "error", message: "We couldn't send this automatically.", values };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.DELETE_FROM_EMAIL ?? "ROSMOX <onboarding@resend.dev>",
        to: [process.env.DELETE_TO_EMAIL ?? DELETE_REQUEST_TO],
        reply_to: v.email,
        subject: `Vidya AI account deletion request — ${v.email}`,
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("[delete-request] delivery failed", err);
    return { status: "error", message: "We couldn't send this automatically.", values };
  }

  return { status: "success" };
}
