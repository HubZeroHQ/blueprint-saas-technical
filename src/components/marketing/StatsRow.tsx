import { cn } from "@/utils/cn";

interface Stat {
  value: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
  /** Column count at the `sm` breakpoint and up. Mobile is always 2-up
   *  (or 1-up for a 3-stat row, so it never splits 3 into 2+1). */
  columns?: 3 | 4;
}

// Full literal class strings so Tailwind's compiler can find them —
// a template-interpolated `sm:grid-cols-${columns}` would not be detected.
const COLUMN_CLASSES: Record<NonNullable<StatsRowProps["columns"]>, string> = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function StatsRow({ stats, columns = 4 }: StatsRowProps) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-technical border border-border bg-border",
        COLUMN_CLASSES[columns]
      )}
    >
      {stats.map((stat) => (
        // `min-w-0` overrides the grid item's default `min-width: auto`,
        // which otherwise sizes the column to fit unbroken content (e.g.
        // "180+ employees") and blows out the equal-width track instead of
        // letting the value wrap. This is what makes long values safe by
        // default rather than a per-stat fix.
        <div key={stat.label} className="flex min-w-0 flex-col gap-1.5 bg-surface p-4 sm:p-6">
          <dt className="text-sm text-fg-muted">{stat.label}</dt>
          <dd className="break-words font-mono text-xl font-semibold leading-tight text-fg sm:text-2xl lg:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
