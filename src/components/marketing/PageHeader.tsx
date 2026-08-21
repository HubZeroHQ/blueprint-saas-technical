import { Container } from "@/components/layout/Container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="technical-grid relative overflow-hidden border-b border-border bg-bg-subtle">
      <Container className="relative flex min-h-[20rem] flex-col justify-end gap-5 py-16 lg:min-h-[24rem] lg:py-20">
        {eyebrow && (
          <span className="system-label inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
