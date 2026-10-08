/* ──────────────────────────────────────────────────────────
   Shared product data.

   This is the single source of truth for products — imported by
   both the homepage deck (components/Products.tsx) and the
   per-product detail page (app/products/[slug]/page.tsx).

   Storely and Vidya AI copy reflects the supplied app screens.
   Their banners and screenshot galleries use WebP; original
   JPEG screenshots are retained alongside the converted files.
   `highlights` (stats) are intentionally empty until we have
   real numbers to show.
   ────────────────────────────────────────────────────────── */

export type Product = {
  slug: string; // route segment, e.g. "orbit-ai" → /products/orbit-ai
  n: string; // "01".."04" — display index
  name: string;
  tagline: string; // one-line description
  tag: string; // category label, e.g. "AI PLATFORM"
  image: string; // hero / main screenshot
  imageAlt?: string;
  accent: string; // per-product accent color or design-token reference
  platform?: "Android";
  playStoreUrl?: string; // verified Google Play listing; omit until supplied

  overview: string[]; // intro paragraphs
  features: { title: string; desc: string }[];
  /* Stat tiles — REAL, verifiable numbers only. Leave empty and
     the stats band is hidden on the detail page. */
  highlights: { label: string; value: string }[];
  gallery: {
    src: string;
    alt: string;
    title: string;
    description: string;
    width: number;
    height: number;
  }[];

  privacyPolicyPath?: string; // set when a hosted privacy policy exists, e.g. "/products/<slug>/privacy-policy"
};

