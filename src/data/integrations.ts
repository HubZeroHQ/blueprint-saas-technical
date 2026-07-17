export interface Integration {
  name: string;
  category: "Cloud providers" | "CI/CD" | "Infrastructure as code" | "Observability" | "ChatOps & incident";
  description: string;
}

export const integrations: Integration[] = [
  { name: "AWS", category: "Cloud providers", description: "Provision and govern EC2, EKS, RDS, and IAM resources." },
  { name: "Google Cloud", category: "Cloud providers", description: "Manage GKE, Cloud Run, and Compute Engine environments." },
  { name: "Microsoft Azure", category: "Cloud providers", description: "Provision AKS, App Service, and Azure networking." },
  { name: "Terraform", category: "Infrastructure as code", description: "Import existing state or let Nexora generate modules for you." },
  { name: "Pulumi", category: "Infrastructure as code", description: "Author environments in TypeScript, Go, or Python." },
  { name: "Kubernetes", category: "Infrastructure as code", description: "Manage cluster lifecycle and workload policy natively." },
  { name: "GitHub Actions", category: "CI/CD", description: "Trigger provisioning workflows directly from pull requests." },
  { name: "GitLab CI", category: "CI/CD", description: "Gate deploys on Nexora policy checks before they run." },
  { name: "CircleCI", category: "CI/CD", description: "Provision ephemeral preview environments per branch." },
  { name: "Datadog", category: "Observability", description: "Forward unified telemetry into existing Datadog dashboards." },
  { name: "Grafana", category: "Observability", description: "Query Nexora metrics directly from your existing Grafana stack." },
  { name: "PagerDuty", category: "Observability", description: "Route SLO breaches and drift alerts to on-call rotations." },
  { name: "Slack", category: "ChatOps & incident", description: "Approve provisioning requests and receive alerts in-channel." },
  { name: "Microsoft Teams", category: "ChatOps & incident", description: "Mirror approvals and incident timelines into Teams channels." },
  { name: "Jira", category: "ChatOps & incident", description: "Open remediation tickets automatically when drift is detected." },
];

export const integrationCategories = [
  "Cloud providers",
  "Infrastructure as code",
  "CI/CD",
  "Observability",
  "ChatOps & incident",
] as const;
