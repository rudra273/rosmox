import type { ServiceSlug } from "@/lib/services";

/* ──────────────────────────────────────────────────────────
   Shared blog / industry insights data.
   Single source of truth for /blog, /blog/[slug], and sitemap.ts.

   Editorial style: industry, market, and business operations
   perspectives — written without technical jargon or invented stats.
   ────────────────────────────────────────────────────────── */

export type BlogSection = {
  id: string;
  n: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  points?: {
    title: string;
    desc: string;
  }[];
  closing?: string;
};

export type BlogPost = {
  slug: string;
  n: string;
  category: string;
  title: string;
  /** Meta description & index card summary */
  desc: string;
  /** Italicised / highlighted executive lead at the top of the article */
  lead: string;
  publishedAt: string; // YYYY-MM-DD for Article JSON-LD and sitemap
  publishedLabel: string;
  readingTime: string;
  intro: string[];
  sections: BlogSection[];
  /** Subtle consultancy-style capability links at the bottom of the page */
  relatedServices: ServiceSlug[];
  relatedProducts: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "connected-retail-operations",
    n: "01",
    category: "INDUSTRY PERSPECTIVE · RETAIL & COMMERCE",
    title:
      "From the Billing Counter to the Back Office: Why Growing Retailers Are Rethinking Everyday Store Operations",
    desc: "Why growing retailers, wholesalers, and store operators are replacing disconnected billing, stock records, and GST workflows with unified, intelligent daily operations.",
    lead: "In retail and everyday commerce, profitability rarely comes down to a single big decision. It is won or lost in hundreds of small moments at the counter, in the stockroom, and during month-end reconciliation.",
    publishedAt: "2026-11-03",
    publishedLabel: "November 2026",
    readingTime: "5 min read",
    intro: [
      "For years, most independent retailers, multi-outlet shops, and regional distributors have operated with a split system. At the front counter, speed is everything: serving the customer, generating a bill, and moving the queue forward. Behind the scenes, however, the rest of the business — stock counts, supplier purchases, unpaid customer balances, and GST reconciliation — often lives across separate notebooks, spreadsheets, or disconnected software.",
      "When a store is small, the owner’s memory bridges that gap. As product lines expand, supplier networks grow, and compliance requirements tighten, relying on disconnected records quietly erodes both time and margin.",
    ],
    sections: [
      {
        id: "disconnected-work",
        n: "01",
        title: "The Hidden Cost of Disconnected Daily Work",
        lead: "Across retail segments — from neighbourhood supermarkets and electronics showrooms to hardware dealers, pharmacies, and wholesale counters — store owners face the same operational friction.",
        paragraphs: [
          "Most operational losses in retail do not look like emergencies on the day they happen. They show up weeks later as missing stock, delayed customer collections, or hours spent reconciling tax figures that should have been captured automatically at the point of sale.",
        ],
        points: [
          {
            title: "Fast billing vs. accurate records",
            desc: "When billing is separated from the product catalogue, price updates, discount rules, and tax slabs have to be remembered at the counter. Small errors compound into hours of manual correction later.",
          },
          {
            title: "Inventory blind spots",
            desc: "Knowing what sold today is not the same as knowing what is left on the shelf. Without live stock deductions tied to every bill and supplier delivery, businesses simultaneously suffer from running out of fast-moving items and tying up working capital in slow-moving stock.",
          },
          {
            title: "Unpaid bills and credit follow-ups",
            desc: "In many retail and trade businesses, repeat customers and local accounts buy on partial payment or short-term credit. When pending bills are tracked separately from daily sales, follow-ups slip through the cracks and cash flow slows down.",
          },
          {
            title: "Month-end tax pressure",
            desc: "Treating GST and margin calculation as an end-of-month accounting chore rather than a built-in part of every transaction creates unnecessary stress and compliance risk.",
          },
        ],
      },
      {
        id: "connected-rhythm",
        n: "02",
        title: "Moving to a Single Operational Rhythm",
        lead: "Leading retail and commerce businesses no longer treat billing, inventory, and accounting preparation as separate jobs.",
        paragraphs: [
          "Instead of adding more back-office admin at the end of the day, modern store operations bring the entire rhythm of the shop into one connected flow where a single action at the counter updates the whole business.",
        ],
        points: [
          {
            title: "The counter updates the stockroom",
            desc: "Scanning or selecting an item to generate a customer bill automatically adjusts stock quantities, applies the right category tax and pricing defaults, and logs the revenue.",
          },
          {
            title: "Low-stock thresholds replace guesswork",
            desc: "Rather than waiting for an empty shelf to realise an item is out, clear stock-level alerts highlight which products need reordering while there is still time to call the supplier.",
          },
          {
            title: "Customers and suppliers live alongside transactions",
            desc: "Keeping supplier purchase histories and customer billing records in one place makes it immediately clear who owes what, which cancelled or pending bills need attention, and which suppliers deliver your most reliable stock.",
          },
          {
            title: "Clarity on revenue, profit, and tax — any day of the month",
            desc: "Instead of waiting for an accountant to summarise last month’s performance, store operators can see today’s booked sales, unit volume, net margins, and GST totals at a glance.",
          },
        ],
      },
      {
        id: "practical-ai",
        n: "03",
        title: "Where Practical AI Fits Into Everyday Commerce",
        lead: "Artificial intelligence in retail is often discussed in terms of giant e-commerce warehouses, but its most immediate value is on the everyday shop floor.",
        paragraphs: [
          "When daily sales, stock movement, and billing records sit in one place, intelligent tools can quietly assist business owners in the background without adding complexity or requiring specialized training.",
        ],
        points: [
          {
            title: "Spotting demand shifts early",
            desc: "Highlighting which categories or items are moving faster than usual before a seasonal rush or local event so owners can stock up with confidence.",
          },
          {
            title: "Reducing manual entry",
            desc: "Assisting with catalogue setup, invoice reading, and routine record updates so staff spend less time typing and more time serving customers.",
          },
          {
            title: "Surfacing what needs attention today",
            desc: "Bringing overdue payments, unusual margin dips, or low-stock items to the top of the owner’s daily view so nothing important is missed during a busy week.",
          },
        ],
        closing:
          "The goal is not to replace the store owner’s judgement — it is to give them clean, timely information so their judgement can go further.",
      },
      {
        id: "across-industries",
        n: "04",
        title: "Beyond the Retail Shop: One Pattern Across Industries",
        lead: "While the retail counter is the clearest example, this same operational shift is happening across adjacent industries that manage physical stock, tiered pricing, and high-frequency transactions.",
        paragraphs: [
          "Whenever a business has to balance fast customer service with accurate inventory, supplier records, and tax compliance, the underlying challenge is identical — and so is the advantage of a unified system.",
        ],
        points: [
          {
            title: "Wholesale & Distribution",
            desc: "Managing bulk unit volumes, supplier margins, and recurring credit accounts across dozens of daily trade orders.",
          },
          {
            title: "Construction & Hardware Supply",
            desc: "Keeping thousands of hardware SKUs, city- or tier-based package pricing, and customer enquiries organised in one place.",
          },
          {
            title: "Specialty & Service Commerce",
            desc: "Combining itemised billing, order status, and clear customer histories from the first enquiry to final payment.",
          },
        ],
        closing:
          "In every sector, the advantage goes to businesses whose tools match how their people actually work — mobile, fast to learn, and clear enough to run the business from a single screen.",
      },
    ],
    relatedServices: ["product-platform-development", "artificial-intelligence"],
    relatedProducts: ["storely"],
  },
  {
    slug: "generative-and-agentic-ai-in-modern-saas",
    n: "02",
    category: "INDUSTRY PERSPECTIVE · ENTERPRISE AI & SAAS",
    title:
      "Beyond the Chat Box: How Generative and Agentic AI Are Reshaping Modern Business Software",
    desc: "Why modern SaaS is evolving from static dashboards and passive chat assistants to agentic systems that understand context, coordinate workflows, and act with human oversight.",
    lead: "The first wave of generative AI gave business software a voice — helping teams draft text, summarise meetings, and search documents. The next wave is giving software hands: agentic systems that work across tools to move real business tasks forward.",
    publishedAt: "2026-11-03",
    publishedLabel: "November 2026",
    readingTime: "6 min read",
    intro: [
      "For the past decade, cloud software followed a familiar pattern: every department adopted a specialized application with its own dashboard, forms, and reports. Software stored the records, while people did all the connective work — reading updates, copying details between tabs, making routine checks, and pushing tasks to the next stage.",
      "Generative AI began changing that relationship by letting teams interact with information in plain language. Now, as agentic AI matures inside modern SaaS, business software is shifting from a passive place where work is recorded into an active partner that helps carry the work out.",
    ],
    sections: [
      {
        id: "generative-interfaces",
        n: "01",
        title: "From Static Dashboards to Generative Interfaces",
        lead: "Traditional business software was built around menus, filters, and manual data entry — forcing people to adapt to how the software was structured.",
        paragraphs: [
          "As organisations grow, the sheer number of screens, fields, and documents becomes a bottleneck of its own. Generative AI removes much of that friction by allowing software to work with unstructured, everyday inputs — turning conversations, documents, and questions directly into structured business context.",
        ],
        points: [
          {
            title: "Turning messy inputs into clean records",
            desc: "Extracting key details from incoming documents, customer messages, and operational notes without requiring staff to type every field by hand.",
          },
          {
            title: "Instant synthesis across business history",
            desc: "Summarising account history, project status, or operational bottlenecks in seconds rather than exporting spreadsheets and reading through long threads.",
          },
          {
            title: "Drafting grounded in company context",
            desc: "Preparing responses, summaries, and action plans using the organisation’s own policies, catalogues, and live records rather than generic templates.",
          },
          {
            title: "Faster onboarding for every role",
            desc: "Allowing team members to ask questions and navigate complex software in plain language instead of memorising dozens of nested menus.",
          },
        ],
      },
      {
        id: "shift-to-agentic-ai",
        n: "02",
        title: "The Shift to Agentic AI: From Answering to Acting",
        lead: "Answering a question is helpful, but in daily operations, the real work begins after the answer is found.",
        paragraphs: [
          "This is where agentic AI separates itself from a simple chat box. While a standard assistant waits for a prompt and replies with text, an AI agent is designed around a workflow: it reads context across connected systems, works out the required steps, drafts the next action, and — within agreed rules — carries it through.",
        ],
        points: [
          {
            title: "Multi-step workflow execution",
            desc: "Instead of only explaining what needs to be done, an agent gathers the relevant records, prepares the update, and queues the next step for completion.",
          },
          {
            title: "Bridging disconnected software",
            desc: "Working across existing operational tools, CRMs, and internal systems so employees no longer spend their day copying information from one window to another.",
          },
          {
            title: "Proactive background verification",
            desc: "Continuously checking for edge cases, incomplete records, or operational risks as changes happen, rather than waiting for someone to run a manual check.",
          },
          {
            title: "Outcome-focused assistance",
            desc: "Supporting complete business tasks — such as routing a request, reviewing a release, or reconciling an account — rather than isolated text prompts.",
          },
        ],
      },
      {
        id: "human-guardrails",
        n: "03",
        title: "Why Guardrails and Human Oversight Define Real Adoption",
        lead: "In business operations, speed without control is a risk. The most effective agentic systems are built around clear human checkpoints.",
        paragraphs: [
          "Leaders do not want a black box making unverified changes to customer accounts or core systems. Sustainable AI adoption happens when software handles the heavy preparation while keeping people firmly in control of the decisions that matter.",
        ],
        points: [
          {
            title: "Human-in-the-loop approvals",
            desc: "Routine preparation happens automatically, while sensitive actions — such as customer commitments, financial updates, or system changes — pause for one-click human approval.",
          },
          {
            title: "Complete visibility and audit trails",
            desc: "Every action taken or suggested by an agent shows what information it used, why it proposed that step, and what changed as a result.",
          },
          {
            title: "Clear role and policy boundaries",
            desc: "Agents operate inside the same permissions, business rules, and data protections that govern the rest of the organisation.",
          },
          {
            title: "Evaluation against real scenarios",
            desc: "Testing AI workflows against realistic day-to-day examples and edge cases before introducing them into live operations.",
          },
        ],
        closing:
          "Trust in business AI is not built by promising full autonomy — it is built by making every automated step transparent, predictable, and easy to review.",
      },
      {
        id: "where-it-delivers-value",
        n: "04",
        title: "Where Modern Teams Are Seeing Immediate Impact",
        lead: "Across industries, the highest return from generative and agentic AI comes from removing repetitive coordination work from skilled teams.",
        paragraphs: [
          "Rather than replacing core systems that already work, forward-looking businesses are adding an intelligent layer on top of their existing operations — freeing their people to focus on judgement, relationships, and growth.",
        ],
        points: [
          {
            title: "Operations & internal copilots",
            desc: "Connecting everyday tools so teams can read context across their stack, draft next steps, and execute approved actions from a single place.",
          },
          {
            title: "Autonomous software testing & QA",
            desc: "Using AI agents to explore applications, discover edge-case failures, and provide clear evidence on every change without brittle manual test scripts.",
          },
          {
            title: "Document & request automation",
            desc: "Processing incoming forms, invoices, and customer enquiries automatically while routing exceptions to the right person for review.",
          },
          {
            title: "Guided learning & knowledge access",
            desc: "Helping users and teams work through complex material step by step, in the language and format that suits them best.",
          },
        ],
        closing:
          "As SaaS continues to evolve, the gap between software that merely stores data and software that actively helps run the business will only widen.",
      },
    ],
    relatedServices: [
      "artificial-intelligence",
      "product-platform-development",
      "software-testing-qa",
    ],
    relatedProducts: ["orbit-ai", "breaksmith"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
