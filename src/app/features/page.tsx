import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { routes } from "@/config/routes";
import { featureCategories, features } from "@/data/features";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description:
    "Provisioning, observability, access control, and automation — every capability Nexora's control plane includes, organized by category.",
  canonical: routes.features,
});

export default function FeaturesPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Features"
        title="Every capability platform teams need, in one system"
        description="Nexora replaces a provisioning tool, an observability stack, and an access spreadsheet with a single governed control plane. Browse by category below."
      />

      <Section>
        <Container>
          <Tabs
            items={featureCategories.map((category) => ({
              id: category,
              label: category,
              content: (
                <FeatureGrid features={features.filter((f) => f.category === category)} />
              ),
            }))}
          />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <CTASection />
        </Container>
      </Section>
    </Page>
  );
}
