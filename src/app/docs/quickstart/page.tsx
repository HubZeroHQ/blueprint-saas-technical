import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Reveal } from "@/components/ui/Reveal";
import { routes } from "@/config/routes";
import { createMetadata } from "@/seo/createMetadata";
import { breadcrumbSchema } from "@/seo/structuredData";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = createMetadata({
  title: "Quickstart",
  description:
    "Install the Nexora CLI, authenticate, define your first environment manifest, and provision it — start to finish in under five minutes.",
  canonical: routes.docsQuickstart,
});

const STEPS = [
  {
    title: "Install the CLI",
    description: "Install the Nexora CLI and confirm it's on your path.",
    code: `curl -fsSL https://cli.nexorasystems.com/install | sh
nexora --version`,
    filename: "terminal",
  },
  {
    title: "Authenticate",
    description: "Log in with your Nexora account. This opens a browser window to complete SSO if your organization requires it.",
    code: `nexora login`,
    filename: "terminal",
  },
  {
    title: "Define your first environment",
    description: "Create a manifest describing the environment you want to provision.",
    code: `# environment.yaml
name: staging
provider: aws
region: us-east-1

compute:
  service: web
  instances: 1
  cpu: 1
  memory: 2Gi`,
    filename: "environment.yaml",
  },
  {
    title: "Review the plan",
    description: "Nexora computes a diff against live infrastructure and checks it against policy before anything changes.",
    code: `nexora plan environment.yaml`,
    filename: "terminal",
  },
  {
    title: "Apply it",
    description: "Provision the environment. Nexora streams progress until every resource is healthy.",
    code: `nexora apply environment.yaml

✓ compute.web provisioned (1/1 instances healthy)
✓ environment "staging" is live`,
    filename: "terminal",
  },
];

export default function QuickstartPage() {
  return (
    <Page>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Documentation", path: routes.docs },
          { name: "Quickstart", path: routes.docsQuickstart },
        ])}
      />

      <PageHeader
        eyebrow="Documentation / Quickstart"
        title="From zero to a running environment in five steps"
        description="This walkthrough installs the CLI, authenticates your account, and provisions a real environment from a manifest."
      />

      <Section>
        <Container className="mx-auto max-w-3xl">
          <ol className="flex flex-col gap-12">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} as="li" className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-technical bg-accent-muted font-mono text-sm text-accent">
                    {index + 1}
                  </span>
                  <h2 className="text-lg font-semibold text-fg">{step.title}</h2>
                </div>
                <p className="pl-11 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                <div className="pl-11">
                  <CodeBlock code={step.code} filename={step.filename} />
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-16 flex flex-col gap-3 rounded-technical border border-border bg-bg-subtle p-6">
            <h2 className="text-sm font-semibold text-fg">Next steps</h2>
            <p className="text-sm leading-relaxed text-fg-muted">
              Explore the{" "}
              <Link href={routes.api} className="text-accent underline-offset-4 hover:underline">
                API reference
              </Link>{" "}
              to integrate provisioning into your own tooling, or review{" "}
              <Link
                href={routes.security}
                className="text-accent underline-offset-4 hover:underline"
              >
                how Nexora secures
              </Link>{" "}
              the environments you provision.
            </p>
          </div>
        </Container>
      </Section>
    </Page>
  );
}
