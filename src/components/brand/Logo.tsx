import { site } from "@/config/site";
import { cn } from "@/utils/cn";

import { Mark } from "./Mark";

interface LogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Mark className={cn("h-6 w-6 text-accent", markClassName)} />
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-fg">
          {site.shortName}
        </span>
      )}
    </span>
  );
}
