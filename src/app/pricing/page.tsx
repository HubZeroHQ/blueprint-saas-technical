import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { PageHeader } from "@/components/marketing/PageHeader";
import { PricingTable } from "@/components/marketing/PricingTable";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { routes } from "@/config/routes";
import { comparisonSections, pricingPlans } from "@/data/pricing";
import { pricingFaq } from "@/data/faq";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Nexora Systems pricing: start free, scale with Growth, or negotiate an Enterprise plan with SSO, dedicated support, and a custom SLA.",
  canonical: routes.pricing,
});

export default function PricingPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Pricing"
        title="Plans that scale from your first environment to your thousandth"
        description="Start free. Upgrade when you need SLO tracking and policy guardrails. Move to Enterprise when you need SSO, a dedicated engineer, and a custom SLA."
      />

      <Section>
        <Container>
          <PricingTable plans={pricingPlans} />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Compare" title="Every plan, capability by capability" />
          <ComparisonTable sections={comparisonSections} />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeading eyebrow="FAQ" title="Pricing questions" align="center" />
          <FAQSection items={pricingFaq} />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection
            title="Need a custom Enterprise plan?"
            description="Talk to us about SSO, dedicated infrastructure, and a custom SLA for your organization."
          />
        </Container>
      </Section>
    </Page>
  );
}
