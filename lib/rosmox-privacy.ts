import type { PrivacyPolicyContent } from "@/lib/policy";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   ROSMOX company privacy policy — rendered at /privacy.

   DRAFT: written to match what this website actually does
   (contact form → email via Resend, cookieless Vercel Web
   Analytics + Speed Insights, hosting logs). Have it reviewed
   by a lawyer before launch, and update it whenever the site
   starts collecting anything new.

   Product apps (e.g. DayKit) keep their own policies.
   ────────────────────────────────────────────────────────── */

export const ROSMOX_PRIVACY: PrivacyPolicyContent = {
  product: "ROSMOX",
  effectiveDate: "October 2, 2026",
  intro:
    "This policy explains what information the ROSMOX website collects, why, and the choices you have. It covers this website and the enquiries you send us — our apps, such as DayKit, have their own policies.",
  sections: [
    {
      title: "Who we are",
      body: [
        `ROSMOX designs and builds AI products, web and mobile software. When this policy says "we", "us" or "our", it means ROSMOX. You can reach us about anything in this policy at ${SITE.email}.`,
      ],
    },
    {
      title: "What we collect",
      body: [
        "Information you give us: when you use our contact form we receive your name, email address and message, plus anything optional you choose to add — your company and the kind of help you need. If you email us directly, we receive whatever you include.",
        "Technical information: like every website, our hosting provider records basic request data — such as IP address, browser type, the page requested and the time — to keep the site secure and working.",
        "Usage and performance data: we use Vercel Web Analytics and Speed Insights to understand, in aggregate, which pages are visited and how fast they load. They don't use cookies and don't identify you personally.",
      ],
    },
    {
      title: "How we use it",
      body: [
        "To reply to your enquiry, understand your project, prepare proposals and keep a record of our conversation.",
        "To keep the site secure — for example, filtering automated spam from the contact form.",
        "To improve the site, using aggregated analytics only.",
        "We don't sell your information, we don't use it for advertising, and we won't add you to a mailing list unless you ask us to.",
      ],
    },
    {
      title: "Legal basis",
      body: [
        "Where laws such as the GDPR apply, we process enquiry data because you asked us to respond (steps before entering into a contract) and because we have a legitimate interest in running and securing our business. Where consent is required, we'll ask for it, and you can withdraw it at any time.",
      ],
    },
    {
      title: "Who we share it with",
      body: [
        "We use a small number of service providers who process data on our behalf, under contract and only to provide their service: Vercel (website hosting, analytics and performance monitoring) and Resend (delivering contact-form messages to our inbox).",
        "We may also disclose information if the law requires it, or to protect our rights and the safety of others.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "This website doesn't use advertising or tracking cookies, and our analytics are cookieless. If that ever changes, we'll update this policy and ask for consent where the law requires it.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "We keep enquiries for as long as we need them to respond and to maintain our business records, and then delete them. You can ask us to delete your enquiry at any time.",
      ],
    },
    {
      title: "Where it's processed",
      body: [
        "Our service providers may store and process data outside your country, including in the United States. Where that happens, we rely on the safeguards those providers offer for international transfers.",
      ],
    },
    {
      title: "Your rights",
      body: [
        `Depending on where you live — including under India's Digital Personal Data Protection Act and the GDPR — you can ask to access, correct or delete the personal information we hold about you, or object to how we use it. Email ${SITE.email} and we'll respond as quickly as we can, and within the time the law requires.`,
      ],
    },
    {
      title: "Security",
      body: [
        "The site is served only over HTTPS, and access to enquiries is limited to the people who need it to reply. No system is perfectly secure, but we take reasonable steps to protect what you share with us.",
      ],
    },
    {
      title: "Children",
      body: [
        "This website isn't directed at children, and we don't knowingly collect personal information from anyone under 18.",
      ],
    },
    {
      title: "Changes to this policy",
      body: [
        "If we change how we handle personal information, we'll update this page and the effective date above.",
      ],
    },
  ],
};
