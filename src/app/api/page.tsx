import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { routes } from "@/config/routes";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "API Reference",
  description:
    "Authenticate and call the Nexora REST API directly: provision environments, query status, and manage policy programmatically.",
  canonical: routes.api,
});

const AUTH_SNIPPET = `curl https://api.nexorasystems.com/v1/environments \\
  -H "Authorization: Bearer $NEXORA_API_KEY"`;

const RESPONSE_SNIPPET = `{
  "data": [
    {
      "id": "env_8f2a1c",
      "name": "production-us-east",
      "provider": "aws",
      "status": "healthy",
      "created_at": "2026-02-11T09:32:00Z"
    }
  ],
  "has_more": false
}`;

const ENDPOINTS = [
  { method: "GET", path: "/v1/environments", description: "List every environment in your account." },
  { method: "POST", path: "/v1/environments", description: "Create an environment from a manifest." },
  { method: "GET", path: "/v1/environments/{id}", description: "Retrieve status, resources, and telemetry for one environment." },
  { method: "DELETE", path: "/v1/environments/{id}", description: "Tear down an environment and its resources." },
  { method: "POST", path: "/v1/policies", description: "Register a policy guardrail to enforce at plan time." },
  { method: "GET", path: "/v1/audit-log", description: "Stream audit log entries, filterable by resource or actor." },
];

const RATE_LIMITS = [
  { plan: "Starter", limit: "60 requests / minute" },
  { plan: "Growth", limit: "600 requests / minute" },
  { plan: "Enterprise", limit: "Custom, negotiated per contract" },
];

const METHOD_TONE: Record<string, "accent" | "success" | "danger"> = {
  GET: "accent",
  POST: "success",
  DELETE: "danger",
};

export default function ApiPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="API Reference"
        title="Everything the CLI does, available over REST"
        description="The Nexora API backs every CLI command and SDK call. Use it to integrate provisioning, observability, and policy directly into your own tooling."
      />

      <Section>
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Authentication" title="Bearer token authentication" />
            <p className="text-sm leading-relaxed text-fg-muted">
              Generate an API key from your account settings and pass it as a bearer token on
              every request. Keys are scoped to an environment set and can be revoked
              instantly.
            </p>
          </div>
          <CodeBlock code={AUTH_SNIPPET} filename="terminal" />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Endpoints" title="Core resources" />
          <div className="overflow-hidden rounded-technical border border-border">
            {ENDPOINTS.map((endpoint) => (
              <div
                key={endpoint.method + endpoint.path}
                className="flex flex-col gap-2 border-b border-border bg-surface px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:w-72 sm:shrink-0">
                  <Badge tone={METHOD_TONE[endpoint.method] ?? "neutral"} className="w-16 justify-center">
                    {endpoint.method}
                  </Badge>
                  <code className="font-mono text-sm text-fg">{endpoint.path}</code>
                </div>
                <p className="text-sm text-fg-muted">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Example" title="List environments" />
            <p className="text-sm leading-relaxed text-fg-muted">
              Every response is paginated JSON with a consistent envelope, regardless of
              which resource you&rsquo;re querying.
            </p>
          </div>
          <CodeBlock code={RESPONSE_SNIPPET} filename="200 OK" />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Rate limits" title="Requests per plan" />
          <div className="grid gap-4 sm:grid-cols-3">
            {RATE_LIMITS.map((tier) => (
              <div
                key={tier.plan}
                className="flex flex-col gap-2 rounded-technical border border-border bg-surface p-5"
              >
                <span className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
                  {tier.plan}
                </span>
                <span className="text-sm text-fg">{tier.limit}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection
            title="Ready to generate an API key?"
            description="Start on the free plan to get an API key immediately, or talk to us about Enterprise rate limits."
          />
        </Container>
      </Section>
    </Page>
  );
}
