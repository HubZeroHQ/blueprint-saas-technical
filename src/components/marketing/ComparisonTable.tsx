import { CheckIcon } from "@/components/icons";
import type { ComparisonSection } from "@/data/pricing";
import { EASE_FAST } from "@/utils/motion";

interface ComparisonTableProps {
  sections: ComparisonSection[];
}

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="mx-auto h-4 w-4 text-accent" />
    ) : (
      <span className="mx-auto block text-fg-subtle" aria-hidden="true">
        —
      </span>
    );
  }

  return <span className="text-sm text-fg-muted">{value}</span>;
}

export function ComparisonTable({ sections }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-sm font-medium text-fg-muted">Capability</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-fg">Starter</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-fg">Growth</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-fg">Enterprise</th>
          </tr>
        </thead>
        {sections.map((section) => (
          <tbody key={section.title} className="border-b border-border last:border-b-0">
            <tr>
              <th
                colSpan={4}
                scope="colgroup"
                className="bg-bg-subtle px-0 py-2.5 text-left font-mono text-xs uppercase tracking-wide text-fg-subtle"
              >
                {section.title}
              </th>
            </tr>
            {section.rows.map((row) => (
              <tr
                key={row.label}
                className={`border-t border-border transition-colors ${EASE_FAST} hover:bg-surface-hover`}
              >
                <th scope="row" className="py-3 pr-4 text-sm font-normal text-fg">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-center">
                  <Cell value={row.starter} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Cell value={row.growth} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Cell value={row.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
