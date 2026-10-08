import type { StaticImageData } from "next/image";

import emkShot from "@/public/work/emk.webp";
import rajBhavanShot from "@/public/work/raj-bhavan.webp";
import vaibhavaShot from "@/public/work/vaibhava.webp";

/* ──────────────────────────────────────────────────────────
   Client work — single source for the Work section.

   Copy is written from the live sites (Oct 2026). Array order is
   display order — Raj Bhavan leads. Screenshots
   are 2400px WebP (sharp, q82) and statically imported, so
   next/image gets real dimensions + a blur placeholder.

   To add a project: drop a ~2400px-wide homepage shot in
   /public/work/, import it here and append an entry. Only
   `status: "live"` entries are shown.

   Client contact details stay OUT of this file — it ships to
   the browser.
   ────────────────────────────────────────────────────────── */

export type WorkProject = {
  slug: string;
  client: string;
  location: string;
  /** mono label: sector · what we made */
  category: string;
  /** our headline about the work */
  title: string;
  desc: string;
  /** what we built — 3–4 short items */
  highlights: string[];
  /** mono label */
  stack: string;
  url: string;
  /** what the browser-frame address bar shows. An alias until the
      client's own domain is live — `url` is still where links go. */
  displayHost?: string;
  image: StaticImageData;
  /** brand colour pulled from the client site, tuned for ink */
  accent: string;
  status: "live" | "hidden";
  /** short client quote on the work card. DEMO copy until the client
      signs off — `approved: false` quotes are hidden on production
      deploys (VERCEL_ENV=production), shown everywhere else. */
  testimonial?: { quote: string; by: string; approved: boolean };
};

const ALL: WorkProject[] = [
  {
    slug: "raj-bhavan-construction",
    client: "Raj Bhavan Construction",
    location: "Chatrapur & Berhampur, Odisha",
    category: "CONSTRUCTION · WEBSITE + ADMIN",
    title: "A builder's whole business, on one site.",
    desc: "Multi-page site for an Odisha builder established in 2005 — project portfolio, city-priced construction packages compared across 20 categories, a hardware-shop catalogue and WhatsApp enquiries, run from a private admin workspace with local SEO built in.",
    highlights: [
      "City-priced package comparison",
      "Projects with detail pages",
      "Hardware shop catalogue",
      "Admin workspace + local SEO",
    ],
    stack: "NEXT.JS · ADMIN CMS",
    url: "https://raj-bhavan.vercel.app/",
    displayHost: "rajbhavanconstruction.com",
    image: rajBhavanShot,
    accent: "#f2924f",
    status: "live",
    testimonial: {
      quote: "Customers compare our packages before they even call us. Updating projects and prices takes us minutes now, not a developer.",
      by: "Raj Bhavan Construction",
      approved: false,
    },
  },
  {
    slug: "vaibhava-weddings",
    client: "Vaibhava Weddings",
    location: "Bangalore",
    category: "WEDDING PLANNER · BRAND WEBSITE",
    title: "A wedding brand that feels like the day itself.",
    desc: "Brand website for Bangalore wedding curators — a hand-illustrated marigold hero, 35+ services organised into six pillars, a four-step planning journey and couple stories that lead straight into an enquiry.",
    highlights: [
      "Illustrated, animated hero",
      "35+ services in six pillars",
      "Couple stories & video reels",
      "Enquiry form by event type",
    ],
    stack: "NEXT.JS · VERCEL",
    url: "https://vaibhava-alpha.vercel.app/",
    displayHost: "vaibhavaweddings.com",
    image: vaibhavaShot,
    accent: "#e8a093",
    status: "live",
    testimonial: {
      quote: "The site finally feels like our weddings — warm, detailed and personal. Couples reach the first call already knowing what they want.",
      by: "Vaibhava Weddings",
      approved: false,
    },
  },
  {
    slug: "emk-production",
    client: "EMK Production",
    location: "India",
    category: "EVENT PHOTOGRAPHY · PORTFOLIO",
    title: "A portfolio you look at through a lens.",
    desc: "Cinematic portfolio for an India-based event photography studio — a real-time 3D camera-lens hero, photos and films sorted by occasion, the kit on show, and clear package tiers that turn browsing into bookings.",
    highlights: [
      "Real-time 3D lens hero (three.js)",
      "Photos & films by occasion",
      "Gear showcase",
      "Package tiers with booking CTAs",
    ],
    stack: "NEXT.JS · THREE.JS",
    url: "https://emk-zeta.vercel.app/",
    displayHost: "emkproduction.com",
    image: emkShot,
    accent: "#3ddc97",
    status: "live",
    testimonial: {
      quote: "The lens hero stops people mid-scroll. Clients pick a package straight from the site, so every booking starts with the details sorted.",
      by: "EMK Production",
      approved: false,
    },
  },
];

/** Live projects, numbered in display order ("01", "02", …) */
const SHOW_DRAFT_QUOTES = process.env.VERCEL_ENV !== "production";

export const WORK = ALL.filter((p) => p.status === "live").map((p, i) => ({
  ...p,
  testimonial: p.testimonial?.approved || SHOW_DRAFT_QUOTES ? p.testimonial : undefined,
  n: String(i + 1).padStart(2, "0"),
}));

export type WorkItem = (typeof WORK)[number];

/** the browser-frame address bar: the alias if set, else the real host */
export const hostOf = (p: { url: string; displayHost?: string }) =>
  p.displayHost ?? new URL(p.url).host;
