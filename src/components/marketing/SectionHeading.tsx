import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="system-label inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-4xl lg:text-[2.75rem]",
          align === "center" && "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-fg-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
