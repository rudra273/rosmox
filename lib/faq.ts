/* ──────────────────────────────────────────────────────────
   FAQ — shown in the Contact section (components/Faq.tsx), and
   published as FAQPage JSON-LD for search.

   Answers come from the founders (Oct 2026). They are business
   promises — change them here only when the policy changes.
   ────────────────────────────────────────────────────────── */

export type FaqItem = { q: string; a: string };

export const FAQ: FaqItem[] = [
  {
    q: "How much does a project cost?",
    a: "It depends on the scope and scale, so we quote after a first call, once we understand what you need. For the same senior-level work, our pricing is lower than typical market rates.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on what we're building. A focused product can ship in about a month; a larger AI product or platform can take up to a year. Your proposal includes a timeline.",
  },
  {
    q: "Who owns the code and designs?",
    a: "You do. Once the project is paid for, the code, designs and accounts are handed over to you.",
  },
  {
    q: "Who will work on my project?",
    a: "A small team of senior engineers and architects, with experienced developers alongside them — the same people from kickoff to launch.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. We're happy to sign an NDA before you share the details of your idea.",
  },
  {
    q: "Do you support the product after launch?",
    a: "Yes. Post-launch support is included in the project cost.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work with clients in India, the US, the UK and other countries.",
  },
  {
    q: "Can you take over an existing product?",
    a: "Yes — we do both. We build new products from scratch, and we take over existing ones to improve, extend or stabilise them.",
  },
  {
    q: "What do you need from us to get started?",
    a: "Just the idea. We take it from there: architecture, design, build and launch.",
  },
];
