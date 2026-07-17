import { routes } from "@/config/routes";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export const footerGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Product overview", href: routes.product },
      { label: "Features", href: routes.features },
      { label: "Integrations", href: routes.integrations },
      { label: "Security", href: routes.security },
      { label: "Pricing", href: routes.pricing },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: routes.docs },
      { label: "API reference", href: routes.api },
      { label: "Blog", href: routes.blog },
      { label: "Customer stories", href: routes.customers },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Careers", href: routes.careers },
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: routes.privacy },
      { label: "Terms of service", href: routes.terms },
    ],
  },
];
