import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

const FIELD_CLASSES = cn(
  "w-full rounded-technical border border-border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle",
  `outline-none transition-colors ${EASE_FAST}`,
  "focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-fg", className)}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(FIELD_CLASSES, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(FIELD_CLASSES, "resize-none", className)}
      {...props}
    />
  );
}

export function FieldError({ children, id }: { children?: string; id?: string }) {
  if (!children) return null;

  return (
    <p id={id} role="alert" className="text-xs text-danger">
      {children}
    </p>
  );
}
