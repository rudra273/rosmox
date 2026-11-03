/* ──────────────────────────────────────────────────────────
   Solutions content — single source of truth for /solutions
   (components/SolutionsPage.tsx).

   Organised around practical business outcomes: getting found
   online, running daily billing & stock, professional team
   email, automated customer updates on WhatsApp & email, and
   custom apps & AI assistants.
   ────────────────────────────────────────────────────────── */

export type SolutionSlug =
  | "business-websites"
  | "billing-and-management"
  | "business-email-workspace"
  | "whatsapp-email-automation"
  | "custom-apps-and-ai";

export type BusinessSolution = {
  slug: SolutionSlug;
  n: string;
  tag: string;
  title: string;
  /** Who this solution is built for */
  audience: string;
  /** Executive summary shown under the solution heading */
  lead: string;
  /** Clear outcome statement ("What changes") */
  outcome: string;
  /** Concrete capabilities and deliverables */
  capabilities: {
    title: string;
    desc: string;
  }[];
  /** Optional links to related ROSMOX services, products, or articles */
  links?: {
    label: string;
    href: string;
  }[];
};

export type ConnectedStep = {
  n: string;
  stage: string;
  title: string;
  desc: string;
};

export type IndustryPlaybook = {
  slug: string;
  n: string;
  industry: string;
  tag: string;
  summary: string;
  startingPoint: string[];
  outcome: string;
  relatedHref?: {
    label: string;
    href: string;
  };
};

export type SolutionProcessStep = {
  n: string;
  title: string;
  desc: string;
};

export type PartnerPillar = {
  n: string;
  title: string;
  desc: string;
};

export const SOLUTIONS_HERO = {
  eyebrow: "Business Solutions",
  headline: "Technology that works as hard as you do.",
  lead: "ROSMOX helps growing businesses get online, organise daily work, and stay connected with customers — from your first website to the billing systems, workspace tools, and AI assistants that run your day.",
  tags: [
    "Websites & Local SEO",
    "Billing & Inventory",
    "Google Workspace",
    "WhatsApp & Email Automation",
    "Custom Apps & AI",
  ],
} as const;

