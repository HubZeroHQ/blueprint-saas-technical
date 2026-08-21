import { BarChart } from "@/components/ui/BarChart";
import { Sparkline } from "@/components/ui/Sparkline";
import { StatusDot } from "@/components/ui/StatusDot";
import { BoltIcon, ChartIcon, LockIcon, ServerIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

const SERVICES = [
  { name: "checkout-api", region: "us-east-1", latency: "42ms", trend: [12, 14, 11, 15, 13, 12, 10, 11] },
  { name: "ledger-worker", region: "eu-west-1", latency: "58ms", trend: [20, 18, 22, 19, 24, 21, 23, 22] },
  { name: "events-stream", region: "us-west-2", latency: "31ms", trend: [8, 9, 7, 10, 9, 11, 8, 9] },
];

const DEPLOY_VOLUME = [4, 7, 5, 9, 6, 10, 8, 12, 9, 14, 11, 13];

const SIDEBAR_ICONS = [ServerIcon, ChartIcon, LockIcon, BoltIcon];

interface DashboardPreviewProps {
  className?: string;
}

export function DashboardPreview({ className }: DashboardPreviewProps) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden border border-border bg-surface shadow-elevated",
        className
      )}
      role="img"
      aria-label="Nexora control plane showing three healthy services and deployment volume"
    >
      <div className="flex min-w-0 items-center justify-between gap-4 overflow-hidden border-b border-border px-4 py-3">
        <span className="min-w-0 truncate font-mono text-xs text-fg-muted">
          environments / <span className="text-fg">production-us-east</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-technical border border-border px-2 py-1 font-mono text-[11px] text-fg-muted">
          <StatusDot tone="success" live />
          Operational
        </span>
      </div>

      <div className="flex">
        <div className="hidden w-12 flex-col items-center gap-4 border-r border-border py-5 sm:flex">
          {SIDEBAR_ICONS.map((Icon, index) => (
            <span
              key={index}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-technical",
                index === 0 ? "bg-accent-muted text-accent" : "text-fg-subtle"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 space-y-4 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="min-w-0 rounded-technical border border-border bg-bg-subtle p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate font-mono text-xs text-fg">{service.name}</span>
                  <StatusDot tone="success" />
                </div>
                <p className="mt-1 font-mono text-[10px] text-fg-subtle">{service.region}</p>
                <div className="mt-3 flex items-end justify-between">
                  <span className="font-mono text-lg text-fg">{service.latency}</span>
                  <Sparkline data={service.trend} width={64} height={24} strokeClassName="text-success" />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-technical border border-border bg-bg-subtle p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-fg-muted">deploys / last 12 weeks</span>
              <span className="font-mono text-xs text-success">+18%</span>
            </div>
            <BarChart data={DEPLOY_VOLUME} height={48} barClassName="bg-accent/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
