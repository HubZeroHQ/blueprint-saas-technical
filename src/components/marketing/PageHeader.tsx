import { Container } from "@/components/layout/Container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-bg-subtle">
      <Container className="flex flex-col gap-4 py-16 lg:py-20">
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-wide text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
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
