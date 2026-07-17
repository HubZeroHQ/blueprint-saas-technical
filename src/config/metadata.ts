import type { Metadata } from "next";

import { site } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },

  description: site.description,

  keywords: [
    "infrastructure control plane",
    "cloud infrastructure platform",
    "platform engineering",
    "infrastructure orchestration",
    "developer platform",
  ],

  applicationName: site.name,

  authors: [
    {
      name: site.author.name,
      url: site.author.url,
    },
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },

  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};