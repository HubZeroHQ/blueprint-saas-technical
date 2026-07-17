import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { ArchitectureDiagram } from "@/components/marketing/ArchitectureDiagram";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { Hero } from "@/components/marketing/Hero";
import { IntegrationGrid } from "@/components/marketing/IntegrationGrid";
import { LogoCloud } from "@/components/marketing/LogoCloud";
import { PricingTable } from "@/components/marketing/PricingTable";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { StatsRow } from "@/components/marketing/StatsRow";
import { TestimonialGrid } from "@/components/marketing/TestimonialGrid";
import { StructuredData } from "@/components/seo/StructuredData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChartIcon, LockIcon, ServerIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { features } from "@/data/features";
import { generalFaq } from "@/data/faq";
import { integrations } from "@/data/integrations";
import { pricingPlans } from "@/data/pricing";
import { testimonials } from "@/data/testimonials";
import {
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/seo/structuredData";

const HOME_FEATURES = features.slice(0, 6);
const HOME_INTEGRATIONS = integrations.slice(0, 6);
const HOME_TESTIMONIALS = testimonials.slice(0, 2);

const PILLARS = [
  {
    icon: ServerIcon,
    title: "Provision",
    description:
      "Define environments as declarative manifests. Nexora translates them into the right primitives for each cloud you run.",
  },
  {
    icon: ChartIcon,
    title: "Observe",
    description:
      "Metrics, logs, and traces from every environment in one pane, correlated with every deploy and config change.",
  },
  {
    icon: LockIcon,
    title: "Govern",
    description:
      "Policy guardrails, fine-grained access control, and an immutable audit log enforced automatically, not by hand.",
  },
];

const STATS = [
  { value: "180+", label: "Engineering teams" },
  { value: "40M+", label: "Resources governed" },
  { value: "99.99%", label: "Control plane uptime" },
  { value: "<4min", label: "Median drift detection" },
];

export default function HomePage() {
  return (
    <Page>
      <StructuredData data={organizationSchema()} />
      <StructuredData data={softwareApplicationSchema()} />
      <StructuredData data={websiteSchema()} />

      <Hero />
      <LogoCloud />

      <Section>
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Product overview"
            title="One control plane for the entire infrastructure lifecycle"
            description="Most teams stitch together a provisioning tool, an observability stack, and a spreadsheet of access policy. Nexora replaces the stitching with one system."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col gap-4 rounded-technical border border-border bg-surface p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-technical bg-accent-muted text-accent">
                  <pillar.icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="text-base font-semibold text-fg">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{pillar.description}</p>
              </div>
            ))}
          </div>

          <StatsRow stats={STATS} />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Features"
              title="Built for the way platform teams actually work"
              description="Provisioning, observability, access control, and automation — as one governed system instead of four disconnected tools."
            />
            <Button href={routes.features} variant="secondary">
              View all features
            </Button>
          </div>

          <FeatureGrid features={HOME_FEATURES} />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Platform"
            title="From manifest to running infrastructure, governed end to end"
            align="center"
          />
          <ArchitectureDiagram />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Integrations"
              title="Works with the tools already in your stack"
              description="Cloud providers, CI/CD, infrastructure-as-code, observability, and ChatOps — connected in minutes, not sprints."
            />
            <Button href={routes.integrations} variant="secondary">
              View all integrations
            </Button>
          </div>

          <IntegrationGrid integrations={HOME_INTEGRATIONS} />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-technical border border-border bg-surface p-8 lg:flex-row lg:items-center lg:p-12">
            <div className="flex flex-col gap-4">
              <Badge tone="accent">Security</Badge>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:max-w-lg">
                SOC 2 Type II, encrypted by default, audited on every action.
              </h2>
              <p className="text-sm leading-relaxed text-fg-muted lg:max-w-lg">
                Every credential is scoped and time-boxed. Every change is written to an
                immutable, exportable audit log. Security isn&rsquo;t a plan tier — it&rsquo;s the
                default.
              </p>
            </div>
            <Button href={routes.security} variant="secondary" size="lg" className="shrink-0">
              Review our security program
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Customers"
            title="Trusted by teams running regulated, multi-cloud infrastructure"
          />
          <TestimonialGrid testimonials={HOME_TESTIMONIALS} />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Pricing"
            title="Plans that scale from your first environment to your thousandth"
            align="center"
          />
          <PricingTable plans={pricingPlans} />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" />
          <FAQSection items={generalFaq} />
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
