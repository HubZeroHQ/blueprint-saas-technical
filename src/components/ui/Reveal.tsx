import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type RevealProps = HTMLAttributes<HTMLDivElement>;

/** Server-rendered marker for the Technical CSS reveal treatment. */
export function Reveal({ className, children, ...props }: RevealProps) {
  return (
    <div data-reveal className={cn(className)} {...props}>
      {children}
    </div>
  );
}
