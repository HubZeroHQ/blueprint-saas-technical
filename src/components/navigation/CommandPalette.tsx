"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { routes } from "@/config/routes";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

interface Command {
  id: string;
  label: string;
  group: "Navigate" | "Action";
  keywords?: string;
  run: (helpers: { router: ReturnType<typeof useRouter>; toggleTheme: () => void }) => void;
}

const COMMANDS: Command[] = [
  { id: "home", label: "Home", group: "Navigate", run: ({ router }) => router.push(routes.home) },
  { id: "product", label: "Product", group: "Navigate", run: ({ router }) => router.push(routes.product) },
  { id: "features", label: "Features", group: "Navigate", run: ({ router }) => router.push(routes.features) },
  { id: "integrations", label: "Integrations", group: "Navigate", run: ({ router }) => router.push(routes.integrations) },
  { id: "security", label: "Security", group: "Navigate", run: ({ router }) => router.push(routes.security) },
  { id: "pricing", label: "Pricing", group: "Navigate", run: ({ router }) => router.push(routes.pricing) },
  { id: "docs", label: "Documentation", group: "Navigate", keywords: "docs guides", run: ({ router }) => router.push(routes.docs) },
  { id: "api", label: "API reference", group: "Navigate", run: ({ router }) => router.push(routes.api) },
  { id: "customers", label: "Customer stories", group: "Navigate", run: ({ router }) => router.push(routes.customers) },
  { id: "blog", label: "Blog", group: "Navigate", run: ({ router }) => router.push(routes.blog) },
  { id: "about", label: "About Nexora", group: "Navigate", keywords: "company team mission", run: ({ router }) => router.push(routes.about) },
  { id: "careers", label: "Careers", group: "Navigate", run: ({ router }) => router.push(routes.careers) },
  { id: "contact", label: "Contact sales", group: "Navigate", run: ({ router }) => router.push(routes.contact) },
  { id: "theme", label: "Toggle light / dark theme", group: "Action", keywords: "appearance dark mode light mode", run: ({ toggleTheme }) => toggleTheme() },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toggleTheme } = useTheme();

  // Reset search state whenever the palette transitions open/closed.
  // Adjusting state directly during render (rather than in an effect)
  // avoids an extra render pass — see the React docs on resetting
  // state when a prop changes.
  if (open !== prevOpen) {
    setPrevOpen(open);
    setQuery("");
    setActiveIndex(0);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (command) =>
        command.label.toLowerCase().includes(q) ||
        command.keywords?.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const container = dialogRef.current;
    if (!container) return;

    const focusable = container.querySelectorAll<HTMLElement>(
      'input, button, [href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  const runCommand = useCallback(
    (command: Command) => {
      command.run({ router, toggleTheme });
      onClose();
    },
    [router, toggleTheme, onClose]
  );

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) runCommand(command);
    } else if (event.key === "Escape") {
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/50 [animation:overlay-in_var(--duration-normal)_var(--ease-technical)]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={handleDialogKeyDown}
        className="relative w-full max-w-lg overflow-hidden rounded-technical border border-border bg-surface shadow-elevated [animation:dialog-in_var(--duration-normal)_var(--ease-technical)]"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-technical)] focus-within:border-accent">
          <SearchIcon className="text-fg-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search pages and actions…"
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
            aria-autocomplete="list"
            aria-controls="command-palette-results"
            aria-activedescendant={
              results[activeIndex] ? `command-${results[activeIndex].id}` : undefined
            }
          />
          <kbd className="hidden rounded-[4px] border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:inline">
            esc
          </kbd>
        </div>

        <ul id="command-palette-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-fg-subtle">
              No results for &ldquo;{query}&rdquo;
            </li>
          )}
          {results.map((command, index) => (
            <li key={command.id}>
              <button
                id={`command-${command.id}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runCommand(command)}
                className={cn(
                  `flex w-full items-center justify-between rounded-[4px] px-3 py-2.5 text-left text-sm transition-colors ${EASE_FAST}`,
                  index === activeIndex ? "bg-accent-muted text-accent" : "text-fg"
                )}
              >
                {command.label}
                <span className="font-mono text-[10px] uppercase tracking-wide text-fg-subtle">
                  {command.group}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
