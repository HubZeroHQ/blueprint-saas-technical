import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { StatusDot } from "@/components/ui/StatusDot";
import { company } from "@/config/company";
import { footerGroups } from "@/config/footer";
import { site } from "@/config/site";
import { EASE_FAST } from "@/utils/motion";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.description}
            </p>
            <Link
              href="/security"
              className={`inline-flex w-fit items-center gap-2 rounded-technical border border-border px-2.5 py-1.5 text-xs text-fg-muted transition-colors ${EASE_FAST} hover:border-border-strong`}
            >
              <StatusDot tone="success" live />
              All systems operational
            </Link>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm text-fg-muted transition-colors ${EASE_FAST} hover:text-fg`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} {company.legalName} All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <SocialLink href={company.social.github} label="GitHub">
              <GitHubIcon />
            </SocialLink>
            <SocialLink href={company.social.x} label="X">
              <XIcon />
            </SocialLink>
            <SocialLink href={company.social.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
          </div>
        </div>

        <p className="mt-6 text-xs text-fg-subtle">
          Nexora Systems is a fictional company. This site is a demonstration built on the{" "}
          <a
            href={site.author.url}
            target="_blank"
            rel="noreferrer noopener"
            className={`underline-offset-4 transition-colors ${EASE_FAST} hover:text-fg-muted hover:underline`}
          >
            HubZero Blueprint
          </a>{" "}
          ecosystem.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={`text-fg-subtle transition-colors ${EASE_FAST} hover:text-fg`}
    >
      {children}
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.53 6.78 15.17 0h-1.34l-4.9 5.89L4.98 0H0l5.92 8.89L0 16h1.34l5.18-6.22L10.68 16h4.98L9.53 6.78zM7.7 8.98l-.6-.87L2.33 1.04h2.06l3.85 5.6.6.87 5.01 7.28h-2.06L7.7 8.98z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.58 5.4H.6V15h2.98V5.4zM2.1.4C1.1.4.4 1.1.4 2.02c0 .9.7 1.62 1.68 1.62.99 0 1.7-.71 1.7-1.62C3.78 1.1 3.08.4 2.1.4zM15.6 15h-2.98v-5.13c0-1.3-.47-2.18-1.63-2.18-.89 0-1.42.6-1.65 1.18-.09.2-.11.49-.11.77V15H6.25s.04-8.86 0-9.6h2.98v1.36c.4-.61 1.11-1.49 2.7-1.49 1.97 0 3.45 1.29 3.45 4.05V15z" />
    </svg>
  );
}
