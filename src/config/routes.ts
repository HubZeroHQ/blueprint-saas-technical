/**
 * Single source of truth for every route in the blueprint. Navigation,
 * the footer, the sitemap, and internal links should reference this
 * rather than hardcoding path strings.
 */
export const routes = {
  home: "/",
  product: "/product",
  features: "/features",
  integrations: "/integrations",
  security: "/security",
  pricing: "/pricing",
  docs: "/docs",
  docsQuickstart: "/docs/quickstart",
  api: "/api",
  customers: "/customers",
  customerDetail: (slug: string) => `/customers/${slug}`,
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  about: "/about",
  careers: "/careers",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

/** True when `pathname` is `href` or a sub-route of it (e.g. `/docs/quickstart` under `/docs`). */
export function isRouteActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
