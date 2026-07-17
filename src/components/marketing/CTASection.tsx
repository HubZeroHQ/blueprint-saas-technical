import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = "Provision your first environment in minutes.",
  description = "Start free, no credit card required. Talk to us if you're evaluating Nexora for a regulated or multi-cloud environment.",
}: CTASectionProps) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-technical border border-border bg-bg-subtle px-6 py-16 text-center sm:px-16">
      <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-md text-base leading-relaxed text-fg-muted">{description}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={routes.pricing} size="lg">
          Start free trial
        </Button>
        <Button href={routes.contact} variant="secondary" size="lg">
          Contact sales
        </Button>
      </div>
    </div>
  );
}
