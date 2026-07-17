import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/marketing/BlogCard";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { routes } from "@/config/routes";
import { blogPosts } from "@/data/blog";
import { createMetadata } from "@/seo/createMetadata";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Notes on platform engineering, infrastructure reliability, and developer experience from the team building Nexora Systems.",
  canonical: routes.blog,
});

export default function BlogPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Blog"
        title="Notes on platform engineering and infrastructure reliability"
        description="Practical writing from the engineers building Nexora — on drift, self-service infrastructure, and measuring reliability that actually holds up."
      />

      <Section>
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} index={index} step={60}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </Container>
      </Section>
    </Page>
  );
}
