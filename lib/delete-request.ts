/* ──────────────────────────────────────────────────────────
   Vidya AI account-deletion request — shared validation.
   Used by the client form and re-checked in the server action.
   ────────────────────────────────────────────────────────── */

export const DELETE_LIMITS = { name: 80, email: 120, reason: 500 } as const;

export type DeleteField = "name" | "email" | "confirm";

export type DeleteValues = { name: string; email: string; reason: string };

export type DeleteState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<DeleteField, string>>;
  message?: string;
  values?: DeleteValues;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readDelete(fd: FormData): DeleteValues & { confirm: boolean } {
  const str = (k: string) => String(fd.get(k) ?? "").trim();
  return {
    name: str("name"),
    email: str("email"),
    reason: str("reason").slice(0, DELETE_LIMITS.reason),
    confirm: fd.get("confirm") === "on",
  };
}

export function validateDelete(v: ReturnType<typeof readDelete>) {
  const errors: Partial<Record<DeleteField, string>> = {};
  if (!v.name) errors.name = "Please enter your name.";
  else if (v.name.length > DELETE_LIMITS.name) errors.name = "That name is a bit long.";
  if (!v.email) errors.email = "Enter the Google account email you use in Vidya AI.";
  else if (!EMAIL_RE.test(v.email) || v.email.length > DELETE_LIMITS.email)
    errors.email = "That email doesn't look right.";
  if (!v.confirm) errors.confirm = "Please confirm you want your account deleted.";
  return Object.keys(errors).length ? errors : null;
}

/** Inbox that receives deletion requests (composed in the user's own mail app) */
export const DELETE_REQUEST_TO = "rosmoxx@gmail.com";

export function buildDeleteMail(v: { name: string; email: string; reason: string }) {
  const subject = `Vidya AI account deletion request — ${v.email}`;
  const body = [
    "Please delete my Vidya AI account and all associated data.",
    "",
    `Name: ${v.name}`,
    `Google account email: ${v.email}`,
    `Reason: ${v.reason || "—"}`,
  ].join("\n");
  const q = (s: string) => encodeURIComponent(s);
  return {
    mailto: `mailto:${DELETE_REQUEST_TO}?subject=${q(subject)}&body=${q(body)}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(DELETE_REQUEST_TO)}&su=${q(subject)}&body=${q(body)}`,
  };
}
