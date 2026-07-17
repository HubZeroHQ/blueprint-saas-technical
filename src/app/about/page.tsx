import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { StatsRow } from "@/components/marketing/StatsRow";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { company } from "@/config/company";
import { routes } from "@/config/routes";
import { team } from "@/data/team";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Nexora Systems builds the control plane platform teams use to provision, observe, and govern infrastructure. Here's our story, mission, and team.",
  canonical: routes.about,
});

const STATS = [
  { value: company.founded, label: "Founded" },
  { value: company.headquarters, label: "Headquarters" },
  { value: company.companySize, label: "Team size" },
  { value: "180+", label: "Engineering teams served" },
];

export default function AboutPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Company"
        title="Infrastructure should be leverage, not toil"
        description="Nexora Systems builds the control plane platform teams use to provision, observe, and govern infrastructure across every cloud they run."
      />

      <Section>
        <Container className="flex flex-col gap-10">
          <p className="mx-auto max-w-3xl text-2xl font-medium leading-snug tracking-tight text-fg">
            {company.mission}
          </p>
          <StatsRow stats={STATS} />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="What we believe" title="The values that shape how we build" />
          <div className="grid gap-4 sm:grid-cols-2">
            {company.values.map((value) => (
              <div
                key={value.name}
                className="flex flex-col gap-3 rounded-technical border border-border bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-fg">{value.name}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Team" title="The people building Nexora" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-4 rounded-technical border border-border bg-surface p-6"
              >
                <Avatar name={member.name} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-fg">{member.name}</h3>
                  <p className="font-mono text-xs text-accent">{member.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-technical border border-border bg-surface p-8 lg:flex-row lg:items-center lg:p-12">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-fg">We&rsquo;re hiring</h2>
              <p className="text-sm leading-relaxed text-fg-muted lg:max-w-lg">
                We&rsquo;re a small team solving a problem every platform engineer has felt firsthand. Come build it with us.
              </p>
            </div>
            <Button href={routes.careers} size="lg" className="shrink-0">
              View open roles
            </Button>
          </div>
        </Container>
      </Section>
    </Page>
  );
}
