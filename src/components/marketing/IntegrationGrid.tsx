import { PlugIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { Integration } from "@/data/integrations";
import { EASE_FAST } from "@/utils/motion";

interface IntegrationGridProps {
  integrations: Integration[];
}

export function IntegrationGrid({ integrations }: IntegrationGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration, index) => (
        <Reveal key={integration.name} index={index} step={60}>
          <Card interactive className="flex h-full items-start gap-3.5">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-technical bg-bg-subtle text-fg-muted transition-colors ${EASE_FAST} group-hover:bg-accent-muted group-hover:text-accent`}
            >
              <PlugIcon className="h-4 w-4" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-fg">{integration.name}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{integration.description}</p>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
