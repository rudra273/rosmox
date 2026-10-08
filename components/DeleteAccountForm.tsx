"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { sendDeleteRequest } from "@/app/actions/delete-request";
import {
  buildDeleteMail,
  DELETE_LIMITS,
  readDelete,
  validateDelete,
  type DeleteState,
} from "@/lib/delete-request";

/* Vidya AI account-deletion request form — validates in the browser,
   then a server action emails the request. If delivery fails, the
   user gets Gmail / mail-app links to send it themselves. */

const INPUT =
  "w-full rounded-sm border border-white/10 bg-white/[0.03] px-4 text-base text-white placeholder:text-white/30 transition-[border-color,background-color] duration-200 hover:border-white/20 focus:border-primary/70 focus:bg-white/[0.05] focus:outline-none md:text-[0.9375rem]";

async function submit(prev: DeleteState, fd: FormData): Promise<DeleteState> {
  const v = readDelete(fd);
  const errors = validateDelete(v);
  if (errors) return { status: "error", errors, values: { name: v.name, email: v.email, reason: v.reason } };
  return sendDeleteRequest(prev, fd);
}

export default function DeleteAccountForm() {
  const uid = useId();
  const [state, formAction, pending] = useActionState(submit, { status: "idle" } as DeleteState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!state.errors) return;
    const first = (["name", "email", "confirm"] as const).find((f) => state.errors?.[f]);
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-white/10 bg-white/[0.04] p-7 md:p-12">
        <h2 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
          Request received.
        </h2>
        <p className="mt-3 max-w-xl text-white/65">
          We&apos;ve got your request. Your Vidya AI account and its data will be deleted within 30
          days, and we&apos;ll email you when it&apos;s done.
        </p>
      </div>
    );
  }

  const v = state.values;
  const err = state.errors ?? {};

  return (
    <form
      ref={formRef}
      noValidate
      action={(fd) => {
        fd.set("started_at", String(startedAt.current));
        formAction(fd);
      }}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-7 md:p-12"
    >
      <h2 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
        Request deletion
      </h2>
      <p className="mt-3 max-w-xl text-white/65">
        Use the Google account email you sign in to Vidya AI with.
      </p>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium text-white/80">
              Name
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              autoComplete="name"
              maxLength={DELETE_LIMITS.name}
              defaultValue={v?.name}
              aria-invalid={!!err.name}
              className={`${INPUT} h-12`}
            />
            {err.name && <p role="alert" className="mt-2 text-[0.8125rem] text-red-300">{err.name}</p>}
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium text-white/80">
              Google account email
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={DELETE_LIMITS.email}
              defaultValue={v?.email}
              aria-invalid={!!err.email}
              className={`${INPUT} h-12`}
            />
            {err.email && <p role="alert" className="mt-2 text-[0.8125rem] text-red-300">{err.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-reason`} className="mb-2 block text-sm font-medium text-white/80">
            Reason <span className="ml-2 text-xs font-normal text-white/50">Optional</span>
          </label>
          <textarea
            id={`${uid}-reason`}
            name="reason"
            rows={3}
            maxLength={DELETE_LIMITS.reason}
            defaultValue={v?.reason}
            className={`${INPUT} min-h-[6rem] resize-y py-3 leading-relaxed`}
          />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              name="confirm"
              aria-invalid={!!err.confirm}
              className="mt-1 h-4 w-4 accent-[#4da2ff]"
            />
            <span>
              I understand that my Vidya AI account and all its data will be permanently deleted.
            </span>
          </label>
          {err.confirm && <p role="alert" className="mt-2 text-[0.8125rem] text-red-300">{err.confirm}</p>}
        </div>

        {state.status === "error" && state.message && (
          <div role="alert" className="rounded-sm border border-red-400/30 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">
            <p>{state.message} Please send it from your own email instead:</p>
            <p className="mt-2 flex flex-wrap gap-4">
              <a
                className="underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
                href={buildDeleteMail(state.values ?? { name: "", email: "", reason: "" }).gmail}
              >
                Open in Gmail
              </a>
              <a
                className="underline underline-offset-4"
                href={buildDeleteMail(state.values ?? { name: "", email: "", reason: "" }).mailto}
              >
                Open email app
              </a>
            </p>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={pending}
            className="btn-fx btn-fx-on-primary inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-[0.9375rem] font-semibold text-ink transition-[background-color,box-shadow,transform,opacity] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
          >
            {pending ? "Sending…" : "Submit deletion request"}
          </button>
        </div>
      </div>
    </form>
  );
}
