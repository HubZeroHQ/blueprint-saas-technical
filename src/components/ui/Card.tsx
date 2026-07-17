import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-technical border border-border bg-surface p-6",
        interactive &&
          `transition-colors ${EASE_FAST} hover:border-border-strong hover:bg-surface-hover`,
        className
      )}
      {...props}
    />
  );
}
