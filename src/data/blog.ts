export interface BlogBlock {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hidden-cost-of-infrastructure-drift",
    title: "The hidden cost of infrastructure drift",
    excerpt:
      "Config drift rarely shows up as a single dramatic incident. It shows up as a thousand small inconsistencies that make every future change riskier than the last.",
    category: "Platform engineering",
    author: "Dana Whitfield",
    authorRole: "Staff Engineer, Nexora Systems",
    date: "2026-01-14",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Every platform team has a version of the same story: an environment that was provisioned correctly eighteen months ago, patched by hand a dozen times since, and now differs from its own infrastructure-as-code definition in ways nobody can fully enumerate. This is drift, and it's rarely dramatic enough to trigger an incident on its own. Instead, it accumulates quietly until it makes an unrelated change dangerous.",
      },
      {
        type: "heading",
        text: "Why drift is different from a bug",
      },
      {
        type: "paragraph",
        text: "A bug is a defect in logic. Drift is a defect in truth — the gap between what your manifest says should exist and what's actually running. That gap grows for mundane reasons: a hotfix applied directly to production during an incident, a manual permission grant that was never revoked, a resource resized to handle a traffic spike and never resized back. None of these are mistakes in isolation. Collectively, they mean your infrastructure-as-code stops being a reliable description of reality.",
      },
      {
        type: "paragraph",
        text: "The cost shows up later, and indirectly. A team tries to reproduce production in staging and can't, because staging quietly diverged. An audit takes three weeks longer than it should because nobody can produce an authoritative list of what's actually deployed. A security review flags a public storage bucket that was never supposed to be public, and nobody remembers when or why it changed.",
      },
      {
        type: "heading",
        text: "Detecting drift is necessary, but not sufficient",
      },
      {
        type: "paragraph",
        text: "Most teams eventually add some form of drift detection — a scheduled job that diffs live state against the IaC definition and posts the result to a channel nobody reads closely enough. This helps, but only partially. Detection without a fast, low-friction remediation path just becomes another alert competing for attention. The teams that actually solve drift pair detection with automatic remediation plans and policy guardrails that catch violations before they're applied, not after.",
      },
      {
        type: "paragraph",
        text: "The goal isn't to eliminate every manual change — sometimes a hotfix during an incident is exactly the right call. The goal is to make sure that change is reconciled back into the source of truth quickly, deliberately, and visibly, rather than silently accumulating as one more inconsistency for the next engineer to discover the hard way.",
      },
    ],
  },
  {
    slug: "golden-paths-self-service-infrastructure",
    title: "Golden paths: how platform teams should think about self-service",
    excerpt:
      "Self-service infrastructure fails when it means 'anything goes.' It succeeds when it means 'here's the shape we've already approved — go build.'",
    category: "Developer experience",
    author: "Marcus Chen",
    authorRole: "Head of Platform, Nexora Systems",
    date: "2025-12-02",
    readTime: "7 min read",
    content: [
      {
        type: "paragraph",
        text: "Platform teams tend to arrive at self-service infrastructure from one of two directions: either they're drowning in provisioning tickets and need relief, or a security incident revealed that infrastructure decisions were being made ad hoc, with no consistent review. Both paths lead to the same conclusion — application teams need a way to provision infrastructure without waiting on a human, and platform teams need a way to guarantee what gets provisioned meets their standards.",
      },
      {
        type: "paragraph",
        text: "The mistake is treating self-service as an all-or-nothing proposition: either developers file a ticket for everything, or they get unrestricted access to provision whatever they want. Neither extreme works. The middle path — the one that actually scales — is the golden path: a curated, pre-approved set of templates that represent the shapes of infrastructure your platform team is willing to support.",
      },
      {
        type: "heading",
        text: "What makes a path 'golden'",
      },
      {
        type: "list",
        items: [
          "It encodes your platform's opinions by default — networking, observability, and security are configured correctly without the requester having to know why.",
          "It's narrow enough to support. A golden path your team can't operate at 3am isn't golden, it's a liability with good branding.",
          "It's discoverable. If developers can't find the golden path, they'll build their own — and now you have two standards.",
          "It evolves. A golden path frozen in 2023 becomes exactly the kind of technical debt self-service was supposed to prevent.",
        ],
      },
      {
        type: "paragraph",
        text: "The uncomfortable part of building golden paths is admitting that not every request should be self-service. Some infrastructure shapes are genuinely novel, or genuinely risky, and deserve a human in the loop. A good self-service system doesn't pretend otherwise — it routes the 80% of requests that match an approved pattern through instant provisioning, and routes the remaining 20% to a real review, without making either path feel like a punishment.",
      },
      {
        type: "paragraph",
        text: "Done well, this changes the platform team's job description. Instead of being a queue that processes tickets, the team becomes the author of the patterns everyone else builds on — which is a far better use of a platform engineer's time than clicking through a cloud console for the fortieth time this month.",
      },
    ],
  },
  {
    slug: "slos-without-the-spreadsheet",
    title: "SLOs without the spreadsheet: measuring what matters",
    excerpt:
      "An SLO that lives in a slide deck instead of your alerting pipeline isn't a reliability practice. It's a New Year's resolution.",
    category: "Observability",
    author: "Priyanka Reddy",
    authorRole: "Senior SRE, Nexora Systems",
    date: "2025-11-09",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Most teams that say they have SLOs actually have a target latency number written in a wiki page nobody has opened since the quarter it was created. That's not a criticism — defining a meaningful service-level objective is genuinely hard, and connecting it to a system that can act on it in real time is harder still. But the gap between 'we have an SLO' and 'our SLO changes what we do on a Tuesday afternoon' is where most of the value lives.",
      },
      {
        type: "heading",
        text: "Start with the error budget, not the target",
      },
      {
        type: "paragraph",
        text: "A target like '99.9% availability' is easy to state and almost useless on its own. What makes it actionable is the error budget it implies — in this case, about 43 minutes of downtime per month — and a policy for what happens when that budget is spent. Without the budget and the policy, the target is just a number teams quote in postmortems and otherwise ignore.",
      },
      {
        type: "paragraph",
        text: "The teams that get real value from SLOs treat the error budget as a shared resource the whole team manages actively, not a lagging indicator reviewed after the fact. When the budget is healthy, ship faster and take more risk. When it's nearly exhausted, the default shifts toward stability work — and that shift should be visible and automatic, not something that requires a meeting to decide.",
      },
      {
        type: "heading",
        text: "Make burn rate visible where the work happens",
      },
      {
        type: "paragraph",
        text: "An SLO dashboard nobody looks at doesn't change behavior. The signal needs to show up where engineers are already working — in the deploy pipeline, in the on-call tool, in the same channel where incidents get discussed. A fast error budget burn should be exactly as visible, and exactly as actionable, as a failing test.",
      },
      {
        type: "paragraph",
        text: "None of this requires exotic tooling. It requires treating the SLO as an operational input rather than a reporting artifact — something the system checks continuously, not something a human remembers to check before a quarterly review.",
      },
    ],
  },
];
