export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams provisioning their first shared environments.",
    price: "$0",
    priceSuffix: "/month",
    cta: "Start free",
    href: "/contact",
    features: [
      "Up to 3 environments",
      "1 cloud provider",
      "Community support",
      "7-day audit log retention",
      "Standard RBAC roles",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "For platform teams running production workloads across clouds.",
    price: "$490",
    priceSuffix: "/month",
    cta: "Start free trial",
    href: "/contact",
    highlighted: true,
    features: [
      "Unlimited environments",
      "Up to 3 cloud providers",
      "SLO tracking & alerting",
      "90-day audit log retention",
      "Custom RBAC roles",
      "Policy guardrails",
      "Priority support, 4-hour response",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations with dedicated compliance and reliability requirements.",
    price: "Custom",
    cta: "Contact sales",
    href: "/contact",
    features: [
      "Everything in Growth",
      "Unlimited cloud providers",
      "Single sign-on & SCIM",
      "1-year audit log retention",
      "Dedicated success engineer",
      "Custom SLA & uptime guarantee",
      "Private VPC deployment option",
    ],
  },
];

export interface ComparisonRow {
  label: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
}

export interface ComparisonSection {
  title: string;
  rows: ComparisonRow[];
}

export const comparisonSections: ComparisonSection[] = [
  {
    title: "Provisioning",
    rows: [
      { label: "Environments", starter: "3", growth: "Unlimited", enterprise: "Unlimited" },
      { label: "Cloud providers", starter: "1", growth: "3", enterprise: "Unlimited" },
      { label: "Golden path templates", starter: false, growth: true, enterprise: true },
      { label: "Drift detection", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    title: "Observability",
    rows: [
      { label: "Unified telemetry", starter: true, growth: true, enterprise: true },
      { label: "SLO tracking", starter: false, growth: true, enterprise: true },
      { label: "Custom dashboards", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    title: "Access & governance",
    rows: [
      { label: "RBAC", starter: "Standard roles", growth: "Custom roles", enterprise: "Custom roles" },
      { label: "Audit log retention", starter: "7 days", growth: "90 days", enterprise: "1 year" },
      { label: "Single sign-on (SSO)", starter: false, growth: false, enterprise: true },
      { label: "Policy guardrails", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Support channel", starter: "Community", growth: "Priority, 4h response", enterprise: "Dedicated engineer" },
      { label: "Uptime SLA", starter: false, growth: false, enterprise: true },
    ],
  },
];
