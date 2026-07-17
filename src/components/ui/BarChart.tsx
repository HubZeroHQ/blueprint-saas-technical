import { cn } from "@/utils/cn";

interface BarChartProps {
  data: number[];
  height?: number;
  className?: string;
  barClassName?: string;
}

export function BarChart({
  data,
  height = 64,
  className,
  barClassName = "bg-accent",
}: BarChartProps) {
  const max = Math.max(...data);

  return (
    <div
      className={cn("flex items-end gap-1", className)}
      style={{ height }}
      aria-hidden="true"
    >
      {data.map((value, index) => (
        <span
          key={index}
          className={cn("flex-1 rounded-[1px]", barClassName)}
          style={{ height: `${Math.max(6, (value / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}
