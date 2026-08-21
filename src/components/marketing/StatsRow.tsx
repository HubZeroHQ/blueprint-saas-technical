import { cn } from "@/utils/cn";

interface Stat {
  value: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
  columns?: 3 | 4;
}

const COLUMN_CLASSES: Record<NonNullable<StatsRowProps["columns"]>, string> = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function StatsRow({ stats, columns = 4 }: StatsRowProps) {
  return (
    <dl className={cn("grid gap-px overflow-hidden rounded-technical border border-border bg-border", COLUMN_CLASSES[columns])}>
      {stats.map((stat) => (
        <div key={stat.label} data-stat-reveal className="flex min-w-0 flex-col gap-1.5 bg-surface p-4 sm:p-6">
          <dt className="text-sm text-fg-muted">{stat.label}</dt>
          <dd className="break-words font-mono text-xl font-semibold leading-tight text-fg sm:text-2xl lg:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
