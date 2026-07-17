import { cn } from "@/utils/cn";

interface MarkProps {
  className?: string;
}

/**
 * Nexora's brand mark: a hub connected to three managed nodes — a
 * control plane governing distributed infrastructure. Uses currentColor
 * so it inherits text color from its container.
 */
export function Mark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <path
        d="M16 16 L16 5 M16 16 L6 25 M16 16 L26 25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="12.5" y="1.5" width="7" height="7" rx="1.75" fill="currentColor" />
      <rect x="2.5" y="21.5" width="7" height="7" rx="1.75" fill="currentColor" />
      <rect x="22.5" y="21.5" width="7" height="7" rx="1.75" fill="currentColor" />
    </svg>
  );
}
