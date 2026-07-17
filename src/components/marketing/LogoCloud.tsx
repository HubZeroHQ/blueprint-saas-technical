import { customers } from "@/data/customers";

interface LogoCloudProps {
  label?: string;
}

export function LogoCloud({ label = "Trusted by infrastructure teams at" }: LogoCloudProps) {
  return (
    <div className="border-y border-border bg-bg-subtle">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 lg:px-8">
        <p className="text-center font-mono text-xs uppercase tracking-wide text-fg-subtle">
          {label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {customers.map((customer) => (
            <span
              key={customer.name}
              className="font-mono text-sm text-fg-muted"
            >
              {customer.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
