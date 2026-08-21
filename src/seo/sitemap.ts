import type { MetadataRoute } from "next";

import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/customers";

import { seoDefaults } from "./defaults";

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: routes.home, priority: 1, changeFrequency: "weekly" },
  { path: routes.product, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.features, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.integrations, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.security, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.pricing, priority: 0.9, changeFrequency: "weekly" },
  { path: routes.docs, priority: 0.8, changeFrequency: "weekly" },
  { path: routes.docsQuickstart, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.api, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.customers, priority: 0.7, changeFrequency: "weekly" },
  { path: routes.blog, priority: 0.7, changeFrequency: "weekly" },
  { path: routes.about, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.careers, priority: 0.5, changeFrequency: "weekly" },
  { path: routes.contact, priority: 0.6, changeFrequency: "yearly" },
  { path: routes.privacy, priority: 0.3, changeFrequency: "yearly" },
  { path: routes.terms, priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: new URL(route.path, seoDefaults.url).toString(),
    lastModified: site.contentUpdatedAt,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: new URL(routes.blogPost(post.slug), seoDefaults.url).toString(),
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const customerEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: new URL(routes.customerDetail(study.slug), seoDefaults.url).toString(),
    lastModified: site.contentUpdatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...customerEntries];
}