export const SOLUTIONS: BusinessSolution[] = [
  {
    slug: "business-websites",
    n: "01",
    tag: "WEBSITES · GOOGLE · ENQUIRIES",
    title: "Business Websites",
    audience:
      "For any business that wants more customers to find it, trust it, and reach out.",
    lead: "Before people call, visit, or book, they search. We design and build fast, mobile-first websites that present your work clearly, show up on Google, and make it effortless for customers to contact you at any hour.",
    outcome:
      "Customers find you online, see your real work and pricing clearly, and reach you directly via call, WhatsApp, or enquiry form — while you update content yourself in minutes.",
    capabilities: [
      {
        title: "Custom brand design",
        desc: "Designed around your business, your story, and your customers — never a generic template.",
      },
      {
        title: "Mobile-first & fast",
        desc: "Looks sharp and loads quickly on phones and desktops, where most of your visitors browse.",
      },
      {
        title: "Google Search, Maps & Local SEO",
        desc: "Structured for local discovery across your city, including Google Business Profile and search setup.",
      },
      {
        title: "One-tap WhatsApp, call & enquiry flows",
        desc: "Direct chat buttons and structured enquiry forms that send leads straight to your phone and inbox.",
      },
      {
        title: "Portfolios, galleries & catalogues",
        desc: "Dedicated pages to showcase your products, packages, completed projects, or service tiers.",
      },
      {
        title: "Easy admin workspace",
        desc: "Update photos, prices, packages, and announcements yourself without needing a developer.",
      },
    ],
    links: [
      {
        label: "Explore Product & Platform Development",
        href: "/services/product-platform-development",
      },
      {
        label: "Explore SEO & AI Search Visibility",
        href: "/services/seo-ai-search",
      },
    ],
  },
  {
    slug: "billing-and-management",
    n: "02",
    tag: "BILLING · STOCK · REPORTS",
    title: "Billing & Shop Management Systems",
    audience:
      "For retail shops, supermarkets, pharmacies, distributors, and businesses selling products every day.",
    lead: "The counter is busy — the back office shouldn't be. We replace handwritten bills, stock guesswork, and scattered notebooks with one connected system your staff can learn in a day.",
    outcome:
      "Faster counters, fewer pricing or tax mistakes, automatic stock deductions on every bill, and clear sales and profit numbers at the end of every day.",
    capabilities: [
      {
        title: "Fast GST-ready billing",
        desc: "Search or scan products, apply GST and category discounts automatically, and record cash, UPI, or card payments in seconds.",
      },
      {
        title: "Live product & stock management",
        desc: "Keep every product, purchase date, price, and stock quantity in one view with low-stock reorder alerts.",
      },
      {
        title: "Customer & supplier records",
        desc: "Track repeat customers, supplier deliveries, pending bills, and credit balances alongside daily sales.",
      },
      {
        title: "Bills on WhatsApp & email",
        desc: "Print on your receipt printer or share clean PDF invoices and gentle payment reminders on WhatsApp.",
      },
      {
        title: "Owner & staff logins",
        desc: "Role-appropriate access so counter staff can bill quickly while owners stay in control of pricing and settings.",
      },
      {
        title: "Daily sales & profit reports",
        desc: "Check today's booked sales, unit volume, GST totals, and net margins from anywhere.",
      },
    ],
    links: [
      {
        label: "Explore Storely (Retail App)",
        href: "/products/storely",
      },
      {
        label: "Read: Connected Retail Operations",
        href: "/blog/connected-retail-operations",
      },
    ],
  },
  {
    slug: "business-email-workspace",
    n: "03",
    tag: "GOOGLE WORKSPACE · DOMAIN EMAIL",
    title: "Business Email & Google Workspace",
    audience:
      "For growing teams that want to look established and work together from anywhere.",
    lead: "Customers, suppliers, and banks take you more seriously when your email carries your business name instead of a personal address. We set up Google Workspace and domain email for your entire team, end to end.",
    outcome:
      "Every email carries your brand (name@yourbusiness.com), your team collaborates in shared drives and calendars, and all accounts and contacts belong to the business.",
    capabilities: [
      {
        title: "Addresses on your own domain",
        desc: "Professional email addresses for every person and department (such as hello@, orders@, or accounts@).",
      },
      {
        title: "Complete Google Workspace setup",
        desc: "Gmail, Calendar, Meet, Drive, Docs, and Sheets configured for your business with clear plan guidance.",
      },
      {
        title: "Migration of old emails & contacts",
        desc: "Existing messages and address books moved across cleanly so nothing important is left behind.",
      },
      {
        title: "Shared team drives & calendars",
        desc: "Organised folders for invoices, proposals, and project files that stay with the company.",
      },
      {
        title: "Phone & laptop setup",
        desc: "Hands-on setup across your team's devices so everyone can send and receive from day one.",
      },
      {
        title: "Security & access controls",
        desc: "Two-step verification, spam protection, and simple onboarding or offboarding as your team changes.",
      },
    ],
  },
  {
    slug: "whatsapp-email-automation",
    n: "04",
    tag: "WHATSAPP · EMAIL · FOLLOW-UPS",
    title: "WhatsApp & Email Automation",
    audience:
      "For businesses that talk to many customers and cannot afford to miss an enquiry or follow-up.",
    lead: "We connect your website, billing software, or booking flow to official WhatsApp Business and email channels — so customers receive timely updates and your team spends less time typing the same messages by hand.",
    outcome:
      "Customers hear back in seconds even when you're busy at the counter or on site, every lead is logged in one place, and routine reminders run automatically.",
    capabilities: [
      {
        title: "Instant enquiry replies",
        desc: "Automatic, friendly WhatsApp and email responses the moment a customer reaches out from your website.",
      },
      {
        title: "New-lead alerts for your team",
        desc: "Route incoming enquiries to the right person with all customer details captured in one place.",
      },
      {
        title: "Bills & order confirmations",
        desc: "Send invoices, order-ready alerts, and delivery updates automatically as status changes.",
      },
      {
        title: "Payment & appointment reminders",
        desc: "Scheduled reminders for pending credit bills, upcoming visits, bookings, or prescription refills.",
      },
      {
        title: "Morning owner summary",
        desc: "A clear daily digest of yesterday's sales, new enquiries, and pending tasks sent straight to you.",
      },
      {
        title: "Opted-in customer updates",
        desc: "Share seasonal offers, new arrivals, and festival greetings with customers who have opted in.",
      },
    ],
    links: [
      {
        label: "Explore AI & Workflow Automation",
        href: "/services/artificial-intelligence",
      },
    ],
  },
  {
    slug: "custom-apps-and-ai",
    n: "05",
    tag: "CUSTOM SOFTWARE · AI AGENTS · INTEGRATIONS",
    title: "Custom Apps & AI Assistants",
    audience:
      "For businesses ready to go further when off-the-shelf software doesn't fit how you work.",
    lead: "When your operations outgrow spreadsheets and standard packages, we design and engineer custom mobile apps, internal platforms, and AI copilots tailored to your workflows and connected to your existing data.",
    outcome:
      "Software and intelligent assistants built around your rules, with human approval checkpoints, reliable testing, and full ownership.",
    capabilities: [
      {
        title: "Mobile apps for customers or staff",
        desc: "iOS and Android applications built for field teams, store operations, learning, or customer self-service.",
      },
      {
        title: "AI assistants & operational copilots",
        desc: "Assistants grounded in your documents and records that answer questions, draft actions, and route tasks.",
      },
      {
        title: "Custom ERP, CRM & booking systems",
        desc: "Operations, inventory, quotation, and customer management platforms shaped around your business.",
      },
      {
        title: "Connecting your existing tools",
        desc: "API integrations that bridge disconnected software so data only has to be entered once.",
      },
      {
        title: "Human-in-the-loop guardrails",
        desc: "Clear approval steps, permissions, and audit trails so your team stays in control of every decision.",
      },
      {
        title: "AI-powered testing & QA",
        desc: "Thorough functional, API, and automated regression testing so every release holds up in daily use.",
      },
    ],
    links: [
      {
        label: "Explore Orbit AI",
        href: "/products/orbit-ai",
      },
      {
        label: "Explore Breaksmith",
        href: "/products/breaksmith",
      },
      {
        label: "Read: Generative & Agentic AI in SaaS",
        href: "/blog/generative-and-agentic-ai-in-modern-saas",
      },
    ],
  },
];

