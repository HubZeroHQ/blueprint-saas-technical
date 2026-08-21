import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import { Avatar } from "@/components/ui/Avatar";
import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { blogPosts, type BlogBlock } from "@/data/blog";
import { createMetadata } from "@/seo/createMetadata";
import { breadcrumbSchema } from "@/seo/structuredData";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: routes.blogPost(post.slug),
  });
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    return <h2 className="mt-4 text-xl font-semibold text-fg">{block.text}</h2>;
  }

  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-2">
        {block.items?.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <p className="text-sm leading-relaxed text-fg-muted">{block.text}</p>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <Page>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: routes.blog },
          { name: post.title, path: routes.blogPost(post.slug) },
        ])}
      />

      <PageHeader eyebrow={post.category} title={post.title} description={post.excerpt} />

      <Section>
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex items-center gap-3 border-b border-border pb-8">
            <Avatar name={post.author} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-fg">{post.author}</span>
              <span className="font-mono text-xs text-fg-subtle">
                {post.authorRole} · {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {post.readTime}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {post.content.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <Link
              href={routes.blog}
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              ← Back to blog
            </Link>
          </div>
        </Container>
      </Section>
    </Page>
  );
}
