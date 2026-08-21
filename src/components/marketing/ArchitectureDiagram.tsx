import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

const SOURCES = ["Git repository", "Infrastructure manifest", "Policy as code"];
const CONTROL_PLANE = ["Provisioning engine", "Policy engine", "Telemetry pipeline"];
const TARGETS = ["Amazon Web Services", "Google Cloud", "Microsoft Azure"];

function DiagramColumn({
  label,
  items,
  emphasized,
}: {
  label: string;
  items: string[];
  emphasized?: boolean;
}) {
  return (
    <div
      data-diagram-step
      className={cn(
        "flex flex-1 flex-col gap-3 rounded-technical border p-5",
        emphasized ? "border-accent bg-accent-muted" : "border-border bg-surface"
      )}
    >
      <span className={cn("font-mono text-xs uppercase tracking-wide", emphasized ? "text-accent" : "text-fg-subtle")}>
        {label}
      </span>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className={cn("rounded-[4px] border px-3 py-2 text-sm", emphasized ? "border-accent/30 bg-bg text-fg" : "border-border bg-bg-subtle text-fg-muted")}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiagramArrow() {
  return <ArrowRightIcon data-diagram-step className="mx-auto h-5 w-5 shrink-0 rotate-90 text-accent lg:rotate-0" />;
}

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      <DiagramColumn label="Sources" items={SOURCES} />
      <DiagramArrow />
      <DiagramColumn label="Nexora control plane" items={CONTROL_PLANE} emphasized />
      <DiagramArrow />
      <DiagramColumn label="Targets" items={TARGETS} />
    </div>
  );
}
