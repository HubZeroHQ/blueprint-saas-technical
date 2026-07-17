"use client";

import { ArrowRightIcon } from "@/components/icons";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";
import { EASE_SLOW, revealDelayStyle } from "@/utils/motion";

const SOURCES = ["Git repository", "Infrastructure manifest", "Policy as code"];
const CONTROL_PLANE = ["Provisioning engine", "Policy engine", "Telemetry pipeline"];
const TARGETS = ["Amazon Web Services", "Google Cloud", "Microsoft Azure"];

// Sequential reveal: each column steps in after the last, and the
// connecting arrows fill in between them, so the diagram reads as a
// pipeline assembling itself rather than a single grid fading in at once.
const STEP_MS = 120;

function DiagramColumn({
  label,
  items,
  emphasized,
  visible,
  step,
}: {
  label: string;
  items: string[];
  emphasized?: boolean;
  visible: boolean;
  step: number;
}) {
  return (
    <div
      style={revealDelayStyle(step, STEP_MS)}
      className={cn(
        "flex flex-1 flex-col gap-3 rounded-technical border p-5 transition-[opacity,transform]",
        EASE_SLOW,
        emphasized ? "border-accent bg-accent-muted" : "border-border bg-surface",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[var(--reveal-distance)]"
      )}
    >
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-wide",
          emphasized ? "text-accent" : "text-fg-subtle"
        )}
      >
        {label}
      </span>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "rounded-[4px] border px-3 py-2 text-sm",
              emphasized
                ? "border-accent/30 bg-bg text-fg"
                : "border-border bg-bg-subtle text-fg-muted"
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiagramArrow({ visible, step }: { visible: boolean; step: number }) {
  return (
    <ArrowRightIcon
      style={revealDelayStyle(step, STEP_MS)}
      className={cn(
        "mx-auto h-5 w-5 shrink-0 rotate-90 transition-[opacity,color] lg:rotate-0",
        EASE_SLOW,
        visible ? "opacity-100 text-accent" : "opacity-0 text-fg-subtle"
      )}
    />
  );
}

export function ArchitectureDiagram() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      <DiagramColumn label="Sources" items={SOURCES} visible={visible} step={0} />

      <DiagramArrow visible={visible} step={1} />

      <DiagramColumn
        label="Nexora control plane"
        items={CONTROL_PLANE}
        emphasized
        visible={visible}
        step={2}
      />

      <DiagramArrow visible={visible} step={3} />

      <DiagramColumn label="Targets" items={TARGETS} visible={visible} step={4} />
    </div>
  );
}
