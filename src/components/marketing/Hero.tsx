import { Button } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";
import { routes } from "@/config/routes";
import { site } from "@/config/site";

import { DashboardPreview } from "./DashboardPreview";

const CAPABILITIES = [
  ["PROVISION", "Declarative environments"],
  ["OBSERVE", "Unified telemetry"],
  ["GOVERN", "Policy at every change"],
] as const;

export function Hero() {
  return (
    <section className="technical-grid relative overflow-hidden border-b border-border" aria-labelledby="hero-title">
      <div className="technical-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid min-w-0 border border-border bg-bg/90 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="min-w-0 border-b border-border p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-12">
            <div className="flex flex-col gap-7">
              <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
                <StatusDot tone="success" live />
                Control plane / operational
              </span>
              <h1 id="hero-title" className="max-w-2xl text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.055em] text-fg sm:text-6xl lg:text-[4.25rem]">
                {site.tagline}
              </h1>
              <p className="max-w-xl text-base leading-7 text-fg-muted sm:text-lg">
                Provision, observe, and govern every cloud environment from one engineered system—built for platform teams who need speed without losing control.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={routes.docsQuickstart} size="lg">Run the quickstart</Button>
                <Button href={routes.product} variant="secondary" size="lg">Explore the control plane</Button>
              </div>
              <p className="font-mono text-[11px] leading-5 text-fg-subtle">Guided demo · no account created · about 10 minutes</p>
            </div>
          </div>
          <div className="min-w-0 bg-bg-subtle/80 p-4 sm:p-7 lg:p-10">
            <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">
              <span>Production environment</span><span>Product specimen</span>
            </div>
            <DashboardPreview />
            <dl className="grid divide-y divide-border border-x border-b border-border bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {CAPABILITIES.map(([term, detail]) => (
                <div key={term} className="min-w-0 p-4">
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-accent">{term}</dt>
                  <dd className="mt-1 text-xs text-fg-muted">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
