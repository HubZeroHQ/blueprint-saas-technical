import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/marketing/CTASection";
import { IntegrationGrid } from "@/components/marketing/IntegrationGrid";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { routes } from "@/config/routes";
import { integrationCategories, integrations } from "@/data/integrations";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "Integrations",
  description:
    "Nexora connects to the cloud providers, CI/CD systems, infrastructure-as-code tools, observability stacks, and ChatOps platforms your team already runs.",
  canonical: routes.integrations,
});

export default function IntegrationsPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Integrations"
        title="Works with the tools already in your stack"
        description="Nexora doesn't ask you to replace your existing tooling. It connects to it — so provisioning, CI/CD, and observability stay coordinated instead of siloed."
      />

      <Section>
        <Container>
          <Tabs
            items={integrationCategories.map((category) => ({
              id: category,
              label: category,
              content: (
                <IntegrationGrid
                  integrations={integrations.filter((i) => i.category === category)}
                />
              ),
            }))}
          />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection
            title="Don't see the tool you use?"
            description="Nexora's API and webhook system make it straightforward to build a custom integration. Talk to us about your stack."
          />
        </Container>
      </Section>
    </Page>
  );
}
