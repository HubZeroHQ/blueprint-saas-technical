import { company } from "@/config/company";
import { site } from "@/config/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: company.legalName,
    url: site.url,
    // Schema.org recommends a logo of at least 112x112px; the 32x32
    // favicon route is too small, so this points at the larger
    // apple-icon route instead.
    logo: `${site.url}/apple-icon`,
    foundingDate: company.founded,
    sameAs: [company.social.github, company.social.x, company.social.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      email: company.contact.support,
      contactType: "customer support",
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: site.description,
    url: site.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available; usage-based and custom enterprise plans.",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: new URL(entry.path, site.url).toString(),
    })),
  };
}
