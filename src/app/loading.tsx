import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { StatusDot } from "@/components/ui/StatusDot";

export default function Loading() {
  return (
    <Page className="flex min-h-[70vh] items-center">
      <Container className="flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-sm text-fg-muted">
          <StatusDot tone="success" live />
          Loading
        </span>
      </Container>
    </Page>
  );
}
