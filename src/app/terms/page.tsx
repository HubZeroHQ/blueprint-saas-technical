import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { company } from "@/config/company";
import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `The terms that govern your use of ${site.name}.`,
  canonical: routes.terms,
});

const LAST_UPDATED = "January 6, 2026";

const SECTIONS = [
  {
    heading: "Acceptance of terms",
    body: `These Terms of Service ("Terms") govern your access to and use of the Nexora control plane, CLI, API, and website (the "Service"), operated by ${company.legalName} By creating an account or using the Service, you agree to be bound by these Terms.`,
  },
  {
    heading: "Description of service",
    body: "Nexora provides a control plane platform for provisioning, observing, and governing cloud infrastructure. Features, plan limits, and availability may change over time; material reductions in functionality will be communicated in advance to active subscribers.",
  },
  {
    heading: "Account registration",
    body: "You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your credentials and API keys. You are responsible for all activity that occurs under your account, including actions taken by team members you invite.",
  },
  {
    heading: "Acceptable use",
    body: "You may not use the Service to provision infrastructure for unlawful purposes, to circumvent plan limits through technical means, to reverse engineer the Service, or to resell access to the Service without a written reseller agreement.",
  },
  {
    heading: "Subscription and billing",
    body: "Paid plans are billed in advance on a monthly or annual basis. Fees are non-refundable except as required by law. We may suspend access for accounts with failed payments after a 14-day grace period and written notice.",
  },
  {
    heading: "Intellectual property",
    body: "Nexora retains all rights to the Service, including its software, documentation, and branding. You retain all rights to your infrastructure configurations, manifests, and data processed through the Service.",
  },
  {
    heading: "Confidentiality",
    body: "Each party agrees to protect the other's confidential information with the same care it uses for its own confidential information, and not less than reasonable care, for the duration of the relationship and two years thereafter.",
  },
  {
    heading: "Limitation of liability",
    body: "To the maximum extent permitted by law, Nexora's aggregate liability arising out of these Terms will not exceed the amount you paid us in the twelve months preceding the claim. Nexora is not liable for indirect, incidental, or consequential damages.",
  },
  {
    heading: "Termination",
    body: "You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. We may suspend or terminate accounts that violate these Terms, with notice where practical.",
  },
  {
    heading: "Governing law",
    body: "These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles. Disputes will be resolved in the state or federal courts located in Travis County, Texas.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these Terms from time to time. Material changes will be announced by email or an in-product notice at least 14 days before taking effect.",
  },
  {
    heading: "Contact",
    body: `Questions about these Terms can be directed to ${company.contact.email}.`,
  },
];

export default function TermsPage() {
  return (
    <Page>
      <PageHeader
        eyebrow={`Last updated ${LAST_UPDATED}`}
        title="Terms of Service"
        description="This is placeholder legal content for a HubZero blueprint. Replace it with counsel-reviewed terms before launching a real product."
      />

      <Section>
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-fg">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-fg-muted">{section.body}</p>
            </div>
          ))}
        </Container>
      </Section>
    </Page>
  );
}
