import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { PricingPlan } from "@/data/pricing";
import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

interface PricingTableProps {
  plans: PricingPlan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "flex flex-col gap-6 rounded-technical border p-8 transition-[border-color,box-shadow,transform]",
            EASE_FAST,
            "hover:-translate-y-0.5 hover:shadow-elevated",
            plan.highlighted
              ? "border-accent bg-accent-muted hover:border-accent"
              : "border-border bg-surface hover:border-border-strong"
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fg">{plan.name}</h3>
              {plan.highlighted && <Badge tone="accent">Most popular</Badge>}
            </div>
            <p className="text-sm leading-relaxed text-fg-muted">{plan.description}</p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="font-mono text-4xl font-semibold text-fg">{plan.price}</span>
            {plan.priceSuffix && (
              <span className="text-sm text-fg-muted">{plan.priceSuffix}</span>
            )}
          </div>

          <Button
            href={plan.href}
            variant={plan.highlighted ? "primary" : "secondary"}
            size="lg"
          >
            {plan.cta}
          </Button>

          <ul className="flex flex-col gap-3 border-t border-border pt-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