export const PRODUCTS: Product[] = [
  {
    slug: "breaksmith",
    n: "01",
    name: "Breaksmith",
    tagline: "AI that breaks your app before your users do.",
    tag: "AI TESTING",
    image: "/products/breaksmith/breaksmith-banner.webp",
    accent: "#e8622c",
    overview: [
      "Breaksmith is an autonomous AI QA engineer for any app or website. Give it a website, an app build or a code repo — it explores everything, works out what could go wrong, tests it, and hands you every bug with proof.",
      "No test scripts to write, no test suites to maintain. It repeats on every commit, so new bugs are caught the day they're written.",
    ],
    features: [
      {
        title: "Auto-exploration",
        desc: "Crawls every screen, button, form and API call, with no setup scripts.",
      },
      {
        title: "Edge-case engine",
        desc: "Invents the odd inputs and sequences that real users stumble into.",
      },
      {
        title: "End-to-end flows",
        desc: "Runs full user journeys across browsers, devices and screen sizes.",
      },
      {
        title: "Code quality scan",
        desc: "Scans the code for bugs, risky patterns, dead code and missing tests.",
      },
      {
        title: "Self-healing tests",
        desc: "Adapts when the UI changes instead of failing on a renamed button.",
      },
      {
        title: "Proof for every bug",
        desc: "Every bug ships with repro steps, video, logs and a suggested fix.",
      },
    ],
    highlights: [],
    gallery: [],
  },
  {
    slug: "vidyakalp",
    n: "02",
    name: "Vidya AI",
    tagline: "AI textbook help and interactive learning, in your pocket.",
    tag: "AI LEARNING",
    image: "/products/vidyakalp/vidya-banner.webp",
    imageAlt: "Vidya AI banner showing the home, AI Learning and Explore screens on three phones",
    accent: "var(--color-vidya)",
    platform: "Android",
    overview: [
      "Vidya AI brings textbook questions, study tools and hands-on exploration into one mobile learning app. Ask a question, choose a simple explanation or work through an answer step by step, with support for English, Odia and Hindi.",
      "Beyond AI help, students can explore interactive diagrams, maths practice, laboratory experiments, the periodic table and a 3D solar system. Books, bookmarks, notes, quizzes and a timetable keep everyday learning close at hand.",
    ],
    features: [
      {
        title: "AI textbook help",
        desc: "Ask about your textbooks, get a simpler explanation or follow an answer step by step. A camera input is available alongside questions.",
      },
      {
        title: "Learn in your language",
        desc: "Get clear answers in English, Odia or Hindi, with subject entry points for languages, maths, science and social science.",
      },
      {
        title: "Hands-on exploration",
        desc: "Explore interactive diagrams, laboratory experiments, the periodic table and the solar system in 3D.",
      },
      {
        title: "Practice & quizzes",
        desc: "Work through maths formulas, tables and practice, then test your understanding with subject quizzes.",
      },
      {
        title: "Everyday study tools",
        desc: "Keep books, bookmarks, notes and your timetable together, with a word of the day to build vocabulary.",
      },
      {
        title: "Your learning profile",
        desc: "Set your class, board and language, and view your learning streak, AI sessions and books from your profile.",
      },
    ],
    highlights: [],
    gallery: [
      {
        src: "/products/vidyakalp/vidya-home.webp",
        alt: "Vidya AI home screen with AI Learning, study shortcuts and the word of the day",
        title: "A place to start",
        description: "AI help, study shortcuts and a new word to explore.",
        width: 738, height: 1600,
      },
      {
        src: "/products/vidyakalp/vidya-ai.webp",
        alt: "AI Learning screen with Ask, Explain simply and Step by step modes and subject choices",
        title: "Ask your textbook",
        description: "Choose a subject and the kind of explanation you need.",
        width: 738, height: 1600,
      },
      {
        src: "/products/vidyakalp/vidya-explore.webp",
        alt: "Explore screen with maths, diagrams, laboratory, periodic table, solar system and quizzes",
        title: "Learn by exploring",
        description: "Interactive tools for science, maths and more.",
        width: 738, height: 1600,
      },
      {
        src: "/products/vidyakalp/vidya-profile.webp",
        alt: "Student profile screen with class, board, language and learning progress",
        title: "Your learning journey",
        description: "Your study preferences, books and progress in one view.",
        width: 738, height: 1600,
      },
    ],
    privacyPolicyPath: "/products/vidyakalp/privacy-policy",
  },
  {
    slug: "storely",
    n: "03",
    name: "Storely",
    tagline: "Billing, inventory and everyday store management in one app.",
    tag: "RETAIL",
    image: "/products/storely/storely-banner.webp",
    imageAlt: "Storely banner showing the inventory, home dashboard and bills screens on three phones",
    accent: "var(--color-storely)",
    platform: "Android",
    overview: [
      "Storely is a mobile workspace for running a retail store. See today's booked sales, scan and bill, manage products and keep track of unpaid bills from one dashboard.",
      "The app brings inventory, customers, suppliers and store settings together. Set GST and pricing defaults, configure bill numbering and low-stock attention thresholds, and open analytics for revenue, profit, GST and unit volume.",
    ],
    features: [
      {
        title: "Store dashboard",
        desc: "See today's booked sales, product and bill counts, unpaid bills and quick actions in one place.",
      },
      {
        title: "Scan & bill",
        desc: "Open the scanner from the main navigation, create a new bill and review active or cancelled bills.",
      },
      {
        title: "Product inventory",
        desc: "Add products, search and filter your catalogue, view purchase dates and stock quantities, and spot low-stock items.",
      },
      {
        title: "Customers & suppliers",
        desc: "Keep customer and supplier records alongside the products and bills you manage each day.",
      },
      {
        title: "Pricing & bill settings",
        desc: "Configure categories, GST and margin defaults, bill numbering and the stock level that needs attention.",
      },
      {
        title: "Bills & analytics",
        desc: "Review pending bills and open analytics covering revenue, profit, GST and unit volume.",
      },
    ],
    highlights: [],
    gallery: [
      {
        src: "/products/storely/storely-home.webp",
        alt: "Storely home dashboard with booked sales, Scan and Bill, product actions and unpaid bills",
        title: "Your store at a glance",
        description: "Sales, quick actions and pending bills on one dashboard.",
        width: 738, height: 1600,
      },
      {
        src: "/products/storely/storely-products.webp",
        alt: "Storely product inventory with search, filters, stock quantities and low-stock indicators",
        title: "Know your stock",
        description: "Browse products, check quantities and spot low stock.",
        width: 738, height: 1600,
      },
      {
        src: "/products/storely/storely-bill.webp",
        alt: "Storely bills screen with active and cancelled tabs, unpaid bill summary and New Bill action",
        title: "Keep bills in view",
        description: "Create bills and follow up on outstanding payments.",
        width: 738, height: 1600,
      },
      {
        src: "/products/storely/storely-setting.webp",
        alt: "Storely store settings with categories, suppliers, pricing defaults, bill settings and analytics",
        title: "Set up your store",
        description: "Manage pricing, bill preferences and store records.",
        width: 738, height: 1600,
      },
    ],
    privacyPolicyPath: "/products/storely/privacy-policy",
  },
  {
    slug: "orbit-ai",
    n: "04",
    name: "Orbit AI",
    tagline: "AI copilots that plug into your operations and act.",
    tag: "AI PLATFORM",
    image: "/products/orbit-ai/orbit-ai-demo.webp",
    accent: "#4da2ff",
    overview: [
      "Orbit AI is a copilot layer that sits on top of the tools your team already uses. It reads context across your stack, drafts the next action, and — with your approval — carries it out."
    ],
    features: [
      {
        title: "Context-aware copilots",
        desc: "Copilots that understand your data, your docs and your workflows out of the box.",
      },
      {
        title: "Action, not just answers",
        desc: "Move from suggestion to execution — Orbit takes the steps you approve.",
      },
      {
        title: "Plug-in integrations",
        desc: "Connect your existing operational tools in minutes, no rebuild required.",
      },
      {
        title: "Guardrails & approvals",
        desc: "Every automated action runs inside policies and human checkpoints you define.",
      },
      {
        title: "Live observability",
        desc: "See what the copilot did, why, and what it changed — in real time.",
      },
      {
        title: "Enterprise-ready",
        desc: "Roles, audit trails and data controls built for teams that scale.",
      },
    ],
    highlights: [],
    gallery: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