export const CONNECTED_FLOW: ConnectedStep[] = [
  {
    n: "01",
    stage: "DISCOVERY",
    title: "Website",
    desc: "A customer finds your business on Google, explores your catalogue or work, and taps to enquire.",
  },
  {
    n: "02",
    stage: "CAPTURE",
    title: "Enquiry",
    desc: "The enquiry is saved automatically, your team is alerted, and the customer gets an instant reply.",
  },
  {
    n: "03",
    stage: "COMMUNICATION",
    title: "WhatsApp & Email",
    desc: "Quotes, booking confirmations, or order updates go out from your official business accounts.",
  },
  {
    n: "04",
    stage: "OPERATIONS",
    title: "Billing & Stock",
    desc: "The sale is billed with GST, stock quantities adjust live, and the invoice is shared digitally.",
  },
  {
    n: "05",
    stage: "VISIBILITY",
    title: "Reports",
    desc: "You see the day's revenue, stock alerts, and pending follow-ups in one clear view.",
  },
];

export const INDUSTRY_PLAYBOOKS: IndustryPlaybook[] = [
  {
    slug: "retail-and-supermarkets",
    n: "01",
    industry: "Retail shops & supermarkets",
    tag: "BILLING · STOCK · WHATSAPP",
    summary:
      "Bring people from their phone to your counter, speed up checkout, and keep every shelf accounted for.",
    startingPoint: [
      "GST billing & live stock management system",
      "WhatsApp digital bills & credit payment reminders",
      "Product catalogue website with store timings & directions",
    ],
    outcome: "Faster checkout, fewer stock-outs, and repeat local customers.",
    relatedHref: { label: "See Storely", href: "/products/storely" },
  },
  {
    slug: "pharmacies-and-clinics",
    n: "02",
    industry: "Pharmacies, clinics & healthcare",
    tag: "WEBSITE · WORKSPACE · UPDATES",
    summary:
      "Make it simple for patients and customers to find your locations, trust your practice, and request what they need.",
    startingPoint: [
      "Professional website with locations, hours & enquiry forms",
      "Google Workspace email for doctors, staff, and administration",
      "Automated appointment, order-ready & refill reminders",
    ],
    outcome: "Easy local discovery, trusted brand identity, and organised communication.",
  },
  {
    slug: "construction-and-real-estate",
    n: "03",
    industry: "Construction, builders & hardware",
    tag: "PROJECTS · PACKAGES · LEADS",
    summary:
      "Show your track record, compare packages transparently, and turn online visitors into site visits.",
    startingPoint: [
      "Website with project portfolio & city-priced package comparison",
      "Hardware or material catalogue with WhatsApp enquiry routing",
      "Private admin panel to update projects and prices in minutes",
    ],
    outcome: "Better-qualified site-visit enquiries and pricing that stays current.",
    relatedHref: {
      label: "Explore Product & Platform Development",
      href: "/services/product-platform-development",
    },
  },
  {
    slug: "weddings-events-and-photography",
    n: "04",
    industry: "Weddings, events & photography",
    tag: "BRAND WEBSITE · GALLERIES · BOOKINGS",
    summary:
      "Help couples, hosts, and clients experience the quality of your work and enquire with their event details sorted.",
    startingPoint: [
      "Story-driven brand website with photo and film galleries",
      "Service pillars and package tiers with date-based enquiry forms",
      "Instant booking confirmations and schedule reminders",
    ],
    outcome: "A digital presence that matches your craft and turns browsing into bookings.",
  },
  {
    slug: "wholesale-and-distribution",
    n: "05",
    industry: "Wholesale, trade & distribution",
    tag: "INVENTORY · CREDIT · ORDERS",
    summary:
      "Manage bulk unit volumes, supplier margins, and recurring trade accounts without spreadsheet chaos.",
    startingPoint: [
      "Inventory, supplier purchase & multi-tier billing system",
      "Customer credit tracking and automated due reminders",
      "Order confirmation and dispatch updates on WhatsApp",
    ],
    outcome: "Clear stock and receivables, with fewer manual follow-up calls.",
  },
  {
    slug: "services-education-and-hospitality",
    n: "06",
    industry: "Education, restaurants & professional services",
    tag: "WEB · AI LEARNING · AUTOMATION",
    summary:
      "Whether you run an institute, a hospitality venue, or an advisory firm, give people a clear way to engage with you.",
    startingPoint: [
      "Fast website with courses, menus, or service booking flows",
      "Custom mobile learning or customer portal tools",
      "Shared team inbox and instant lead follow-ups",
    ],
    outcome: "Less administrative overhead and a smoother experience for every client or student.",
    relatedHref: { label: "See Vidyakalp", href: "/products/vidyakalp" },
  },
];

