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
          cn(
            "group transition-[color,background-color,border-color,box-shadow,transform]",
            EASE_FAST,
            "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover hover:shadow-elevated"
          ),
        className
      )}
      {...props}
    />
  );
}
