import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { ArchitectureDiagram } from "@/components/marketing/ArchitectureDiagram";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { Terminal } from "@/components/ui/Terminal";
import { routes } from "@/config/routes";
import { features } from "@/data/features";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "Product",
  description:
    "See how Nexora's control plane provisions, observes, and governs infrastructure from one declarative manifest across every cloud you run.",
  canonical: routes.product,
});

const MANIFEST = `# environment.yaml
name: production-us-east
provider: aws
region: us-east-1

compute:
  service: checkout-api
  instances: 3
  cpu: 2
  memory: 4Gi

network:
  vpc: shared-prod
  ingress: public

policy:
  require_approval: true
  max_monthly_cost: 4000`;

const POLICY = `# guardrails/storage.rego
package nexora.guardrails

deny[msg] {
  input.resource.type == "storage_bucket"
  input.resource.public_access == true
  msg := "Public storage buckets require security sign-off"
}

deny[msg] {
  input.resource.monthly_cost > input.policy.max_monthly_cost
  msg := "Resource exceeds environment budget"
}`;

const STEPS = [
  {
    title: "Define the environment",
    description:
      "Describe compute, networking, and policy once as a declarative manifest — no provider-specific syntax to learn per cloud.",
  },
  {
    title: "Review the plan",
    description:
      "Nexora computes a diff against live infrastructure and flags anything that violates policy before it's applied.",
  },
  {
    title: "Provision automatically",
    description:
      "Approved plans apply through Nexora's provisioning engine, translated into the correct primitives for the target cloud.",
  },
  {
    title: "Observe and govern continuously",
    description:
      "Telemetry, drift detection, and audit logging run for the life of the environment — not just at creation time.",
  },
];

export default function ProductPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Product"
        title="The control plane for infrastructure, end to end"
        description="Nexora replaces a patchwork of provisioning scripts, dashboards, and access spreadsheets with one declarative system that provisions, observes, and governs infrastructure across every cloud you run."
      />

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="How it works"
            title="From manifest to governed infrastructure in four steps"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <Reveal className="h-full">
                <Card interactive className="flex h-full flex-col gap-3">
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold text-fg">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{step.description}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="The system"
            title="Three engines, one control plane"
            description="Explore how provisioning, observability, and governance work together underneath a single manifest."
          />

          <Tabs
            items={[
              {
                id: "provisioning",
                label: "Provisioning",
                content: (
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    <p className="text-sm leading-relaxed text-fg-muted">
                      Every environment starts as a manifest, not a runbook. Nexora&rsquo;s
                      provisioning engine reads it once and generates the correct AWS,
                      GCP, or Azure primitives — so the same file provisions identically
                      regardless of which cloud it targets.
                    </p>
                    <CodeBlock code={MANIFEST} filename="environment.yaml" />
                  </div>
                ),
              },
              {
                id: "observability",
                label: "Observability",
                content: (
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    <p className="text-sm leading-relaxed text-fg-muted">
                      Metrics, logs, and traces from every environment stream into one
                      queryable pane. SLOs are tracked against real error budgets, and
                      every alert is correlated with the deploy or config change that
                      caused it.
                    </p>
                    <Terminal
                      title="nexora — observe"
                      lines={[
                        { text: "nexora observe checkout-api --window 15m", type: "command" },
                        { text: "p50 latency  42ms   p99 latency  118ms", type: "output" },
                        { text: "error rate   0.02%  error budget  94% remaining", type: "output" },
                        { text: "✓ within SLO — no action required", type: "success" },
                      ]}
                    />
                  </div>
                ),
              },
              {
                id: "governance",
                label: "Governance",
                content: (
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    <p className="text-sm leading-relaxed text-fg-muted">
                      Policy is written as code and enforced at plan time, not discovered
                      after the fact. Every grant is scoped and time-boxed, and every
                      action is written to an audit log you can export to your SIEM.
                    </p>
                    <CodeBlock code={POLICY} filename="guardrails/storage.rego" />
                  </div>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Architecture"
            title="One manifest, every cloud"
            align="center"
          />
          <ArchitectureDiagram />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything the platform includes"
            />
            <Button href={routes.features} variant="secondary">
              View all features
            </Button>
          </div>
          <FeatureGrid features={features.slice(0, 6)} />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection />
        </Container>
      </Section>
    </Page>
  );
}
