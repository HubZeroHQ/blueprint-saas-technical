import type { IconKey } from "@/components/icons";

export interface Feature {
  id: string;
  title: string;
  description: string;
  category: "Provisioning" | "Observability" | "Access & Governance" | "Automation";
  icon: IconKey;
}

export const features: Feature[] = [
  {
    id: "environments",
    title: "Declarative environments",
    description:
      "Define an environment once in a manifest — compute, networking, storage, and secrets provision identically across AWS, GCP, and Azure.",
    category: "Provisioning",
    icon: "server",
  },
  {
    id: "golden-paths",
    title: "Golden path templates",
    description:
      "Ship a curated set of pre-approved service templates so teams provision infrastructure that already matches platform standards.",
    category: "Provisioning",
    icon: "layers",
  },
  {
    id: "drift-detection",
    title: "Drift detection",
    description:
      "Nexora continuously diffs live infrastructure against its source of truth and opens a remediation plan the moment they diverge.",
    category: "Provisioning",
    icon: "branch",
  },
  {
    id: "unified-telemetry",
    title: "Unified telemetry",
    description:
      "Metrics, logs, and traces from every environment stream into one queryable pane — no separate agent per cloud to maintain.",
    category: "Observability",
    icon: "chart",
  },
  {
    id: "slo-tracking",
    title: "SLO tracking",
    description:
      "Define service-level objectives once and Nexora tracks error budgets in real time, alerting before a budget is exhausted.",
    category: "Observability",
    icon: "clock",
  },
  {
    id: "incident-timeline",
    title: "Incident timelines",
    description:
      "Every deploy, config change, and alert is correlated on one timeline, so root cause analysis starts from evidence, not guesswork.",
    category: "Observability",
    icon: "globe",
  },
  {
    id: "rbac",
    title: "Fine-grained access control",
    description:
      "Scope permissions down to a single resource, environment, or action. Every grant is time-boxed and reviewable.",
    category: "Access & Governance",
    icon: "lock",
  },
  {
    id: "audit-log",
    title: "Immutable audit log",
    description:
      "Every API call, console action, and policy change is recorded to an append-only log exportable to your SIEM.",
    category: "Access & Governance",
    icon: "shield",
  },
  {
    id: "policy-guardrails",
    title: "Policy guardrails",
    description:
      "Write infrastructure policy as code. Nexora blocks non-compliant changes at plan time, before they ever reach production.",
    category: "Access & Governance",
    icon: "code",
  },
  {
    id: "workflows",
    title: "Automated workflows",
    description:
      "Chain provisioning, approval, and rollout steps into a single workflow triggered by a pull request or a schedule.",
    category: "Automation",
    icon: "bolt",
  },
  {
    id: "self-service",
    title: "Self-service provisioning",
    description:
      "Developers request infrastructure through a catalog you define. Nexora enforces approvals and budget limits automatically.",
    category: "Automation",
    icon: "plug",
  },
  {
    id: "cost-automation",
    title: "Cost automation",
    description:
      "Idle resources are flagged and reclaimed automatically based on rules your platform team sets, not manual spreadsheet audits.",
    category: "Automation",
    icon: "chart",
  },
];

export const featureCategories = [
  "Provisioning",
  "Observability",
  "Access & Governance",
  "Automation",
] as const;
