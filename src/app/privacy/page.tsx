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
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  canonical: routes.privacy,
});

const LAST_UPDATED = "January 6, 2026";

const SECTIONS = [
  {
    heading: "Overview",
    body: `This Privacy Policy explains how ${company.legalName} ("Nexora," "we," "us") collects, uses, and shares information when you use our website, control plane, CLI, and API (together, the "Service"). By using the Service, you agree to the practices described here.`,
  },
  {
    heading: "Information we collect",
    body: "We collect account information you provide directly (name, work email, company), infrastructure metadata necessary to operate the Service (resource configurations, telemetry, audit events), and usage data collected automatically (IP address, browser type, pages visited). We do not collect the contents of your infrastructure's application data or customer data unless you explicitly configure Nexora to do so.",
  },
  {
    heading: "How we use information",
    body: "We use collected information to provide and improve the Service, authenticate and secure your account, respond to support requests, send service-related communications, and comply with legal obligations. We do not sell personal information.",
  },
  {
    heading: "Data sharing",
    body: "We share information with subprocessors who help us operate the Service (cloud hosting, error monitoring, customer support tooling), each bound by contractual confidentiality obligations. We disclose information when required by law, to protect our rights, or in connection with a merger or acquisition, with notice to affected customers where practical.",
  },
  {
    heading: "Data retention",
    body: "Account and audit log data is retained for the duration of your subscription plus the retention window specified in your plan (7 days on Starter, 90 days on Growth, 1 year on Enterprise). You may request deletion of your account data at any time, subject to legal retention requirements.",
  },
  {
    heading: "Your rights",
    body: "Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal information, and to object to certain processing. To exercise these rights, contact us using the details below. We respond to verified requests within 30 days.",
  },
  {
    heading: "Security",
    body: "We encrypt data in transit and at rest, enforce least-privilege access internally, and undergo an annual SOC 2 Type II audit. See our Security page for a full description of our practices.",
  },
  {
    heading: "International data transfers",
    body: "Nexora is headquartered in the United States. If you access the Service from outside the United States, your information will be transferred to and processed in the United States and other countries where our subprocessors operate, under appropriate safeguards.",
  },
  {
    heading: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be announced by email or an in-product notice at least 14 days before taking effect.",
  },
  {
    heading: "Contact us",
    body: `Questions about this policy can be directed to ${company.contact.email} or ${company.contact.address}.`,
  },
];

export default function PrivacyPage() {
  return (
    <Page>
      <PageHeader
        eyebrow={`Last updated ${LAST_UPDATED}`}
        title="Privacy Policy"
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
