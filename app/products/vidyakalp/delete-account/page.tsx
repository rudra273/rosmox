import type { Metadata } from "next";

import DeleteAccountForm from "@/components/DeleteAccountForm";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { VIDYA_DELETE_ACCOUNT } from "@/lib/vidya-delete-account";

/* Vidyakalp account deletion — /products/vidyakalp/delete-account
   Linked from the Google Play Data safety form. */

export const metadata: Metadata = {
  title: "Delete your Vidyakalp account",
  description:
    "How to request deletion of your Vidyakalp account and data. Requests are completed within 30 days.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/products/vidyakalp/delete-account" },
};

export default function VidyaDeleteAccountPage() {
  return <PrivacyPolicy content={VIDYA_DELETE_ACCOUNT} productSlug="vidyakalp">
      <DeleteAccountForm />
    </PrivacyPolicy>;
}
