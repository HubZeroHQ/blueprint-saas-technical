"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import type { NavigationItem } from "@/config/navigation";
import { isRouteActive, routes } from "@/config/routes";
import { cn } from "@/utils/cn";
import { EASE_FAST, EASE_NORMAL } from "@/utils/motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  items: NavigationItem[];
}

export function MobileNav({ open, onClose, items }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        `fixed inset-0 z-40 bg-bg transition-opacity ${EASE_NORMAL} lg:hidden`,
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className={`absolute right-6 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-technical border border-border text-fg transition-colors ${EASE_FAST} hover:border-border-strong`}
      >
        <CloseIcon />
      </button>

      <nav
        aria-label="Mobile"
        className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-24"
      >
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {items.map((item, index) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <li
                key={item.href}
                style={open ? { transitionDelay: `${40 + index * 40}ms` } : undefined}
                className={cn(
                  `transition-[opacity,transform] ${EASE_NORMAL}`,
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center gap-3 py-5"
                >
                  {active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
                  <span className="flex flex-col gap-1">
                    <span className="text-lg font-medium text-fg">{item.label}</span>
                    {item.description && (
                      <span className="text-sm text-fg-muted">{item.description}</span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-3 pt-8">
          <Button href={routes.contact} variant="secondary" size="lg" onClick={onClose}>
            Contact sales
          </Button>
          <Button href={routes.pricing} variant="primary" size="lg" onClick={onClose}>
            Start free trial
          </Button>
        </div>
      </nav>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
