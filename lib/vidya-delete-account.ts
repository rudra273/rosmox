/* ──────────────────────────────────────────────────────────
   Vidya AI account-deletion content.

   Rendered at /products/vidyakalp/delete-account — the public
   URL given to Google Play's Data safety form. The route slug
   stays "vidyakalp" (the app is named Vidya AI for now).
   ────────────────────────────────────────────────────────── */

import { SITE } from "@/lib/site";
import type { PrivacyPolicyContent } from "@/lib/policy";

export const VIDYA_DELETE_ACCOUNT: PrivacyPolicyContent = {
  product: "Vidya AI",
  heading: "Delete your Vidya AI account",
  label: "DELETE ACCOUNT",
  effectiveDate: "October 9, 2026",
  intro: "How to delete your Vidya AI account and the data linked to it.",
  sections: [
    {
      title: "Request account deletion",
      body: [
        "Vidya AI uses Google sign-in. To delete your account, fill in the form at the bottom of this page with the Google account email you sign in with, and submit it.",
        `If the form doesn't work for you, email ${SITE.email} from that Google account instead. We may reply to confirm the request is from you before we delete anything.`,
      ],
    },
    {
      title: "What gets deleted",
      body: [
        "Your account and all data associated with it are deleted. This includes the profile details from your Google sign-in, your study preferences, and the learning activity stored against your account.",
        "Deletion is permanent. Once it is complete, the account and its data cannot be restored.",
      ],
    },
    {
      title: "How long it takes",
      body: [
        "We delete your account and its data within 30 days of receiving your request. We will confirm by email when it is done.",
      ],
    },
    {
      title: "Questions",
      body: [`If you have any questions about deletion or your data, write to ${SITE.email}.`],
    },
  ],
};