export const SOLUTION_PROCESS: SolutionProcessStep[] = [
  {
    n: "01",
    title: "Talk",
    desc: "A straightforward conversation about your business, your customers, and the daily tasks slowing you down.",
  },
  {
    n: "02",
    title: "Plan",
    desc: "A clear written proposal in plain language: what we will build, how it fits together, how long it takes, and what it costs.",
  },
  {
    n: "03",
    title: "Build",
    desc: "We build and configure in stages, show you real progress, and refine the details with your feedback.",
  },
  {
    n: "04",
    title: "Launch & support",
    desc: "We go live, train your team until daily use feels routine, and stay on hand for changes as your business grows.",
  },
];

export const PARTNER_PILLARS: PartnerPillar[] = [
  {
    n: "01",
    title: "One partner for everything",
    desc: "Website, billing, business email, WhatsApp automation, and custom AI from a single team — designed to work together from day one.",
  },
  {
    n: "02",
    title: "Built around how you work",
    desc: "We listen first and explain options in plain business terms, shaping the tools around your staff and customers rather than forcing a rigid package.",
  },
  {
    n: "03",
    title: "Yours to keep",
    desc: "Your domain, accounts, code, and business data are set up in your name, with a clear handover and ongoing support when you need us.",
  },
];

export const FIRST_CALL_CHECKLIST: string[] = [
  "Your business name and existing domain, if you have one",
  "Your logo and a few real photos or examples of your work or products",
  "How customers currently find, contact, and buy from you today",
  "The repetitive task or bottleneck that takes up most of your week",
];
