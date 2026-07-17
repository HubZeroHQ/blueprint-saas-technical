"use client";

import { useState } from "react";

import { CheckIcon } from "@/components/icons";
import { cn } from "@/utils/cn";
import { EASE_FAST } from "@/utils/motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className={cn(
        // `min-w-0` lets this shrink below its content's natural width
        // when placed in a grid or flex item — otherwise a long
        // unbroken code line blows out the column instead of letting
        // the `<pre>` below scroll horizontally within its own bounds.
        "min-w-0 overflow-hidden rounded-technical border border-border bg-[var(--color-code-bg)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-white/50">
          {filename ?? language ?? "shell"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            `inline-flex items-center gap-1.5 font-mono text-xs transition-colors ${EASE_FAST}`,
            copied ? "text-success" : "text-white/50 hover:text-white"
          )}
        >
          {copied && <CheckIcon className="h-3 w-3" />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code className="font-mono text-[var(--color-code-fg)]">{code}</code>
      </pre>
    </div>
  );
}
