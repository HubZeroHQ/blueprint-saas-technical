/**
 * Fictional brand facts for Nexora Systems. Placeholder content for the
 * blueprint — replace with a real company's details during customization.
 */
export const company = {
  legalName: "Nexora Systems, Inc.",
  founded: "2019",
  headquarters: "Austin, Texas",
  companySize: "180+ employees",

  mission:
    "We believe infrastructure should be a source of leverage, not a source of toil. Nexora exists so engineering teams spend their time building products, not babysitting the systems underneath them.",

  values: [
    {
      name: "Precision",
      description:
        "We ship infrastructure tooling. Ambiguity in this space becomes an outage in someone else's system, so we default to being exact.",
    },
    {
      name: "Ownership",
      description:
        "Every engineer at Nexora can trace a production incident to a person who will answer for it — starting with us.",
    },
    {
      name: "Transparency",
      description:
        "Status, pricing, and roadmap are public by default. Teams evaluating infrastructure vendors deserve to see how the sausage is made.",
    },
    {
      name: "Velocity",
      description:
        "Platform teams move slowly when their tools fight them. We measure our own success by how fast our customers can move safely.",
    },
  ],

  contact: {
    email: "hello@nexorasystems.com",
    support: "support@nexorasystems.com",
    salesEmail: "sales@nexorasystems.com",
    address: "600 Congress Avenue, Suite 1400, Austin, TX 78701",
  },

  social: {
    github: "https://github.com/nexora-systems",
    x: "https://x.com/nexorasystems",
    linkedin: "https://linkedin.com/company/nexora-systems",
  },
} as const;
