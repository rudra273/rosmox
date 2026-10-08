/* ──────────────────────────────────────────────────────────
   Site-wide config — navigation, CTA, contact, social.
   Navbar, Footer, metadata and the sitemap all read from here.

   All in-page links are root-relative ("/#work", not "#work")
   so they keep working from /products/* and other routes.
   ────────────────────────────────────────────────────────── */

export const SITE = {
  name: "ROSMOX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rosmox.com",
  email: "hello@rosmox.com",
  title: "ROSMOX — AI products, web and mobile engineering",
  description:
    "ROSMOX partners with teams to turn ambitious ideas into AI products running in production — plus the web, mobile and UX work around them.",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "/#products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

/* One verb for the primary action, everywhere on the site */
export const PRIMARY_CTA: NavLink = {
  label: "Discuss your project",
  href: "/contact",
};

/* Navbar's right island — a quieter nav-style link to the same place */
export const NAV_CTA: NavLink = {
  label: "Let's talk",
  href: "/contact",
};

/* Real profile URLs only — the footer hides the Social column while this is empty.
   e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/rosmox" } */
export const SOCIAL_LINKS: NavLink[] = [];
