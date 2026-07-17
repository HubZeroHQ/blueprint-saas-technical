import type { Metadata } from "next";

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
import { benefits, openRoles } from "@/data/careers";
import { createMetadata } from "@/seo/createMetadata";
import { EASE_FAST } from "@/utils/motion";

export const metadata: Metadata = createMetadata({
  title: "Careers",
  description:
    "Open roles at Nexora Systems. We're a remote-first team building the control plane platform teams use to run infrastructure.",
  canonical: routes.careers,
});

export default function CareersPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Careers"
        title="Build the platform you always wished you had"
        description="We're a small, remote-first team solving a problem every one of us has felt firsthand. If that sounds like your kind of problem, we'd like to meet you."
      />

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Benefits" title="How we support the team" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} index={index} step={60}>
                <Card interactive className="flex h-full flex-col gap-2">
                  <h3 className="text-sm font-semibold text-fg">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{benefit.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          <div className="overflow-hidden rounded-technical border border-border">
            {openRoles.map((role) => (
              <a
                key={role.title}
                href={`mailto:${company.contact.email}?subject=${encodeURIComponent(
                  `Application: ${role.title}`
                )}`}
                className={`flex flex-col gap-1 border-b border-border bg-surface px-6 py-5 transition-colors ${EASE_FAST} last:border-b-0 hover:bg-surface-hover sm:flex-row sm:items-center sm:justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-fg">{role.title}</span>
                  <span className="font-mono text-xs text-fg-subtle">{role.department}</span>
                </div>
                <span className="text-sm text-fg-muted">{role.location}</span>
              </a>
            ))}
          </div>
          <p className="text-sm text-fg-muted">
            Don&rsquo;t see a role that fits? Email us at{" "}
            <a
              href={`mailto:${company.contact.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {company.contact.email}
            </a>{" "}
            — we&rsquo;re always open to meeting people who care about this problem.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection
            title="See how Nexora runs in production"
            description="Before you apply, see what we're building. Explore the product or read how our customers use it."
          />
        </Container>
      </Section>
    </Page>
  );
}
