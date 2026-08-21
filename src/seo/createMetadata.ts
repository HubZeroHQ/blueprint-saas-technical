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
  image = "/opengraph-image",
  canonical,
  keywords = [],
}: CreateMetadataOptions = {}): Metadata {
  // Raw title only — the root layout's metadata defines a title
  // template (`%s | ${site.name}`) that Next.js applies automatically
  // to the <title> tag. Appending the site name here too would
  // duplicate it ("Pricing | Nexora Systems | Nexora Systems").
  // openGraph/twitter titles use this same raw value since their site
  // name is already carried by `openGraph.siteName` below.
  const socialTitle = title
    ? `${title} | ${seoDefaults.siteName}`
    : seoDefaults.title;

  const pageDescription =
    description ?? seoDefaults.description;

  const url = canonical
    ? new URL(canonical, seoDefaults.url).toString()
    : seoDefaults.url;

  return {
    title: title ?? { absolute: seoDefaults.title },

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
      title: socialTitle,
      description: pageDescription,
      images: [{ url: image }],
    },

    twitter: {
      card: seoDefaults.twitterCard,
      title: socialTitle,
      description: pageDescription,
      images: [image],
    },
  };
}
