"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/config/navigation";
import { isRouteActive, routes } from "@/config/routes";
import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

import { CommandPalette } from "./CommandPalette";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        inert={mobileOpen}
        className={cn(
          `sticky top-0 z-30 border-b transition-colors ${EASE_FAST}`,
          scrolled
            ? "border-border bg-bg/95 backdrop-blur-sm"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <Link href={routes.home} className="shrink-0" aria-label="Nexora Systems home">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    `group relative px-3 py-2 text-sm font-medium transition-colors ${EASE_FAST}`,
                    active ? "text-fg" : "text-fg-muted hover:text-fg"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      `absolute inset-x-3 -bottom-px h-0.5 origin-center scale-x-0 transition-transform ${EASE_FAST}`,
                      active ? "scale-x-100 bg-accent" : "bg-fg-muted group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className={`hidden items-center gap-2 rounded-technical border border-border px-3 py-2 text-sm text-fg-subtle transition-colors ${EASE_FAST} hover:border-border-strong hover:text-fg-muted lg:flex`}
            >
              Search
              <kbd className="rounded-[4px] border border-border px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle className="hidden lg:inline-flex" />

            <Button href={routes.pricing} size="sm" className="hidden lg:inline-flex">
              Start free trial
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((isOpen) => !isOpen)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-technical border border-border text-fg transition-colors ${EASE_FAST} hover:border-border-strong lg:hidden`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} items={navigation} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
