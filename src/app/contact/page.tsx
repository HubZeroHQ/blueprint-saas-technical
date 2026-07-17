import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/marketing/ContactForm";
import { PageHeader } from "@/components/marketing/PageHeader";
import { company } from "@/config/company";
import { routes } from "@/config/routes";
import { createMetadata } from "@/seo/createMetadata";
import { EASE_FAST } from "@/utils/motion";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Talk to Nexora Systems about your infrastructure. Reach sales, support, or general inquiries.",
  canonical: routes.contact,
});

const CONTACT_CHANNELS = [
  { label: "General inquiries", value: company.contact.email },
  { label: "Sales", value: company.contact.salesEmail },
  { label: "Support", value: company.contact.support },
];

export default function ContactPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Contact"
        title="Talk to our team"
        description="Whether you're evaluating Nexora, need help with your account, or want to talk through a multi-cloud migration, we'll route you to the right person."
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {CONTACT_CHANNELS.map((channel) => (
                <div key={channel.label} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
                    {channel.label}
                  </span>
                  <a
                    href={`mailto:${channel.value}`}
                    className={`text-sm text-fg transition-colors ${EASE_FAST} hover:text-accent`}
                  >
                    {channel.value}
                  </a>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
                  Headquarters
                </span>
                <p className="text-sm text-fg">{company.contact.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-technical border border-border bg-surface p-8">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </Page>
  );
}
