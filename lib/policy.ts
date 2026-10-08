/* Shared shape for every privacy policy the site hosts — the
   company policy (/privacy) and per-product app policies
   (/products/[slug]/privacy-policy). Rendered by
   components/PrivacyPolicy.tsx. */

export type PolicySection = {
  title: string;
  body: string[];
};

export type PrivacyPolicyContent = {
  /** whose policy this is, e.g. "DayKit" or "ROSMOX" */
  product: string;
  /** page title override; defaults to "<product> Privacy Policy" */
  heading?: string;
  /** breadcrumb label override; defaults to "PRIVACY" */
  label?: string;
  effectiveDate: string;
  intro: string;
  sections: PolicySection[];
};
