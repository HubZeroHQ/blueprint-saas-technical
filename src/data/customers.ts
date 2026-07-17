export interface CustomerMetric {
  label: string;
  value: string;
}

export interface CustomerCaseStudy {
  slug: string;
  name: string;
  industry: string;
  headline: string;
  summary: string;
  metrics: CustomerMetric[];
  challenge: string;
  solution: string;
  result: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
}

export interface Customer {
  name: string;
  industry: string;
}

/** Companies shown in the logo strip. The first two also have full case studies below. */
export const customers: Customer[] = [
  { name: "Meridian Freight", industry: "Logistics" },
  { name: "Lumen Analytics", industry: "Data & Analytics" },
  { name: "Ridgeline Bank", industry: "Financial Services" },
  { name: "Northfield Health", industry: "Healthcare" },
  { name: "Voltage Robotics", industry: "Robotics" },
  { name: "Cascade Media", industry: "Media & Streaming" },
];

export const caseStudies: CustomerCaseStudy[] = [
  {
    slug: "meridian-freight",
    name: "Meridian Freight",
    industry: "Logistics",
    headline: "Meridian Freight cut environment provisioning from three weeks to forty minutes",
    summary:
      "Meridian Freight's platform team replaced a patchwork of manual runbooks with Nexora's golden path templates, taking new environment provisioning from a multi-week ticket queue to a self-service workflow.",
    metrics: [
      { label: "Provisioning time", value: "3 weeks → 40 min" },
      { label: "Cloud spend", value: "−23%" },
      { label: "Config-drift incidents", value: "−91%" },
    ],
    challenge:
      "Meridian's route-optimization platform runs across 14 regional environments, each provisioned by hand by a three-person infrastructure team. Every new region took an average of three weeks of ticket back-and-forth between application engineers and infrastructure, and no two environments ended up configured quite the same way.",
    solution:
      "Meridian's platform team modeled their standard environment as a Nexora golden path template, encoding networking, IAM boundaries, and observability defaults once. Application teams now request a new environment through Nexora's self-service catalog; provisioning runs against the same template every time, with policy guardrails blocking any configuration that falls outside platform standards.",
    result:
      "New regional environments now provision in under 40 minutes, with zero manual infrastructure tickets. Drift detection caught 12 unauthorized changes in the first quarter alone — each remediated automatically before it reached production traffic.",
    quote:
      "We stopped being a ticket queue and started being a platform. Application teams self-serve the exact environment shape we've already approved, every time.",
    quoteAuthor: "Priya Nair",
    quoteRole: "Director of Platform Engineering, Meridian Freight",
  },
  {
    slug: "lumen-analytics",
    name: "Lumen Analytics",
    industry: "Data & Analytics",
    headline: "How Lumen Analytics standardized 40 microservices on one control plane",
    summary:
      "Lumen Analytics consolidated infrastructure ownership for 40 microservices spread across three clouds onto Nexora, replacing service-specific Terraform state with one governed, observable system.",
    metrics: [
      { label: "Microservices unified", value: "40" },
      { label: "Mean time to detect drift", value: "9 days → 4 min" },
      { label: "On-call pages from infra", value: "−67%" },
    ],
    challenge:
      "Each of Lumen's 40 microservices owned its own Terraform state and CI pipeline, maintained independently by whichever team wrote it first. When a networking change was needed across services, it meant 40 separate pull requests with no consistent review process, and no single view of what was actually running.",
    solution:
      "Lumen imported existing Terraform state into Nexora without a rewrite, then layered unified telemetry and policy guardrails on top. Cross-cutting changes — a new compliance requirement, a shared logging standard — now roll out through one workflow instead of 40 uncoordinated ones.",
    result:
      "Drift that used to surface as a production incident nine days later is now caught in under four minutes. Infrastructure-related on-call pages dropped by two-thirds in the first two months after rollout.",
    quote:
      "Nexora didn't ask us to rewrite four years of Terraform to get value. It gave us one place to see all of it, and guardrails so the next four years don't fragment the same way.",
    quoteAuthor: "Marcus Webb",
    quoteRole: "VP of Engineering, Lumen Analytics",
  },
];
