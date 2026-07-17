import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <Page className="flex min-h-[70vh] items-center">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-mono text-sm text-accent">ERROR 404</span>
        <h1 className="text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          Page not found
        </h1>
        <p className="max-w-md text-base leading-relaxed text-fg-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Check the URL, or
          head back home.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={routes.home}>Return home</Button>
          <Button href={routes.contact} variant="secondary">
            Contact support
          </Button>
        </div>
      </Container>
    </Page>
  );
}
