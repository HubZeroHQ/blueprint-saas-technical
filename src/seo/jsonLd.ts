import { site } from "@/config/site";

export type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(overrides: JsonLdObject = {}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    ...overrides,
  };
}
