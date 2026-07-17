import type { AccordionItem } from "@/components/ui/Accordion";

export const generalFaq: AccordionItem[] = [
  {
    question: "What is Nexora Systems?",
    answer:
      "Nexora is a control plane platform and infrastructure teams use to provision, observe, and govern cloud infrastructure across AWS, Google Cloud, and Azure from one system, instead of stitching together separate tools per cloud.",
  },
  {
    question: "Do we need to migrate off our existing Terraform or Pulumi setup?",
    answer:
      "No. Nexora imports existing infrastructure-as-code state directly, so you can adopt unified observability and policy guardrails without rewriting what you've already built.",
  },
  {
    question: "How does Nexora handle multi-cloud environments?",
    answer:
      "You define an environment once as a declarative manifest. Nexora translates that manifest into the correct primitives for each target cloud, so the same definition provisions consistently on AWS, GCP, or Azure.",
  },
  {
    question: "Is Nexora suitable for regulated industries?",
    answer:
      "Yes. Nexora's immutable audit log, fine-grained access control, and policy guardrails are used today by teams in financial services and healthcare. See our Security page for our compliance program in detail.",
  },
  {
    question: "Can developers provision infrastructure without filing a ticket?",
    answer:
      "Yes — that's the point. Platform teams define a self-service catalog of approved templates; developers request what they need and Nexora enforces approvals, budgets, and policy automatically.",
  },
];

export const pricingFaq: AccordionItem[] = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade at any time and the new plan takes effect immediately. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "What counts as an environment?",
    answer:
      "An environment is a provisioned, named collection of infrastructure Nexora manages as a unit — for example, a staging environment or a regional production deployment.",
  },
  {
    question: "Is there a free trial for the Growth plan?",
    answer:
      "Yes, Growth includes a 14-day free trial with full feature access. No credit card is required to start.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes, annual billing on the Growth plan includes a 15% discount. Enterprise contracts are billed annually by default.",
  },
  {
    question: "What happens if we exceed our plan's environment limit?",
    answer:
      "We'll notify you before you hit the limit and help you move to a plan that fits. We never silently disable infrastructure that's already running.",
  },
];
