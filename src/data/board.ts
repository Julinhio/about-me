// All page copy lives here. Edit text in this file only.

export const meta = {
  title: "Julien Gaichet",
  description:
    "I build the systems behind operations: automations, integrations and AI tools that teams actually use.",
};

export const intro = {
  name: "Julien Gaichet",
  line: "I build the systems behind operations: automations, integrations and AI tools that teams actually use.",
  sub: "Based in France, working remote. I ship production tools by directing AI coding agents, and I spent twelve years in translation quality assurance before that.",
  links: [
    { label: "Email me", href: "mailto:julien@syntaxbuddy.io", primary: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/jgaichet", primary: false },
    { label: "GitHub", href: "https://github.com/Julinhio", primary: false },
  ],
};

export type ShippedCard = {
  kind: "shipped";
  id: string;
  title: string;
  face: string;
  tags: string[];
  problem: string;
  built: string;
  result?: string;
};

export type TextCard = {
  kind: "running" | "next";
  title: string;
  face: string;
  tags: string[];
  detail: string;
};

export type CardData = ShippedCard | TextCard;

export type Column = {
  key: "shipped" | "running" | "next";
  title: string;
  note?: string;
  cards: CardData[];
};

export const columns: Column[] = [
  {
    key: "shipped",
    title: "Shipped",
    cards: [
      {
        kind: "shipped",
        id: "JG-1",
        title: "Coach payroll control",
        face: "Real pay has run through it since October 2026; an independent recount matched its totals.",
        tags: ["TypeScript", "Postgres", "Monday.com API", "human review"],
        problem: "Coaches were paid per session on what they declared, and nobody could easily check it.",
        built:
          "A nightly check that matches each declared session with its recording, sorts it as validated, to review or error, computes monthly pay with dated rates and bonuses, and freezes each month once closed. An LLM assistant answers questions about the figures but can't change anything.",
        result: "Real pay has run through it since October 2026; an independent recount matched its totals.",
      },
      {
        kind: "shipped",
        id: "JG-2",
        title: "Sales-call pipeline",
        face: "11,251 calls became 32 qualified prospect briefs, with zero failures.",
        tags: ["Node.js", "Whisper", "LLM", "CRM"],
        problem: "A sales rep's calls held useful prospect information that never reached the CRM.",
        built:
          "Pulls calls from the Aircall API, transcribes them, lets an LLM drop the noise and writes a structured prospect brief into Monday.com, with a weekly run and an email report.",
        result: "11,251 calls became 32 qualified prospect briefs, with zero failures.",
      },
      {
        kind: "shipped",
        id: "JG-3",
        title: "Field inspection app",
        face: "600+ properties documented.",
        tags: ["React", "Supabase", "LLM", "PDF"],
        problem:
          "Every new property needed a report, an access guide and a listing, built from scattered notes and photos.",
        built:
          "A mobile app coordinators fill in on site, with photos, video and voice notes; it generates the documents and an AI-written Airbnb/Booking listing, and pushes data to the CRM and Google Drive.",
        result: "600+ properties documented.",
      },
      {
        kind: "shipped",
        id: "JG-4",
        title: "Testimonial matching for sales",
        face: "92 videos searchable, at about $0.01 per question.",
        tags: ["LLM", "search", "sales enablement"],
        problem:
          "Sellers had dozens of client testimonial videos but no quick way to find the right one for a prospect.",
        built:
          "An AI pipeline that analyzes each video and matches it to a prospect's profile, plus a natural-language search.",
        result: "92 videos searchable, at about $0.01 per question.",
      },
      {
        // No Result field on this card: intentional, approved by the owner.
        kind: "shipped",
        id: "JG-5",
        title: "NPS reporting",
        face: "10 surveys across two brands, collected into dashboards and synced to the CRM.",
        tags: ["automation", "dashboards", "CX"],
        problem: "Client satisfaction surveys were scattered across tools and brands.",
        built:
          "Automated collection across 10 surveys and two brands into dashboards for leadership and each team member, synced to the CRM.",
      },
    ],
  },
  {
    key: "running",
    title: "Running now",
    cards: [
      {
        kind: "running",
        title: "Job radar",
        face: "9,000+ postings a night from 12 sources, for about €0.70 a run.",
        tags: ["free-model triage", "Claude Haiku"],
        detail:
          "Collects 9,000+ postings a night from 12 sources; a free model does a first triage, then Claude Haiku re-scores what passes and learns from my decisions, for about €0.70 a run. It's how I found this role.",
      },
      {
        kind: "running",
        title: "Prospecting radar",
        face: "Reads job postings as buying signals for my automation agency.",
        tags: ["agent", "lead enrichment"],
        detail:
          "A nightly agent for my own automation agency: it reads job postings as buying signals, works out the manual work behind them and enriches the leads worth a call.",
      },
    ],
  },
  {
    key: "next",
    title: "Next",
    note: "What I'd build first at Fredrin. Hypotheses from the outside.",
    cards: [
      {
        kind: "next",
        title: "Signal-based outbound",
        face: "Find teams that already run AI coding agents and route them to a short, specific first message.",
        tags: ["outbound", "signals"],
        detail:
          "Find teams that already run AI coding agents (public repos with agent config files, job posts asking for Claude Code or Codex) and route them to a short, specific first message.",
      },
      {
        kind: "next",
        title: "Signup routing",
        face: "Team-sized accounts reach a founder within the hour; solo developers get a good self-serve path.",
        tags: ["lead scoring", "lifecycle"],
        detail:
          "Score each new signup from product and company signals, so team-sized accounts reach a founder within the hour and solo developers get a good self-serve path.",
      },
      {
        kind: "next",
        title: "Comparison pages from real usage",
        face: "Parallel coding agents vs doing it by hand, the way I do today.",
        tags: ["content", "SEO"],
        detail:
          'Comparison pages written from real usage: "running several coding agents in parallel" vs doing it by hand with terminals and branches, the way I do today.',
      },
    ],
  },
];

export const prose = [
  {
    title: "How I work",
    text: "I write the spec, AI coding agents do most of the implementation, and a second model reviews every pull request before I merge. I usually have several agents working in parallel, each on its own branch, which is exactly the workflow Fredrin is built for. I stay responsible for what reaches production: monitoring, catch-up runs, and fixing the class of problem, not just the instance.",
  },
  {
    title: "Before tech",
    text: "Over ten years in English-French translation, the last ones in quality assurance for brands like Cathay Pacific, Radisson and AWS: reviewing machine output at volume and cross-checking it against glossaries and reference files. It's where I learned to assume an automated system is wrong somewhere, and to find where.",
  },
];

export const footer = {
  line: "Built with Fredrin, ticket by ticket.",
  email: "julien@syntaxbuddy.io",
};
