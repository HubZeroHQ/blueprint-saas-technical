"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { logger } from "@/lib/logger";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error("Unhandled application error", error);
  }, [error]);

  return (
    <Page className="flex min-h-[70vh] items-center">
      <Container role="alert" aria-live="assertive" className="flex flex-col items-center gap-6 text-center">
        <span className="font-mono text-sm text-danger">ERROR 500</span>
        <h1 className="text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          Something went wrong
        </h1>
        <p className="max-w-md text-base leading-relaxed text-fg-muted">
          An unexpected error interrupted this page. Try again, or head back home if the
          problem continues.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button href={routes.home} variant="secondary">
            Return home
          </Button>
        </div>
      </Container>
    </Page>
  );
}
