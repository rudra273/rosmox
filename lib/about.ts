/* ──────────────────────────────────────────────────────────
   About content — the homepage About blocks (components/About.tsx)
   and the /about page (components/AboutPage.tsx) both read this.

   Each homepage block links to its section on /about via `slug`
   (/about#<slug>). The data block links to /privacy for specifics.
   ────────────────────────────────────────────────────────── */

export type PrincipleSlug = "quality" | "data-care" | "clarity" | "support";

export type Principle = {
  slug: PrincipleSlug;
  n: string;
  title: string;
  /** homepage block — one or two sentences */
  desc: string;
  /* ── /about detail ── */
  lead: string;
  body: string;
  points: string[];
  link?: { label: string; href: string };
};

export const PRINCIPLES: Principle[] = [
  {
    slug: "quality",
    n: "01",
    title: "Quality in every detail",
    desc: "We test, review, and refine our work against agreed goals, paying attention to the details that make it reliable and useful in everyday use.",
    lead: "Good work earns confidence through everyday use.",
    body: "Quality starts with a shared understanding of what the work needs to achieve. We review progress against those goals, test how things behave in practice, and refine the details before handover. Your feedback helps us check that the result fits the way your business works.",
    points: [
      "Clear goals and acceptance criteria",
      "Testing that reflects real use",
      "Reviews throughout the project",
      "Feedback addressed before handover",
    ],
  },
  {
    slug: "data-care",
    n: "02",
    title: "Your data, handled with care",
    desc: "We agree how your information is used, where it is shared, and who can access it, with safeguards suited to the needs of your project.",
    lead: "You should understand where your information goes and how it is used.",
    body: "We agree how project information will be accessed, shared, and handled. When external platforms or AI tools are involved, those choices form part of the conversation. The approach reflects the sensitivity of your information and the requirements of your project.",
    points: [
      "Agreed use of project information",
      "Access limited to the people who need it",
      "Clarity on external tools and data sharing",
      "Safeguards suited to your project",
    ],
    link: { label: "Website privacy policy", href: "/privacy" },
  },
  {
    slug: "clarity",
    n: "03",
    title: "Clarity from the start",
    desc: "Clear scope, costs, and ownership set the foundation. We keep you informed throughout, with a clear handover at completion.",
    lead: "You should know what to expect and what you’ll own.",
    body: "We establish the scope, costs, responsibilities, and ownership before work begins. As the project develops, we keep you informed and discuss how proposed changes affect the plan. Handover covers the agreed files, access, and documentation, so you know what you’re receiving and how to use it.",
    points: [
      "Agreed scope, costs, and responsibilities",
      "Clear updates on progress and decisions",
      "Changes discussed before proceeding",
      "Defined ownership and handover",
    ],
  },
  {
    slug: "support",
    n: "04",
    title: "Support beyond delivery",
    desc: "Our support continues beyond delivery. We help resolve issues, maintain your solution, and plan improvements around your business needs.",
    lead: "A clear plan for what comes next.",
    body: "Support is agreed around your solution and the needs of your business. That may include resolving issues, ongoing maintenance, or planning improvements. We clarify what is covered and how to get help, giving you a practical way to keep the work useful as your needs evolve.",
    points: [
      "Support arrangements agreed with you",
      "A clear route for reporting issues",
      "Maintenance suited to your solution",
      "Improvements planned around your priorities",
    ],
  },
];

/* Real people only. `bio` is optional — add one in their own words. */
export type TeamMember = { name: string; role: string; bio?: string };

export const TEAM: TeamMember[] = [
  { name: "Mahesh", role: "Co-founder" },
  { name: "Rudra", role: "Co-founder" },
];
