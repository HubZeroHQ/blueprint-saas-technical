import type { Metadata } from "next";

import { LockIcon, ShieldIcon, ServerIcon, BookIcon } from "@/components/icons";
import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/config/company";
import { routes } from "@/config/routes";
import { createMetadata } from "@/seo/createMetadata";
import { EASE_FAST } from "@/utils/motion";

export const metadata: Metadata = createMetadata({
  title: "Security",
  description:
    "How Nexora Systems secures customer infrastructure and data: encryption, access control, audit logging, network isolation, and our compliance program.",
  canonical: routes.security,
});

const PILLARS = [
  {
    icon: LockIcon,
    title: "Encryption everywhere",
    description:
      "All data is encrypted in transit with TLS 1.2+ and at rest with AES-256. Encryption keys are managed per customer and rotated automatically.",
  },
  {
    icon: ShieldIcon,
    title: "Fine-grained access control",
    description:
      "Every credential Nexora issues is scoped to a specific resource, environment, or action, and expires automatically. No standing admin access, by default.",
  },
  {
    icon: BookIcon,
    title: "Immutable audit logging",
    description:
      "Every API call, console action, and policy change is written to an append-only log, exportable to your SIEM in real time.",
  },
  {
    icon: ServerIcon,
    title: "Network isolation",
    description:
      "Customer control planes run in isolated network boundaries. Enterprise plans support deployment into a dedicated, private VPC.",
  },
];

const CERTIFICATIONS = [
  {
    name: "SOC 2 Type II",
    description: "Annual third-party audit covering security, availability, and confidentiality.",
  },
  {
    name: "ISO 27001",
    description: "Certified information security management system across our infrastructure.",
  },
  {
    name: "GDPR",
    description: "Data processing agreements and regional data residency available on request.",
  },
  {
    name: "HIPAA-ready",
    description: "Business associate agreements available for customers in regulated healthcare environments.",
  },
];

export default function SecurityPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Security"
        title="Security isn't a plan tier. It's the default."
        description="Nexora is trusted with infrastructure credentials for regulated financial services and healthcare companies. Here's how we protect them."
      />

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Practices" title="How Nexora protects your infrastructure" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <Reveal key={pillar.title}>
                <Card interactive className="flex h-full flex-col gap-4">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-technical bg-accent-muted text-accent transition-colors ${EASE_FAST} group-hover:bg-accent group-hover:text-accent-fg`}
                  >
                    <pillar.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-sm font-semibold text-fg">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{pillar.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Compliance" title="Certifications and compliance program" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((cert) => (
              <Reveal key={cert.name}>
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-wide text-accent">
                    {cert.name}
                  </span>
                  <p className="text-sm leading-relaxed text-fg-muted">{cert.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-4 rounded-technical border border-border bg-surface p-8 lg:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">
            Found a vulnerability?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
            We run a responsible disclosure program and take every report seriously. Email{" "}
            <a
              href={`mailto:${company.contact.support}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {company.contact.support}
            </a>{" "}
            with details and we&rsquo;ll respond within one business day.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection
            title="Request our security whitepaper"
            description="Get a detailed breakdown of our architecture, compliance program, and audit history for your vendor review."
          />
        </Container>
      </Section>
    </Page>
  );
}
