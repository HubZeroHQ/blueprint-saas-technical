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
        "rounded-technical border border-border bg-surface p-6 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-fg)_4%,transparent)]",
        interactive &&
          cn(
            "group transition-[color,background-color,border-color,box-shadow,transform]",
            EASE_FAST,
            "hover:-translate-y-px hover:border-border-strong hover:bg-surface-hover hover:shadow-elevated"
          ),
        className
      )}
      {...props}
    />
  );
}
