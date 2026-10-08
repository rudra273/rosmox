"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";

import { sendContact } from "@/app/actions/contact";
import { IconArrowRight } from "@/components/icons";
import {
  INTEREST_OPTIONS,
  LIMITS,
  readContact,
  validateContact,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   ContactForm — React 19 form action.

   Validation runs in the browser first (instant, no round
   trip) with the same rules the server action re-checks.
   Errors are inline, announced, and focus jumps to the first
   bad field. On error React resets the form, so every field
   reads its defaultValue from the echoed `values`.
   Spam: hidden honeypot + a minimum fill time.

   `tone` matches the surface it sits on (dark | light). Field ids
   come from useId, so more than one form can share a page.
   ────────────────────────────────────────────────────────── */

type Tone = "dark" | "light";

/* every colour the form uses, per surface */
const TONES = {
  dark: {
    label: "text-white/80",
    muted: "text-white/50",
    input:
      "border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 hover:border-white/20 focus:bg-white/[0.05]",
    invalid: "border-red-400/60 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.14)]",
    fieldError: "text-red-300",
    over: "text-red-300",
    chip: "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25 hover:text-white peer-checked:border-primary/70 peer-checked:bg-primary/15 peer-checked:text-white",
    alert: "border-red-400/30 bg-red-400/[0.06] text-red-200",
    note: "text-white/55",
    noteLink: "text-white/65 hover:text-white",
    title: "text-white",
    body: "text-white/60",
    bodyLink: "text-white",
    again: "border-white/15 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.09]",
  },
  light: {
    label: "text-ink/80",
    muted: "text-ink/60",
    input:
      "border-ink/15 bg-white text-ink placeholder:text-ink/40 hover:border-ink/30 focus:bg-white",
    invalid: "border-red-600/60 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]",
    fieldError: "text-red-700",
    over: "text-red-700",
    chip: "border-ink/15 bg-white text-ink/70 hover:border-ink/30 hover:text-ink peer-checked:border-primary-ink/60 peer-checked:bg-primary/10 peer-checked:text-ink",
    alert: "border-red-600/25 bg-red-50 text-red-800",
    note: "text-ink/60",
    noteLink: "text-ink/80 hover:text-ink",
    title: "text-ink",
    body: "text-ink/65",
    bodyLink: "text-ink",
    again: "border-ink/15 bg-transparent text-ink hover:border-ink/25 hover:bg-ink/[0.04]",
  },
} satisfies Record<Tone, Record<string, string>>;

type ToneClasses = (typeof TONES)[Tone];

const INITIAL: ContactState = { status: "idle" };
const FIELD_ORDER: ContactField[] = ["name", "email", "company", "message"];

async function submit(prev: ContactState, fd: FormData): Promise<ContactState> {
  const values = readContact(fd);
  const errors = validateContact(values);
  if (errors) return { status: "error", errors, values };
  return sendContact(prev, fd);
}

export default function ContactForm({ tone = "dark" }: { tone?: Tone }) {
  const t = TONES[tone];
  const uid = useId();
  const fid = (f: string) => `${uid}-${f}`;
  const [state, formAction, pending] = useActionState(submit, INITIAL);
  const [dismissed, setDismissed] = useState<Partial<Record<ContactField, true>>>({});
  const [showForm, setShowForm] = useState(true);
  const [messageLen, setMessageLen] = useState(0);
  /* success panel keeps the form's height, so nothing below jumps */
  const [lockedHeight, setLockedHeight] = useState<number | undefined>();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0); // spam timer: when this form was shown

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const action = (fd: FormData) => {
    fd.set("started_at", String(startedAt.current));
    setLockedHeight(formRef.current?.offsetHeight);
    formAction(fd);
  };

  // New result: clear dismissed errors and swap to success (adjusted
  // during render, so the result paints in a single commit).
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    setDismissed({});
    setMessageLen(state.status === "success" ? 0 : (state.values?.message.length ?? 0));
    if (state.status === "success") setShowForm(false);
  }

  // …and move focus to the first bad field.
  useEffect(() => {
    if (!state.errors) return;
    const first = FIELD_ORDER.find((f) => state.errors?.[f]);
    const el = first && formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    if (!el) return;
    el.focus({ preventScroll: true });
    const r = el.getBoundingClientRect();
    if (r.top < 96 || r.bottom > window.innerHeight - 24)
      el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);

  const errorFor = (f: ContactField) => (dismissed[f] ? undefined : state.errors?.[f]);
  const dismiss = (f: ContactField) => () =>
    setDismissed((d) => (d[f] ? d : { ...d, [f]: true }));

  const v = state.values;

  return (
    <div className="relative" style={{ minHeight: showForm ? undefined : lockedHeight }}>
      <AnimatePresence mode="wait" initial={false}>
        {showForm ? (
          <m.form
            key="form"
            ref={formRef}
            action={action}
            noValidate
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            {/* spam trap (the fill timer is added to the form data on submit) */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field t={t} fid={fid} label="Name" name="name" error={errorFor("name")} required>
                <input
                  id={fid("name")}
                  name="name"
                  autoComplete="name"
                  maxLength={LIMITS.name}
                  defaultValue={v?.name}
                  onChange={dismiss("name")}
                  aria-invalid={!!errorFor("name")}
                  aria-describedby={errorFor("name") ? fid("name-error") : undefined}
                  className={inputClass(t, !!errorFor("name"))}
                />
              </Field>
              <Field t={t} fid={fid} label="Work email" name="email" error={errorFor("email")} required>
                <input
                  id={fid("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={LIMITS.email}
                  defaultValue={v?.email}
                  onChange={dismiss("email")}
                  aria-invalid={!!errorFor("email")}
                  aria-describedby={errorFor("email") ? fid("email-error") : undefined}
                  className={inputClass(t, !!errorFor("email"))}
                />
              </Field>
            </div>

            <Field t={t} fid={fid} label="Company" name="company" error={errorFor("company")} optional>
              <input
                id={fid("company")}
                name="company"
                autoComplete="organization"
                maxLength={LIMITS.company}
                defaultValue={v?.company}
                onChange={dismiss("company")}
                aria-invalid={!!errorFor("company")}
                aria-describedby={errorFor("company") ? fid("company-error") : undefined}
                className={inputClass(t, !!errorFor("company"))}
              />
            </Field>

            <ChipGroup t={t} legend="What can we help with?" hint="Pick any">
              {INTEREST_OPTIONS.map((opt) => (
                <Chip
                  t={t}
                  key={opt}
                  type="checkbox"
                  name="interest"
                  value={opt}
                  defaultChecked={v?.interests.includes(opt)}
                />
              ))}
            </ChipGroup>

            <Field
              t={t}
              fid={fid}
              label="Tell us about the project"
              name="message"
              error={errorFor("message")}
              required
              aside={
                <span
                  className={`font-mono text-xs tabular-nums ${
                    messageLen > LIMITS.message ? t.over : t.muted
                  }`}
                >
                  {messageLen}/{LIMITS.message}
                </span>
              }
            >
              <textarea
                id={fid("message")}
                name="message"
                rows={5}
                defaultValue={v?.message}
                onChange={(e) => {
                  setMessageLen(e.target.value.length);
                  dismiss("message")();
                }}
                placeholder="What are you building, where are you stuck, and when do you need it?"
                aria-invalid={!!errorFor("message")}
                aria-describedby={errorFor("message") ? fid("message-error") : undefined}
                className={`${inputClass(t, !!errorFor("message"))} h-auto min-h-[8.5rem] resize-y py-3 leading-relaxed`}
              />
            </Field>

            {/* form-level error */}
            <AnimatePresence>
              {state.status === "error" && state.message && (
                <m.p
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-sm border px-4 py-3 text-sm ${t.alert}`}
                >
                  {state.message}
                </m.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className={`text-[0.8125rem] ${t.note}`}>
                We only use this to reply to you —{" "}
                <Link href="/privacy" className={`link-underline ${t.noteLink}`}>
                  privacy policy
                </Link>
                .
              </p>
              <button
                type="submit"
                disabled={pending}
                className="group/btn btn-fx btn-fx-on-primary inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-[0.9375rem] font-semibold text-ink transition-[background-color,box-shadow,transform,opacity] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </m.form>
        ) : (
          <m.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
            className="flex flex-col items-start justify-center"
            style={{ minHeight: lockedHeight }}
          >
            <SuccessMark />
            <h3 className={`mt-6 font-display text-h3 font-semibold ${t.title}`}>
              Message sent.
            </h3>
            <p className={`mt-3 max-w-sm ${t.body}`}>
              Thanks — we read every message and will reply within a day. If
              it&apos;s urgent, email{" "}
              <a href={`mailto:${SITE.email}`} className={`underline-offset-4 hover:underline ${t.bodyLink}`}>
                {SITE.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                startedAt.current = Date.now();
                setLockedHeight(undefined);
                setShowForm(true);
              }}
              className={`mt-8 inline-flex h-11 items-center rounded-sm border px-5 text-sm font-semibold transition-colors duration-200 ${t.again}`}
            >
              Send another message
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── pieces ── */

function inputClass(t: ToneClasses, invalid: boolean) {
  return [
    // 16px on mobile — anything smaller makes iOS Safari zoom on focus
    "h-12 w-full rounded-sm border px-4 text-base md:text-[0.9375rem]",
    "transition-[border-color,background-color,box-shadow] duration-200 focus:outline-none",
    t.input,
    invalid
      ? t.invalid
      : "focus:border-primary/70 focus:shadow-[0_0_0_4px_rgba(77,162,255,0.14)]",
  ].join(" ");
}

function Field({
  t,
  fid,
  label,
  name,
  error,
  required,
  optional,
  aside,
  children,
}: {
  t: ToneClasses;
  fid: (f: string) => string;
  label: string;
  name: ContactField;
  error?: string;
  required?: boolean;
  optional?: boolean;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={fid(name)} className={`text-sm font-medium ${t.label}`}>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-primary">
              *
            </span>
          )}
          {optional && <span className={`ml-2 text-xs font-normal ${t.muted}`}>Optional</span>}
        </label>
        {aside}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={fid(`${name}-error`)}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            className={`mt-2 text-[0.8125rem] ${t.fieldError}`}
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChipGroup({
  t,
  legend,
  hint,
  children,
}: {
  t: ToneClasses;
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className={`mb-3 text-sm font-medium ${t.label}`}>
        {legend}
        {hint && <span className={`ml-2 text-xs font-normal ${t.muted}`}>{hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({
  t,
  type,
  name,
  value,
  defaultChecked,
}: {
  t: ToneClasses;
  type: "checkbox" | "radio";
  name: string;
  value: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="relative cursor-pointer">
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className={`inline-flex h-9 select-none items-center gap-2 rounded-sm border px-3.5 text-[0.8125rem] transition-[border-color,background-color,color] duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary active:scale-[0.98] ${t.chip}`}>
        {value}
      </span>
    </label>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SuccessMark() {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden>
      <m.circle
        cx="28"
        cy="28"
        r="26"
        fill="rgba(77,162,255,0.08)"
        stroke="#4da2ff"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      />
      <m.path
        d="M18 28.5 25 35.5 38.5 21"
        fill="none"
        stroke="#82beff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT }}
      />
    </svg>
  );
}
