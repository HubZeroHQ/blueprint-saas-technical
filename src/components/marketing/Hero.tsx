import { Button } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";
import { routes } from "@/config/routes";
import { site } from "@/config/site";

import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="flex flex-col gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-technical border border-border px-3 py-1.5 font-mono text-xs text-fg-muted">
          <StatusDot tone="success" live />
          Now provisioning across AWS, GCP, and Azure
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
          {site.tagline}
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-fg-muted">
          {site.description}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={routes.pricing} size="lg">
            Start free trial
          </Button>
          <Button href={routes.product} variant="secondary" size="lg">
            See how it works
          </Button>
        </div>

        <p className="font-mono text-xs text-fg-subtle">
          No credit card required · SOC 2 Type II · 14-day trial
        </p>
      </div>

      <DashboardPreview className="lg:-mr-4" />
    </div>
  );
}
