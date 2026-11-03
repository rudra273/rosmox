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

   Delivery: Brevo's Transactional Email HTTP API (no SDK dependency).
     BREVO_API_KEY       — required in production
     CONTACT_TO_EMAIL    — inbox for enquiries (default SITE.email: business@rosmox.com)
     CONTACT_CC_EMAIL    — optional CC inbox(es), comma-separated (e.g. admin@rosmox.com,success@rosmox.com)
     CONTACT_FROM_EMAIL  — verified Brevo sender email (default business@rosmox.com)

   Without a key: development logs the enquiry and succeeds so
   the form can be tested; production FAILS LOUDLY and points
   the visitor to email — a lead is never silently dropped.
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

export async function sendContact(
  _prev: ContactState,
  fd: FormData,
): Promise<ContactState> {
  const values = readContact(fd);

  // Bots: filled the hidden field, or submitted inhumanly fast.
  const honeypot = String(fd.get("_gotcha") ?? "");
  const startedAt = Number(fd.get("started_at") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    console.warn("[contact] dropped by spam filter", {
      honeypot: Boolean(honeypot),
      elapsedMs: startedAt ? Date.now() - startedAt : null,
    });
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

  const key = process.env.BREVO_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] BREVO_API_KEY not set — enquiry not sent:\n" + text);
      return { status: "success" };
    }
    console.error("[contact] BREVO_API_KEY missing in production");
    return {
      status: "error",
      message: `Our form is unavailable right now — please email ${SITE.email} instead.`,
      values,
    };
  }

  const sender = parseSender(
    process.env.CONTACT_FROM_EMAIL ?? SITE.email,
    "ROSMOX Website",
  );
  const toEmail = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const cc = parseEmailList(process.env.CONTACT_CC_EMAIL, toEmail);

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
        replyTo: { name: values.name, email: values.email },
        subject: `New enquiry — ${values.name}${values.company ? ` (${values.company})` : ""}`,
        textContent: text,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
    console.info("[contact] delivered via Brevo", {
      to: toEmail,
      cc: cc.map((c) => c.email),
    });
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
