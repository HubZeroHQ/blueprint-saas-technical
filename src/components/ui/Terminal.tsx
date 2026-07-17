import { cn } from "@/utils/cn";

export interface TerminalLine {
  text: string;
  type?: "command" | "output" | "success" | "muted";
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
}

const LINE_CLASSES: Record<NonNullable<TerminalLine["type"]>, string> = {
  command: "text-white",
  output: "text-white/60",
  success: "text-[var(--color-success)]",
  muted: "text-white/35",
};

export function Terminal({ title = "nexora — ctl", lines, className }: TerminalProps) {
  return (
    <div
      className={cn(
        // See CodeBlock — `min-w-0` prevents a grid/flex parent from
        // sizing this column to the terminal's unbroken content width.
        "min-w-0 overflow-hidden rounded-technical border border-border bg-[var(--color-code-bg)] shadow-elevated",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="ml-1.5 font-mono text-xs text-white/40">{title}</span>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-[13px] leading-relaxed">
        {lines.map((line, index) => (
          <p key={index} className={LINE_CLASSES[line.type ?? "output"]}>
            {line.type === "command" && (
              <span className="mr-2 text-[var(--color-success)]">$</span>
            )}
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
