import { routes } from "@/config/routes";

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const navigation: NavigationItem[] = [
  {
    label: "Product",
    href: routes.product,
    description: "How Nexora's control plane works.",
  },
  {
    label: "Features",
    href: routes.features,
    description: "Provisioning, observability, access, automation.",
  },
  {
    label: "Pricing",
    href: routes.pricing,
    description: "Plans for every team size.",
  },
  {
    label: "Docs",
    href: routes.docs,
    description: "Guides, quickstarts, and API reference.",
  },
  {
    label: "Customers",
    href: routes.customers,
    description: "How teams run on Nexora.",
  },
  {
    label: "Company",
    href: routes.about,
    description: "Our mission, team, and story.",
  },
];
