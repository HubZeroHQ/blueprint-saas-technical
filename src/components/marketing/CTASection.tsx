import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = "See the control plane work end to end.",
  description = "Follow the guided quickstart with a realistic manifest, or contact the fictional Nexora team to inspect the enterprise evaluation path.",
}: CTASectionProps) {
  return (
    <div className="technical-grid flex flex-col items-start gap-6 border border-border bg-bg-subtle px-6 py-12 text-left sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
      <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-lg text-base leading-relaxed text-fg-muted">{description}</p>
      <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
        <Button href={routes.docsQuickstart} size="lg">
          Run the quickstart
        </Button>
        <Button href={routes.contact} variant="secondary" size="lg">
          Contact sales
        </Button>
      </div>
    </div>
  );
}
