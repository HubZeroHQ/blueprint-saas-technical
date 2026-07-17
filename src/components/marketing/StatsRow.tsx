"use client";

import { useEffect, useState } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";
import { EASE_SLOW, revealDelayStyle } from "@/utils/motion";

interface Stat {
  value: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
  /** Column count at the `sm` breakpoint and up. Mobile is always 2-up
   *  (or 1-up for a 3-stat row, so it never splits 3 into 2+1). */
  columns?: 3 | 4;
}

// Full literal class strings so Tailwind's compiler can find them —
// a template-interpolated `sm:grid-cols-${columns}` would not be detected.
const COLUMN_CLASSES: Record<NonNullable<StatsRowProps["columns"]>, string> = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

// Matches an optional leading prefix, a run of digits (with optional
// thousands separators), and a trailing suffix — e.g. "180+" -> ("", 180,
// "+") or "$500K" -> ("$", 500, "K"). Values with no digit run (a city
// name, a year written as words) return null and just fade in as-is.
const NUMERIC_PATTERN = /^(\D*)([\d,]+)(.*)$/;

function parseStat(value: string) {
  const match = value.match(NUMERIC_PATTERN);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const number = Number(digits.replace(/,/g, ""));
  if (Number.isNaN(number)) return null;
  return { prefix, number, suffix };
}

const COUNT_UP_MS = 600;

function StatValue({ value, animate }: { value: string; animate: boolean }) {
  const parsed = parseStat(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!animate || !parsed) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let frame: number;
    const start = performance.now();

    // The first frame lands at ~0ms elapsed, so progress starts at ~0 —
    // no separate "reset to 0" setState is needed before this kicks off.
    function tick(now: number) {
      const progress = Math.min((now - start) / COUNT_UP_MS, 1);
      const current = Math.round(parsed!.number * progress);
      setDisplay(`${parsed!.prefix}${current.toLocaleString("en-US")}${parsed!.suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Runs once, the first time `animate` flips true — count-up plays a
    // single time per the Technical motion language, never re-triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return <>{display}</>;
}

export function StatsRow({ stats, columns = 4 }: StatsRowProps) {
  const { ref, visible } = useReveal<HTMLDListElement>();

  return (
    <dl
      ref={ref}
      className={cn(
        "grid gap-px overflow-hidden rounded-technical border border-border bg-border",
        COLUMN_CLASSES[columns]
      )}
    >
      {stats.map((stat, index) => (
        // `min-w-0` overrides the grid item's default `min-width: auto`,
        // which otherwise sizes the column to fit unbroken content (e.g.
        // "180+ employees") and blows out the equal-width track instead of
        // letting the value wrap. This is what makes long values safe by
        // default rather than a per-stat fix.
        <div
          key={stat.label}
          style={revealDelayStyle(index, 60)}
          className={cn(
            "flex min-w-0 flex-col gap-1.5 bg-surface p-4 transition-[opacity,transform] sm:p-6",
            EASE_SLOW,
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[var(--reveal-distance)]"
          )}
        >
          <dt className="text-sm text-fg-muted">{stat.label}</dt>
          <dd className="break-words font-mono text-xl font-semibold leading-tight text-fg sm:text-2xl lg:text-3xl">
            <StatValue value={stat.value} animate={visible} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
