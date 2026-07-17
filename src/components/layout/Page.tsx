import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type PageProps = HTMLAttributes<HTMLDivElement>;

export function Page({
  className,
  children,
  ...props
}: PageProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "min-h-screen",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}