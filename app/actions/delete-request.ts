"use server";

import { MIN_FILL_MS } from "@/lib/contact";
import {
  DELETE_REQUEST_TO,
  readDelete,
  validateDelete,
  type DeleteState,
} from "@/lib/delete-request";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Vidyakalp account-deletion request → email (Brevo HTTP API).
     BREVO_API_KEY      — required (server-side only, never in code)
     DELETE_TO_EMAIL    — inbox (default admin@rosmox.com)
     DELETE_FROM_EMAIL  — verified Brevo sender (default business@rosmox.com)
   On any failure the form shows a mail-app fallback, so a request
   is never silently dropped.
   ────────────────────────────────────────────────────────── */

function parseSender(raw: string, fallbackName: string): { name: string; email: string } {
  const match = raw.match(/^(.*)<([^>]+)>$/);
  if (match) {
    return { name: match[1].trim().replace(/^"|"$/g, "") || fallbackName, email: match[2].trim() };
  }
  return { name: fallbackName, email: raw.trim() };
}

function parseEmailList(raw: string | undefined, exclude: string): { email: string }[] {
  if (!raw) return [];
  const lowerExclude = exclude.toLowerCase();
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e && e.toLowerCase() !== lowerExclude)
    .map((email) => ({ email }));
}

export async function sendDeleteRequest(
  _prev: DeleteState,
  fd: FormData,
): Promise<DeleteState> {
  const v = readDelete(fd);

  const honeypot = String(fd.get("_gotcha") ?? "");
  const startedAt = Number(fd.get("started_at") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    console.warn("[delete-request] dropped by spam filter", {
      honeypot: Boolean(honeypot),
      elapsedMs: startedAt ? Date.now() - startedAt : null,
    });
    return { status: "success" };
  }

  const values = { name: v.name, email: v.email, reason: v.reason };
  const errors = validateDelete(v);
  if (errors) return { status: "error", errors, values };

  const text = [
    "Vidyakalp — account deletion request",
    "",
    `Name:          ${v.name}`,
    `Google email:  ${v.email}`,
    `Reason:        ${v.reason || "—"}`,
    `Received:      ${new Date().toISOString()}`,
    "",
    "Delete the account and all associated data within 30 days.",
    "Reply to this email to confirm with the user once done.",
  ].join("\n");

  const key = process.env.BREVO_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[delete-request] BREVO_API_KEY not set — not sent:\n" + text);
      return { status: "success" };
    }
    console.error("[delete-request] BREVO_API_KEY missing in production");
    return { status: "error", message: "We couldn't send this automatically.", values };
  }

  const sender = parseSender(
    process.env.DELETE_FROM_EMAIL ??
      process.env.CONTACT_FROM_EMAIL ??
      SITE.email,
    "ROSMOX Website",
  );
  const toEmail = process.env.DELETE_TO_EMAIL ?? DELETE_REQUEST_TO;
  const cc = parseEmailList(process.env.DELETE_CC_EMAIL, toEmail);

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": key,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender,
        to: [{ email: toEmail }],
        ...(cc.length > 0 && { cc }),
        replyTo: { name: v.name, email: v.email },
        subject: `Vidyakalp account deletion request — ${v.email}`,
        textContent: text,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
    console.info("[delete-request] delivered via Brevo", {
      to: toEmail,
      cc: cc.map((c) => c.email),
    });
  } catch (err) {
    console.error("[delete-request] delivery failed", err);
    return { status: "error", message: "We couldn't send this automatically.", values };
  }

  return { status: "success" };
}
