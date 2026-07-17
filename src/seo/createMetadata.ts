import type { Metadata } from "next";

import { seoDefaults } from "./defaults";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  keywords?: string[];
}

export function createMetadata({
  title,
  description,
  image,
  canonical,
  keywords = [],
}: CreateMetadataOptions = {}): Metadata {
  // Raw title only — the root layout's metadata defines a title
  // template (`%s | ${site.name}`) that Next.js applies automatically
  // to the <title> tag. Appending the site name here too would
  // duplicate it ("Pricing | Nexora Systems | Nexora Systems").
  // openGraph/twitter titles use this same raw value since their site
  // name is already carried by `openGraph.siteName` below.
  const pageTitle = title ?? seoDefaults.siteName;

  const pageDescription =
    description ?? seoDefaults.description;

  const url = canonical
    ? new URL(canonical, seoDefaults.url).toString()
    : seoDefaults.url;

  return {
    title: pageTitle,

    description: pageDescription,

    keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: seoDefaults.type,
      locale: seoDefaults.locale,
      url,
      siteName: seoDefaults.siteName,
      title: pageTitle,
      description: pageDescription,
      // When omitted, Next falls back to the root `opengraph-image`
      // file-convention route so every page shares one branded image.
      ...(image ? { images: [{ url: image }] } : {}),
    },

    twitter: {
      card: seoDefaults.twitterCard,
      title: pageTitle,
      description: pageDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}