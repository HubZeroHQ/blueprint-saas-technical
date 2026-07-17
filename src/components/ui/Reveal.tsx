"use client";

import type { ElementType, HTMLAttributes } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";
import { revealClasses, revealDelayStyle } from "@/utils/motion";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Stagger index within a group — multiplied by `step` ms. */
  index?: number;
  step?: number;
  as?: "div" | "li";
}

// Cast keeps the `as` union simple for callers while sidestepping the
// generic-ref typing gymnastics of a fully polymorphic `ElementType`.
type AnyComponent = ElementType;

/**
 * Fades and lifts its children into place the first time they enter
 * the viewport. Use `index` to stagger siblings in a grid or list —
 * see the Technical motion language in `.hubzero/design/languages/technical.md`
 * for why the distance and duration are fixed rather than per-instance.
 */
export function Reveal({
  children,
  className,
  index = 0,
  step = 60,
  as: Component = "div",
  style,
  ...props
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = Component as AnyComponent;

  return (
    <Tag
      ref={ref}
      style={{ ...revealDelayStyle(index, step), ...style }}
      className={cn(revealClasses(visible), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
