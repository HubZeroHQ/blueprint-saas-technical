"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export function Tabs({ items, className }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const baseId = useId();

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Categories"
        className="flex flex-wrap gap-1 border-b border-border"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={cn(
                `group relative px-4 py-3 text-sm font-medium transition-colors ${EASE_FAST}`,
                isActive ? "text-fg" : "text-fg-muted hover:text-fg"
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  `absolute inset-x-0 -bottom-px h-0.5 origin-center bg-accent transition-transform ${EASE_FAST}`,
                  isActive ? "scale-x-100" : "scale-x-0"
                )}
              />
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          className={cn(
            "pt-8",
            item.id === activeId &&
              "[animation:content-in_var(--duration-normal)_var(--ease-technical)]"
          )}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
