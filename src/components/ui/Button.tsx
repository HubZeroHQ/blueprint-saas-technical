import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

// `active:scale` gives buttons a tactile press without touching layout —
// transform + color/opacity only, per the Technical performance guidance.
const MOTION = `transition-[color,background-color,border-color,opacity,transform] ${EASE_FAST} active:scale-[0.98]`;

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-technical font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    MOTION
  ),
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-hover",
        secondary:
          "border border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-hover",
        ghost: "text-fg-muted hover:bg-surface-hover hover:text-fg",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonAsButtonProps
  extends ButtonVariants,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLinkProps
  extends ButtonVariants,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
