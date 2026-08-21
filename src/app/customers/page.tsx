import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { routes } from "@/config/routes";
import { caseStudies, customers } from "@/data/customers";
import { createMetadata } from "@/seo/createMetadata";
import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

export const metadata: Metadata = createMetadata({
  title: "Customers",
  description:
    "How infrastructure and platform teams at Meridian Freight, Lumen Analytics, Ridgeline Bank, and more run on Nexora Systems.",
  canonical: routes.customers,
});

export default function CustomersPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Customers"
        title="Trusted by teams running regulated, multi-cloud infrastructure"
        description="From logistics to financial services, platform teams use Nexora to provision, observe, and govern infrastructure they can't afford to get wrong."
      />

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Case studies" title="Read how teams run on Nexora" />
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <Reveal key={study.slug}>
                <Link
                  href={routes.customerDetail(study.slug)}
                  className={cn(
                    "group flex h-full flex-col gap-6 rounded-technical border border-border bg-surface p-8 transition-[color,background-color,border-color,box-shadow,transform]",
                    EASE_FAST,
                    "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover hover:shadow-elevated"
                  )}
                >
                  <Badge tone="accent" className="w-fit">
                    {study.industry}
                  </Badge>
                  <h3 className="text-xl font-semibold text-fg">{study.headline}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{study.summary}</p>
                  <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                    Read the full story
                    <ArrowRightIcon className={`h-4 w-4 transition-transform ${EASE_FAST} group-hover:translate-x-1`} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Trusted by" title="Teams running on Nexora" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer) => (
              <Reveal key={customer.name}>
                <Card interactive className="flex h-full flex-col gap-1.5">
                  <span className="font-mono text-base text-fg">{customer.name}</span>
                  <span className="text-xs text-fg-subtle">{customer.industry}</span>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </Page>
  );
}
