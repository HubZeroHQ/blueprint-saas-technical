import { cn } from "@/utils/cn";

interface AvatarProps {
  name: string;
  className?: string;
}

const PALETTE = [
  "bg-accent-muted text-accent",
  "bg-success-muted text-success",
  "bg-warning-muted text-warning",
  "bg-danger-muted text-danger",
] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

function paletteIndex(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash + name.charCodeAt(i) * (i + 1)) % PALETTE.length;
  }
  return hash;
}

export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-technical text-sm font-semibold",
        PALETTE[paletteIndex(name)],
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
