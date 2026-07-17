import { ICONS } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import type { Feature } from "@/data/features";

interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

export function FeatureGrid({ features, className }: FeatureGridProps) {
  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = ICONS[feature.icon];

          return (
            <Card key={feature.id} interactive className="flex flex-col gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-technical bg-accent-muted text-accent">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-fg">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {feature.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
