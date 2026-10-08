/* ──────────────────────────────────────────────────────────
   Contact form — shared field options + validation.
   Imported by the client form (instant feedback) and the
   server action (the real gate), so the rules can't drift.
   ────────────────────────────────────────────────────────── */

export const INTEREST_OPTIONS = [
  "AI product",
  "Web app",
  "Mobile app",
  "UX / design",
  "Not sure yet",
] as const;

export const LIMITS = {
  name: 80,
  email: 120,
  company: 120,
  message: 2000,
  messageMin: 20,
} as const;

/** Submissions faster than this after render are treated as bots */
export const MIN_FILL_MS = 2500;

export type ContactField = "name" | "email" | "company" | "message";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  interests: string[];
};

export type ContactState = {
  status: "idle" | "success" | "error";
  /** field-level problems */
  errors?: Partial<Record<ContactField, string>>;
  /** form-level problem (network, provider, rate) */
  message?: string;
  /** echoed back so the form keeps what was typed after an error */
  values?: ContactValues;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readContact(fd: FormData): ContactValues {
  const str = (k: string) => String(fd.get(k) ?? "").trim();
  return {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    message: str("message"),
    interests: fd
      .getAll("interest")
      .map(String)
      .filter((v) => (INTEREST_OPTIONS as readonly string[]).includes(v)),
  };
}

export function validateContact(v: ContactValues) {
  const errors: Partial<Record<ContactField, string>> = {};

  if (!v.name) errors.name = "Tell us who we're talking to.";
  else if (v.name.length > LIMITS.name) errors.name = "That name is a bit long.";

  if (!v.email) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(v.email) || v.email.length > LIMITS.email)
    errors.email = "That email doesn't look right.";

  if (v.company.length > LIMITS.company) errors.company = "That's a bit long.";

  if (v.message.length < LIMITS.messageMin)
    errors.message = `A couple of sentences helps — at least ${LIMITS.messageMin} characters.`;
  else if (v.message.length > LIMITS.message)
    errors.message = `Please keep it under ${LIMITS.message} characters.`;

  return Object.keys(errors).length ? errors : null;
}
