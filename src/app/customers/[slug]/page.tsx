import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/marketing/PageHeader";
import { StatsRow } from "@/components/marketing/StatsRow";
import { JsonLd } from "@/components/shared/JsonLd";
import { Avatar } from "@/components/ui/Avatar";
import { routes } from "@/config/routes";
import { caseStudies } from "@/data/customers";
import { createMetadata } from "@/seo/createMetadata";
import { breadcrumbSchema } from "@/seo/structuredData";

interface CustomerPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CustomerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) return {};

  return createMetadata({
    title: study.name,
    description: study.summary,
    canonical: routes.customerDetail(study.slug),
  });
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  return (
    <Page>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Customers", path: routes.customers },
          { name: study.name, path: routes.customerDetail(study.slug) },
        ])}
      />

      <PageHeader eyebrow={study.industry} title={study.headline} description={study.summary} />

      <Section>
        <Container className="mx-auto flex max-w-3xl flex-col gap-12">
          <StatsRow stats={study.metrics} columns={3} />

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-fg">The challenge</h2>
            <p className="text-sm leading-relaxed text-fg-muted">{study.challenge}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-fg">The solution</h2>
            <p className="text-sm leading-relaxed text-fg-muted">{study.solution}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-fg">The result</h2>
            <p className="text-sm leading-relaxed text-fg-muted">{study.result}</p>
          </div>

          <blockquote className="flex flex-col gap-4 rounded-technical border border-border bg-bg-subtle p-8">
            <p className="text-lg leading-relaxed text-fg">&ldquo;{study.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <Avatar name={study.quoteAuthor} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-fg">{study.quoteAuthor}</span>
                <span className="text-xs text-fg-muted">{study.quoteRole}</span>
              </div>
            </div>
          </blockquote>
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
