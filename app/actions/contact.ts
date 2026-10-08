"use server";

import {
  MIN_FILL_MS,
  readContact,
  validateContact,
  type ContactState,
} from "@/lib/contact";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Contact form server action.

   Delivery: Resend's HTTP API (no SDK dependency).
     RESEND_API_KEY      — required in production
     CONTACT_TO_EMAIL    — inbox for enquiries (default SITE.email)
     CONTACT_FROM_EMAIL  — verified sender, e.g.
                           "ROSMOX Website <website@rosmox.com>"

   Without a key: development logs the enquiry and succeeds so
   the form can be tested; production FAILS LOUDLY and points
   the visitor to email — a lead is never silently dropped.
   ────────────────────────────────────────────────────────── */

export async function sendContact(
  _prev: ContactState,
  fd: FormData,
): Promise<ContactState> {
  const values = readContact(fd);

  // Bots: filled the hidden field, or submitted inhumanly fast.
  const honeypot = String(fd.get("website") ?? "");
  const startedAt = Number(fd.get("started_at") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" }; // look successful, deliver nothing
  }

  const errors = validateContact(values);
  if (errors) return { status: "error", errors, values };

  const text = [
    `Name:      ${values.name}`,
    `Email:     ${values.email}`,
    `Company:   ${values.company || "—"}`,
    `Interest:  ${values.interests.join(", ") || "—"}`,
    "",
    values.message,
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — enquiry not sent:\n" + text);
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY missing in production");
    return {
      status: "error",
      message: `Our form is unavailable right now — please email ${SITE.email} instead.`,
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? `ROSMOX Website <${SITE.email}>`,
        to: [process.env.CONTACT_TO_EMAIL ?? SITE.email],
        reply_to: values.email,
        subject: `New enquiry — ${values.name}${values.company ? ` (${values.company})` : ""}`,
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return {
      status: "error",
      message: `Something went wrong sending that. Please try again, or email ${SITE.email}.`,
      values,
    };
  }

  return { status: "success" };
}
