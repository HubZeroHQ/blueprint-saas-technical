import type { Metadata } from "next";

import { BookIcon, BoltIcon, CodeBracketsIcon, LockIcon } from "@/components/icons";
import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Reveal } from "@/components/ui/Reveal";
import { routes } from "@/config/routes";
import { createMetadata } from "@/seo/createMetadata";
import { EASE_FAST } from "@/utils/motion";

export const metadata: Metadata = createMetadata({
  title: "Documentation",
  description:
    "Guides for installing the Nexora CLI, defining your first environment, writing policy guardrails, and integrating the API.",
  canonical: routes.docs,
});

const INSTALL_SNIPPET = `curl -fsSL https://cli.nexora.hubzero.in/install | sh
nexora login
nexora init production-us-east`;

const CONCEPTS = [
  {
    icon: BoltIcon,
    title: "Environments",
    description:
      "A named, provisioned collection of infrastructure Nexora manages as a unit — for example, a staging environment or a regional production deployment.",
  },
  {
    icon: CodeBracketsIcon,
    title: "Manifests",
    description:
      "The declarative YAML file that defines an environment's compute, networking, and policy. The source of truth Nexora provisions against.",
  },
  {
    icon: LockIcon,
    title: "Policy guardrails",
    description:
      "Rules written as code that block non-compliant infrastructure changes at plan time, before they ever reach production.",
  },
  {
    icon: BookIcon,
    title: "Drift",
    description:
      "Any difference between a manifest and the live infrastructure it describes. Nexora detects and can auto-remediate drift continuously.",
  },
];

const SDKS = [
  { name: "CLI", install: "curl -fsSL https://cli.nexora.hubzero.in/install | sh" },
  { name: "TypeScript", install: "npm install @nexorasystems/sdk" },
  { name: "Go", install: "go get github.com/nexora-systems/nexora-go" },
  { name: "Python", install: "pip install nexora-sdk" },
];

export default function DocsPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Documentation"
        title="Everything you need to run Nexora"
        description="Install the CLI, define your first environment, and understand the concepts Nexora is built on."
      />

      <Section>
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Start here" title="Install and provision in under five minutes" />
            <p className="text-sm leading-relaxed text-fg-muted">
              The Nexora CLI authenticates against your account and provisions your first
              environment from a single manifest. The full walkthrough covers authentication,
              writing your manifest, and reviewing your first plan.
            </p>
            <Button href={routes.docsQuickstart} className="w-fit">
              Read the quickstart
            </Button>
          </div>
          <CodeBlock code={INSTALL_SNIPPET} filename="terminal" />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Core concepts" title="The vocabulary Nexora is built on" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONCEPTS.map((concept) => (
              <Reveal key={concept.title}>
                <Card interactive className="flex h-full flex-col gap-4">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-technical bg-accent-muted text-accent transition-colors ${EASE_FAST} group-hover:bg-accent group-hover:text-accent-fg`}
                  >
                    <concept.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-sm font-semibold text-fg">{concept.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{concept.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="SDKs & CLI" title="Client libraries for every language in your stack" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SDKS.map((sdk) => (
              <Reveal key={sdk.name}>
                <Card interactive className="flex h-full flex-col gap-3">
                  <h3 className="text-sm font-semibold text-fg">{sdk.name}</h3>
                  <code className="break-words font-mono text-xs leading-relaxed text-fg-muted">
                    {sdk.install}
                  </code>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-technical border border-border bg-surface p-8 lg:flex-row lg:items-center lg:p-12">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-fg">
                Ready to call the API directly?
              </h2>
              <p className="text-sm leading-relaxed text-fg-muted lg:max-w-lg">
                Every CLI and SDK action is backed by Nexora&rsquo;s REST API. Review authentication,
                endpoints, and rate limits.
              </p>
            </div>
            <Button href={routes.api} variant="secondary" size="lg" className="shrink-0">
              View API reference
            </Button>
          </div>
        </Container>
      </Section>
    </Page>
  );
}
