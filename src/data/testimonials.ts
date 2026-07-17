export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We stopped being a ticket queue and started being a platform. Application teams self-serve the exact environment shape we've already approved, every time.",
    author: "Priya Nair",
    role: "Director of Platform Engineering",
    company: "Meridian Freight",
  },
  {
    quote:
      "Nexora didn't ask us to rewrite four years of Terraform to get value. It gave us one place to see all of it, and guardrails so the next four years don't fragment the same way.",
    author: "Marcus Webb",
    role: "VP of Engineering",
    company: "Lumen Analytics",
  },
  {
    quote:
      "Our auditors used to get a spreadsheet. Now they get read access to Nexora's audit log directly, and our SOC 2 renewal took half the time it used to.",
    author: "Elena Farrow",
    role: "Head of Security",
    company: "Ridgeline Bank",
  },
  {
    quote:
      "The policy guardrails caught a misconfigured storage bucket before it ever reached production. That's the kind of catch that used to depend on someone remembering to look.",
    author: "Sam Okafor",
    role: "Staff SRE",
    company: "Northfield Health",
  },
];
