import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    ...props,
  };
}

export function ServerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="14" height="5.5" rx="1.25" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="11.5" width="14" height="5.5" rx="1.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 5.75H6.01M6 14.25H6.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 17V3M3 17H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 13.5L9 9.5L11.5 12L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M10 2.5L16.5 5V9.5C16.5 13.5 13.75 16.5 10 17.5C6.25 16.5 3.5 13.5 3.5 9.5V5L10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.3 9.8L9.1 11.6L12.8 7.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11 2.5L4.5 11H9.5L9 17.5L15.5 9H10.5L11 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 9V6.5a3.5 3.5 0 017 0V9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 12.25V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function PlugIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 2.5V6.5M13 2.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4.5 6.5H15.5V9C15.5 12 13 14.5 10 14.5C7 14.5 4.5 12 4.5 9V6.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 14.5V17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M3.5 4.25C3.5 3.56 4.06 3 4.75 3H10V16H4.75C4.06 16 3.5 15.44 3.5 14.75V4.25Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 4.25C16.5 3.56 15.94 3 15.25 3H10V16H15.25C15.94 16 16.5 15.44 16.5 14.75V4.25Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.75 10H17.25M10 2.75C11.8 4.7 12.8 7.25 12.8 10C12.8 12.75 11.8 15.3 10 17.25C8.2 15.3 7.2 12.75 7.2 10C7.2 7.25 8.2 4.7 10 2.75Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 2.5L17 6.5L10 10.5L3 6.5L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 10.5L10 14.5L17 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 14.25L10 18.25L17 14.25" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function BranchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="5" cy="4.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="15.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="9.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 6.25V13.75M5 8C5 10.5 6.5 11.25 9.5 11.25H13.25" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 5.75V10L13 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CodeBracketsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 4.5L2.5 10L7 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 4.5L17.5 10L13 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10H16M16 10L11.5 5.5M16 10L11.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const ICONS = {
  server: ServerIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  lock: LockIcon,
  plug: PlugIcon,
  book: BookIcon,
  globe: GlobeIcon,
  layers: LayersIcon,
  branch: BranchIcon,
  clock: ClockIcon,
  code: CodeBracketsIcon,
} as const;

export type IconKey = keyof typeof ICONS;
