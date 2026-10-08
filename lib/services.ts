/* ──────────────────────────────────────────────────────────
   Shared services data — the single source for the navbar
   mega-menu, the Services timeline, the footer, the sitemap and
   the /services/[slug] detail pages.

   Each detail page has its own process and secondary action.
   Proof links only point at real things: client sites in
   lib/work.ts, products in lib/products.ts.
   ────────────────────────────────────────────────────────── */

export type ServiceSlug =
  | "artificial-intelligence"
  | "product-platform-development"
  | "software-testing-qa"
  | "seo-ai-search";

export type Service = {
  slug: ServiceSlug;
  n: string;
  title: string;
  /** one line: timeline card, detail hero lead, meta description */
  desc: string;
  /** mono label under the detail-page illustration */
  tag: string;
  href: string;

  /* ── detail page ── */
  /** "How we can help" heading */
  headline: string;
  secondaryCta: { label: string; href: string };
  process: {
    headline: string;
    steps: { title: string; desc: string }[];
  };
  /** the sub-services — also listed in the navbar menu */
  deliverables: { title: string; desc: string }[];
  stack: string[];
  /** lib/work.ts slugs shown as proof */
  work: string[];
  /** lib/products.ts slugs shown as proof */
  products: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "artificial-intelligence",
    n: "01",
    title: "Artificial Intelligence",
    desc: "Build intelligent systems that turn your data and workflows into useful tools.",
    tag: "AGENTS · AUTOMATION · INTEGRATION · ML",
    href: "/services/artificial-intelligence",
    headline: "AI built around how your business works.",
    secondaryCta: { label: "Explore our AI products", href: "/services/artificial-intelligence#related-products" },
    process: {
      headline: "From understanding the task to AI in use.",
      steps: [
        {
          title: "Understand",
          desc: "We explore your workflows, data, and goals to identify where AI can help and how to measure its value.",
        },
        {
          title: "Design",
          desc: "We plan the approach, integrations, and human review points, with clear criteria for evaluating the solution.",
        },
        {
          title: "Build & evaluate",
          desc: "We develop in stages and evaluate the results against realistic examples, refining the solution with your feedback.",
        },
        {
          title: "Deploy & improve",
          desc: "We introduce the solution into your workflow and agree how performance, costs, and ongoing improvements will be managed.",
        },
      ],
    },
    deliverables: [
      {
        title: "AI Agents & Assistants",
        desc: "Assistants and agents built around your workflows — they answer questions and take actions in your tools.",
      },
      {
        title: "AI Workflow Automation",
        desc: "Automate repetitive tasks such as document processing, request routing, and record updates, with human review at agreed steps.",
      },
      {
        title: "AI Integration",
        desc: "AI features added to the software you already run, connected through APIs and your existing data.",
      },
      {
        title: "Machine Learning Solutions",
        desc: "Machine learning tailored to your data and goals, supporting prediction, classification, and recommendations.",
      },
    ],
    stack: ["LLM APIs & open models", "Vector search", "Python", "TypeScript", "AI evaluation", "Monitoring"],
    work: [],
    products: ["breaksmith", "orbit-ai"],
  },
  {
    slug: "product-platform-development",
    n: "02",
    title: "Product & Platform Development",
    desc: "Design and build digital products, from customer experiences to business systems.",
    tag: "MOBILE · WEB · UI/UX · ERP & CRM",
    href: "/services/product-platform-development",
    headline: "From the experience your customers see to the systems your business runs on.",
    secondaryCta: { label: "See our work", href: "/services/product-platform-development#selected-work" },
    process: {
      headline: "From the first conversation to launch and beyond.",
      steps: [
        {
          title: "Discover",
          desc: "We understand your users, business needs, and existing systems, then agree the scope, priorities, and goals.",
        },
        {
          title: "Design",
          desc: "We map the experience and create designs or prototypes so you can review the direction before development begins.",
        },
        {
          title: "Develop & test",
          desc: "We build in stages, share progress, and test the work against agreed requirements and the ways people will use it.",
        },
        {
          title: "Launch & support",
          desc: "We prepare for release, complete the agreed handover, and arrange support and maintenance around your needs.",
        },
      ],
    },
    deliverables: [
      {
        title: "Mobile App Development",
        desc: "iOS and Android apps designed for intuitive use, from early prototypes to release and ongoing improvements.",
      },
      {
        title: "Web Development",
        desc: "Websites, applications, and dashboards designed for fast performance, responsive layouts, and straightforward updates.",
      },
      {
        title: "UI/UX Design",
        desc: "Research-led flows, interfaces and design systems that make complex software feel simple.",
      },
      {
        title: "ERP & CRM Development",
        desc: "Systems for operations, inventory, sales, and customer relationships, shaped around how your business runs.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Kotlin", "Android", "iOS", "Figma"],
    work: ["raj-bhavan-construction", "vaibhava-weddings", "emk-production"],
    products: [],
  },
  {
    slug: "software-testing-qa",
    n: "03",
    title: "Software Testing & QA",
    desc: "Improve software reliability with thorough testing and AI-powered automation.",
    tag: "FUNCTIONAL · AUTOMATION · API · PERFORMANCE",
    href: "/services/software-testing-qa",
    headline: "Greater confidence in every release.",
    secondaryCta: { label: "Explore our testing agent", href: "/services/software-testing-qa#related-products" },
    process: {
      headline: "From defining coverage to verifying fixes.",
      steps: [
        {
          title: "Define coverage",
          desc: "We review your software, critical user journeys, and release priorities to agree what needs testing and where the risks are.",
        },
        {
          title: "Plan testing",
          desc: "We define test cases, environments, and data, choosing manual and automated approaches to suit the agreed coverage.",
        },
        {
          title: "Test & report",
          desc: "We run the agreed checks and document findings with evidence, reproduction steps, and priorities for your team.",
        },
        {
          title: "Verify fixes",
          desc: "We retest resolved issues, check for regressions, and report remaining risks to help your team make release decisions.",
        },
      ],
    },
    deliverables: [
      {
        title: "Functional & Regression Testing",
        desc: "Test agreed features and critical user journeys, then repeat key checks to identify regressions as your software changes.",
      },
      {
        title: "AI-Powered Test Automation",
        desc: "Use AI to assist test creation, maintenance, and exploratory testing as your product evolves.",
      },
      {
        title: "API & Integration Testing",
        desc: "Your APIs and the connections between services tested for correct responses, errors and edge cases.",
      },
      {
        title: "Performance & Load Testing",
        desc: "Assess performance under expected and peak loads to identify bottlenecks and prioritise improvements.",
      },
    ],
    stack: [],
    work: [],
    products: ["breaksmith"],
  },
  {
    slug: "seo-ai-search",
    n: "04",
    title: "SEO & AI Search Visibility",
    desc: "Improve how your business is discovered across search engines and AI-generated answers.",
    tag: "TECHNICAL · CONTENT · AI SEARCH · REPORTS",
    href: "/services/seo-ai-search",
    headline: "Help your business get discovered.",
    secondaryCta: { label: "Explore our approach", href: "/services/seo-ai-search#how-we-work" },
    process: {
      headline: "From understanding your presence to improving it.",
      steps: [
        {
          title: "Audit",
          desc: "We review your site's technical health, content, and current visibility across the searches and platforms relevant to your business.",
        },
        {
          title: "Prioritise",
          desc: "We agree which issues and opportunities to address first, with clear goals, responsibilities, and a plan for measuring progress.",
        },
        {
          title: "Optimise",
          desc: "We improve agreed technical and content areas to help search engines and AI tools understand your business and its offerings.",
        },
        {
          title: "Measure & refine",
          desc: "We track agreed searches and platforms, explain changes in the results, and recommend where to focus next.",
        },
      ],
    },
    deliverables: [
      {
        title: "Technical SEO",
        desc: "Identify and address technical issues affecting site performance and how search engines discover and understand your content.",
      },
      {
        title: "On-Page & Content Optimization",
        desc: "Pages, headings and content shaped around what your customers actually search for.",
      },
      {
        title: "AI Search Optimization",
        desc: "Improve content and structure to help your business appear in answers from AI search tools and assistants.",
      },
      {
        title: "Ranking & AI Visibility Reports",
        desc: "Track rankings and AI visibility across agreed searches and platforms, with clear findings and recommended next steps.",
      },
    ],
    stack: [],
    work: [],
    products: [],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Shared wording for service detail pages. */
export const SERVICE_PAGE_COPY = {
  capabilitiesLabel: "How we can help",
  workHeadline: "Websites we’ve delivered.",
  productsHeadline: "Explore our own products.",
  ctaHeadline: "Let’s discuss what you need.",
  ctaDescription: "Tell us what you want to build, improve, or change. We’ll discuss your goals and where we can help.",
} as const;
