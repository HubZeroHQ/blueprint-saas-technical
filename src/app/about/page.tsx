import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { StatsRow } from "@/components/marketing/StatsRow";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/config/company";
import { routes } from "@/config/routes";
import { site } from "@/config/site";
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
  { value: company.companySize, label: "Employees" },
  { value: company.cloudEnvironments, label: "Cloud environments" },
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
          <Reveal>
            <p className="mx-auto max-w-3xl text-2xl font-medium leading-snug tracking-tight text-fg">
              {company.mission}
            </p>
          </Reveal>
          <StatsRow stats={STATS} />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="What we believe" title="The values that shape how we build" />
          <div className="grid gap-4 sm:grid-cols-2">
            {company.values.map((value) => (
              <Reveal key={value.name}>
                <Card interactive className="flex h-full flex-col gap-3">
                  <h3 className="text-base font-semibold text-fg">{value.name}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{value.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Team" title="The people building Nexora" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Reveal key={member.name}>
                <Card interactive className="flex h-full flex-col gap-4">
                  <Avatar name={member.name} />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-fg">{member.name}</h3>
                    <p className="font-mono text-xs text-accent">{member.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-fg-muted">{member.bio}</p>
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

      <Section className="border-t border-border">
        <Container className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-fg-muted">
            Nexora Systems doesn&rsquo;t exist. This site is a{" "}
            <a
              href={site.author.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent underline-offset-4 hover:underline"
            >
              HubZero Blueprint
            </a>{" "}
            — a fictional company built end to end, down to the team above and the customers
            in our case studies, to demonstrate what production-quality engineering, design,
            and accessibility look like when nothing is a placeholder.
          </p>
        </Container>
      </Section>
    </Page>
  );
}
