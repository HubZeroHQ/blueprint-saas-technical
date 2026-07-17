import { cn } from "@/utils/cn";

interface StatusDotProps {
  tone?: "success" | "warning" | "danger";
  live?: boolean;
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<StatusDotProps["tone"]>, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export function StatusDot({
  tone = "success",
  live = false,
  className,
}: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {live && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
            TONE_CLASSES[tone]
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          TONE_CLASSES[tone]
        )}
      />
    </span>
  );
}
