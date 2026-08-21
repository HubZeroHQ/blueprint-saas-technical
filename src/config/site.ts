const locale = "en-US";

export const site = {
  name: "Nexora Systems",
  shortName: "Nexora",
  tagline: "The control plane for modern infrastructure.",
  description:
    "Nexora Systems is the control plane platform and infrastructure teams use to provision, observe, and govern cloud infrastructure across every environment.",

  url: "https://nexora.hubzero.in",
  locale,
  ogLocale: locale.replace("-", "_"),
  contentUpdated: "2026-08-21",

  author: {
    name: "HubZero",
    url: "https://hubzero.in",
  },
} as const;
