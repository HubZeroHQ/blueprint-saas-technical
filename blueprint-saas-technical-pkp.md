# Blueprint Project Knowledge Package — blueprint-saas-technical (Nexora Systems)

---

# Identity

- **Blueprint name:** blueprint-saas-technical
- **Fictional product represented:** Nexora Systems — "the control plane for modern infrastructure" (a B2B infrastructure-provisioning/observability/governance SaaS)
- **Repository:** `https://github.com/HubZeroHQ/blueprint-saas-technical`
- **Version:** 1.0.0 (package.json); Blueprint Core sync at v1.5.0 (`.hubzero/VERSION`)
- **Status:** Built out and functionally complete — full route set implemented, motion/interaction polish pass applied, content pass applied (`About page stat formatting and content realism` commit). Latest commit: `chore: migrate platform to Blueprint Core v1.5`.
- **Architecture category:** SaaS (per `.hubzero/architecture/saas.md`)
- **Design language:** Technical (per `.hubzero/design/languages/technical.md`)
- **Purpose:** A HubZero Focused Blueprint — a production-quality reference implementation demonstrating how a B2B infrastructure SaaS marketing site should be engineered and designed under HubZero's standards, built on top of "Blueprint Base" shared infrastructure.

---

# Executive Summary

This blueprint demonstrates how HubZero builds a complete, believable B2B SaaS marketing website for a fictional infrastructure-tooling company, Nexora Systems, using Next.js App Router, React 19, TypeScript, and Tailwind CSS v4. It exists to show a downstream team (or an AI acting on their behalf) a concrete, working example of:

1. How Blueprint Base's shared engineering foundation (`src/config`, `src/seo`, `src/providers`, `src/lib`, `src/utils`, `src/types`, `src/components/layout`, `src/styles`) is consumed and extended by a specific blueprint without being duplicated or replaced.
2. How a specific Design Language ("Technical") is applied consistently across typography, motion, color, spacing, corners, borders, shadows, interaction, and component behavior — not just picked as a vibe.
3. How a SaaS Architecture's information hierarchy (problem → solution → features → pricing → proof → conversion) is expressed as an actual site map and page set.
4. How to be honest about being a static demonstration: no backend exists, so the contact form hands off to `mailto:` instead of faking a submission, the dashboard preview is a decorative `aria-hidden` illustration rather than live data, and the footer explicitly discloses "Nexora Systems is a fictional company."

It represents a **marketing/informational SaaS website**, not the product itself — there is no authenticated app, dashboard, or backend API behind it. The engineering problems it solves are: (a) building a fictional-but-credible SaaS narrative with internally consistent facts (pricing, SLAs, compliance claims, API surface), (b) implementing a distinctive, opinionated design language rigorously enough that it reads as a real design system rather than default Tailwind styling, and (c) doing so with accessibility, SEO, and predictable SSR/CSR rendering built in from the start rather than retrofitted.

---

# Technical Overview

## Stack

- **Framework:** Next.js 16.2.10, App Router, React 19.2.4 / React DOM 19.2.4
- **Language:** TypeScript 5, strict-mode project (`tsconfig.json`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), using the v4 `@theme inline` mechanism to map CSS custom properties to generated utility classes
- **Validation:** Zod v4 (env var validation, contact form validation)
- **Class utilities:** `class-variance-authority` (component variants, e.g. Button), `clsx` + `tailwind-merge` composed into a single `cn()` helper
- **Fonts:** `next/font/google` — Inter (`--font-inter`, sans, UI/body) and JetBrains Mono (`--font-jetbrains-mono`, mono, code/data/identifiers)
- **Tooling:** ESLint 9 + `eslint-config-next`, `@hubzero/blueprint` CLI as a dev dependency (the tool that syncs `.hubzero`)
- **License:** UNLICENSED (private blueprint repo)

## Routing & Rendering

Pure Next.js App Router file-based routing under `src/app/`. Every page is a Server Component by default; `"use client"` is applied narrowly and only where browser state is genuinely required (theme, scroll position, mobile menu, command palette, contact form, reveal animations, code-block copy button). Route inventory:

```
/                     home (page.tsx)
/product              product deep-dive (3-engine tabs, architecture diagram)
/features             full feature catalog by category
/integrations         integration grid
/security             security pillars, certifications, disclosure program
/pricing              plans + full comparison table
/docs                 doc hub (core concepts, SDKs)
/docs/quickstart       CLI quickstart walkthrough
/api                  REST API reference (auth, endpoints, rate limits)
/customers            case study index
/customers/[slug]     individual case study (dynamic route)
/blog                 blog index
/blog/[slug]          individual post (dynamic route)
/about                mission, values, team, stats
/careers              open roles
/contact              contact form (mailto-backed) + company info
/pricing, /security, /privacy, /terms  static legal/info pages
```

Framework-generated routes are treated with the same rigor as hand-built ones (per `.hubzero/principles.md` — Accessibility by Default): `loading.tsx` renders an `aria-live="polite"` status region rather than a bare spinner; `error.tsx` logs via the shared `logger` and offers a keyboard-reachable "Try again" / "Return home" recovery pair with a proper heading; `not-found.tsx` follows the same pattern. `robots.ts` and `sitemap.ts` are thin re-exports of shared SEO infrastructure (`src/seo/robots.ts`, `src/seo/sitemap.ts`), which itself derives sitemap entries from the same `routes` config plus the `blogPosts` and `caseStudies` data arrays — so dynamic content routes are never manually kept in sync with the sitemap.

`opengraph-image.tsx`, `icon.tsx`, and `apple-icon.tsx` are Next.js file-convention image routes generating branded social/favicon assets from code (via the `OgMark`/`Mark` brand components), not static image files.

## Data Flow

There is no backend, database, or CMS. All content is authored as typed TypeScript modules under `src/data/` (`features.ts`, `pricing.ts`, `blog.ts`, `customers.ts`, `testimonials.ts`, `integrations.ts`, `faq.ts`, `team.ts`, `careers.ts`), each exporting a typed array (e.g. `Feature[]`, `PricingPlan[]`). Pages import these arrays directly and render them server-side — there is no client-side fetching, loading state for data, or API layer for content. This keeps every page's content statically knowable at build time and fully crawlable.

Business/brand facts (company name, legal name, founding date, headquarters, contact emails, social links, mission, values) are centralized in `src/config/company.ts`, explicitly commented as "Fictional brand facts... Placeholder content for the blueprint — replace with a real company's details during customization." `src/config/site.ts` holds the product identity (name, tagline, description, canonical URL) that metadata, structured data, and the hero all derive from. `src/config/routes.ts` is the single source of truth for every path string in the app (including an `isRouteActive()` helper used by both desktop and mobile nav to compute the active link) — navigation, footer, sitemap, and internal links all reference it instead of hardcoding strings.

## Component Organization

```
src/components/
  brand/        Logo, Mark, OgMark — brand mark variants for chrome vs. OG image generation
  icons/        Single index.tsx exporting a typed IconKey-keyed icon set (inline SVG, no icon library dependency)
  layout/       Page (main#main-content), Container (max-w-7xl px), Section (py-16 md:py-24) — structural primitives from Blueprint Base
  marketing/    Page-level composed sections: Hero, FeatureGrid, PricingTable, ComparisonTable, TestimonialGrid,
                LogoCloud, FAQSection, CTASection, PageHeader, SectionHeading, StatsRow, BlogCard,
                IntegrationGrid, ArchitectureDiagram, DashboardPreview, ContactForm
  navigation/   Navbar, MobileNav, Footer, CommandPalette, ThemeToggle
  seo/          StructuredData (renders a JSON-LD <script> from a plain object)
  ui/           Design-system primitives: Button, Card, Badge, Avatar, Accordion, Tabs, Field (Input/Textarea/Label/FieldError),
                CodeBlock, Terminal, BarChart, Sparkline, StatusDot, Reveal
```

This is a fairly conventional "atomic-ish" split: `ui/` is architecture-agnostic and reusable across any blueprint, `marketing/` is SaaS-page-specific composition built on top of `ui/`, `layout/` is Blueprint Base structural scaffolding, `navigation/` and `brand/` are site-chrome. No component library (shadcn, Radix, MUI) is used — every primitive (Tabs, Accordion, CommandPalette, Field) is hand-built directly against the Technical design tokens.

## Styling

Tailwind v4's CSS-first configuration: `src/styles/tokens.css` defines every raw design token as a plain CSS custom property under `:root` and `:root[data-theme="dark"]` (plus a `prefers-color-scheme` media-query mirror for users who haven't made an explicit choice). `src/app/globals.css` imports Tailwind, imports `tokens.css`, then re-exposes those same variables through `@theme inline` so Tailwind generates utilities like `bg-accent`, `text-fg-muted`, `border-border`, `rounded-technical` that resolve to the live CSS variable — meaning the utility classes stay correct across theme swaps without any JS-driven class recalculation. There is exactly one radius token (`--radius` → `rounded-technical`) applied uniformly everywhere, per the Technical design language's Corner Language.

## Accessibility

- Skip-to-content link in the root layout, focusing `#main-content` (the `<main>` rendered by the shared `Page` component).
- `:focus-visible` outline driven by `--color-ring`, globally defined once in `globals.css`.
- `prefers-reduced-motion: reduce` globally collapses all animation/transition durations to ~0 and disables smooth scrolling — handled once in CSS, not per-component.
- Mobile nav and command palette use `inert` on the sibling content (`<header inert={mobileOpen}>`, `<div inert={!open}>` on the closed mobile panel) so assistive tech and tab order can't reach hidden/background content — not just `aria-hidden`.
- Command palette implements manual focus-trapping (Tab/Shift+Tab wraparound within the dialog), `role="dialog"` + `aria-modal`, a `listbox`/`option` pattern with `aria-activedescendant`, and full arrow-key/Enter/Escape keyboard control.
- `loading.tsx` uses `role="status"` + `aria-live="polite"` rather than a purely visual spinner.
- Contact form uses `aria-invalid` / `aria-describedby` wired to per-field error messages, and validates with Zod rather than relying on browser-native validation UI (`noValidate` is set explicitly).
- Decorative illustrations (`DashboardPreview`) are marked `aria-hidden="true"` since they convey no unique information beyond the surrounding text.

## Animation Philosophy

Motion is implemented as a small shared system, not ad hoc per-component transitions:
- `src/utils/motion.ts` exports `EASE_FAST` / `EASE_NORMAL` / `EASE_SLOW` (duration + easing utility strings) and `revealClasses()` / `revealDelayStyle()` helpers so every entrance animation in the app travels the same distance (`--reveal-distance: 10px`) and uses the same easing curve (`--ease-technical`), differing only in stagger delay.
- `src/hooks/useReveal.ts` is an `IntersectionObserver`-based hook that fires once per element (disconnects after first intersection — reveals never replay on scroll-back) and is carefully seeded to `false` on both server and client to avoid a hydration-mismatch flash.
- `src/components/ui/Reveal.tsx` wraps that hook into a drop-in component (`<Reveal index={n} step={ms}>`) used throughout marketing pages for staggered grid/list entrances.
- Durations are short (120/200/420ms) and near-linear, consistent with the Technical Motion Language: motion reports a state change, it doesn't perform.

## Responsive Strategy

Tailwind's default breakpoint system (`sm`/`lg` primarily), mobile-first. Desktop nav collapses to a full-screen `MobileNav` panel below `lg`; the command palette, theme toggle, and "Start free trial" CTA are hidden on mobile in favor of the hamburger menu. Grids throughout marketing components step from 1 → 2 → 3/4 columns at `sm`/`lg`. No separate mobile-specific components — the same components reflow via responsive utility classes.

---

# Design System

## Typography

Inter (sans) for all interface/body/heading text; JetBrains Mono reserved specifically for values that are literally technical — status labels, region/service identifiers, kbd hints (`⌘K`, `esc`), code snippets, terminal output, API method/path pairs, timestamps. This is a deliberate rule, not a stylistic accent: mono only appears where the underlying value actually is code, data, or a system identifier, per the Technical Typography Language. Hierarchy is scale + weight based (`text-4xl/5xl font-semibold tracking-tight` for H1s, `text-sm`/`text-lg` body variants) rather than novel sizes per component.

## Spacing

Grid-based and consistent: `Container` (max-w-7xl, `px-6 lg:px-8`) and `Section` (`py-16 md:py-24`) are the only two layout primitives every page composes from, so vertical rhythm and horizontal gutters never vary page to page. Card/grid gaps use a small fixed set (`gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-10`).

## Color

Neutral-first palette with a single signal-blue accent (`--color-accent: #3355e8` light / `#6e87ff` dark) used only for actionable/active state — links, active nav underline, primary buttons, focus ring, "act here" moments. Status colors (success/warning/danger) are reused as general state-reporting colors (e.g. a green `StatusDot` for "operational," not just for form validation). Two contrast fixes are explicitly documented in `tokens.css` comments: `--color-fg-subtle` was manually re-tuned in both themes to clear WCAG AA (4.83:1 light, 6.55:1 dark) after the original tone measured below 3.2:1 at the small text sizes it's actually used at (labels, timestamps, kbd hints) — evidence of an accessibility-driven token revision, not just an aesthetic one.

## Layout

12-column-ish implicit grid via Tailwind grid utilities, `max-w-7xl` global content width (`--container-width: 80rem`), everything anchored to the shared `Container`/`Section` primitives.

## Component Language

Every card, table, panel, and input shares one radius token, one border weight, one hover-elevation treatment (`Card`'s `interactive` variant lifts 2px on hover with a single soft shadow — the only shadow this language allows beyond the smallest overlay lift). Buttons use `class-variance-authority` for a closed set of variants (`primary` / `secondary` / `ghost`) × sizes (`sm`/`md`/`lg`), and can render as either a Next.js `Link` or a native `<button>` from one shared component depending on whether an `href` prop is passed — avoiding a parallel "LinkButton" component.

## Interaction Patterns

Hover/focus/active states are uniform: border-color shifts (`hover:border-border-strong`), background shifts (`hover:bg-surface-hover`), a `scale-[0.98]` active-press on buttons, and a color-only underline-scale animation for active nav links (`scale-x-0` → `scale-x-100`, driven by CSS `transform`, never width, to stay compositor-only). The signature interaction of this blueprint is the **⌘K command palette** — a fuzzy-searchable list of every route plus a theme-toggle action, fully keyboard-navigable, satisfying the Design Principles' "Signature Experience" requirement (one deliberate, memorable interaction, not five competing ones).

---

# Features

### Marketing narrative features (fictional product surface)
- **Declarative environments** — one manifest provisions identically across AWS/GCP/Azure (`/product`, illustrated with a real YAML example and a 4-step "manifest → plan → provision → observe" flow).
- **Golden path templates**, **drift detection** — Provisioning category features (`src/data/features.ts`).
- **Unified telemetry, SLO tracking, incident timelines** — Observability category.
- **Fine-grained RBAC, immutable audit log, policy guardrails (policy-as-code, e.g. `.rego` example)** — Access & Governance category.
- **Automated workflows, self-service provisioning, cost automation** — Automation category.
- Each feature has an `id`, `title`, `description`, `category`, and `icon` (typed `IconKey`) — `FeatureGrid` renders them uniformly and `/features` can filter/group by the four fixed categories.

### Engineering features (implementation-level, not narrative)
- **Command palette (⌘K)** — global fuzzy nav + action launcher (`CommandPalette.tsx`).
- **Theme system** — light/dark with `localStorage` persistence (`nexora-theme` key), system-preference fallback, and a blocking inline `themeInitScript` in `<head>` that sets `data-theme` before first paint to prevent a flash of incorrect theme. `mounted` is exposed from `useTheme()` specifically so consumers can gate theme-dependent rendering until the client has synced past hydration.
- **Contact form** — Zod-validated client form that, in the absence of a backend, hands off to a generated `mailto:` link rather than faking a submission (see Engineering Decisions).
- **Dynamic routes with static data** — `/blog/[slug]` and `/customers/[slug]` read from `blogPosts`/`caseStudies` arrays; sitemap entries are generated from those same arrays so new posts/case studies automatically appear in the sitemap.
- **JSON-LD structured data** — Organization, SoftwareApplication, WebSite, and BreadcrumbList schemas (`src/seo/structuredData.ts`) rendered via a generic `<StructuredData data={...}>` component.
- **Copy-to-clipboard code blocks** and a styled **Terminal** component for CLI-output illustrations, both purely presentational/client-side.
- **Sparkline / BarChart** — small inline SVG chart primitives (no charting library) used in the decorative `DashboardPreview` hero illustration.

Implementation approach across all of the above favors typed data + composition over configuration-driven abstraction — there's no CMS adapter, no generic "content block" renderer, and no feature-flagging system, because none of that complexity is earned by a static content site.

---

# Engineering Decisions

- **No backend, and no pretending otherwise.** The contact form could have faked a "Thanks, we'll be in touch" success state with nothing behind it. Instead it validates with Zod and then opens the visitor's own email client via a `mailto:` link, with a follow-up screen honestly stating "Your email client should now be open." This directly implements `.hubzero/principles.md`'s "Honest Demonstration Over Simulated Functionality." Tradeoff: less polished than a real form submission, but never misleads a visitor who tests it.
- **Theme state initialized twice, deliberately.** Both a blocking inline script (`themeInitScript`, runs before React hydrates, sets `data-theme` synchronously to avoid a flash) and a React-side `ThemeProvider` (starts at `"light"` on both server and client, then syncs the real value in a `useEffect` after mount) exist because neither alone is sufficient: the inline script prevents visual flash but can't drive React state; a naive React-only approach would either flash or hydration-mismatch. The tradeoff accepted is a few lines of near-duplicated theme-reading logic (inline JS string + `readStoredTheme()`) in exchange for correctness on both axes.
- **Reveal-on-scroll seeded `false` on server and client alike**, explicitly rejecting the tempting shortcut of checking `typeof IntersectionObserver !== "undefined"` to seed initial visibility — that check is available on the client but not during SSR, which would produce exactly the SSR/CSR mismatch `.hubzero/principles.md` warns against ("Predictable Client/Server Rendering"). The tradeoff: content is invisible for one extra tick after mount on capable browsers, in exchange for zero hydration warnings.
- **One shared motion vocabulary (`utils/motion.ts`) instead of per-component durations.** Every reveal, hover, and transition draws from three fixed duration/easing pairs and one fixed reveal distance. This trades a small amount of per-component flexibility for the Technical language's core promise — that motion "reads as one system."
- **`routes.ts` as the only source of path strings.** Navigation, footer, sitemap, breadcrumbs, and the command palette all import from it. This was clearly a deliberate anti-duplication decision (`.hubzero/principles.md` — Composition Over Duplication) rather than an accident of convenience, given how consistently it's referenced.
- **No icon library dependency.** `src/components/icons/index.tsx` hand-rolls a small typed SVG icon set (`IconKey`) instead of pulling in `lucide-react`/`heroicons`. Keeps bundle size and visual consistency (stroke width, viewBox) fully controlled, at the cost of manually adding new icons.
- **No component library.** Tabs, Accordion, CommandPalette, and form Fields are hand-built rather than sourced from Radix/shadcn. This maximizes fidelity to the Technical design tokens (every focus ring, border, and radius traces back to the same CSS variables) at the cost of reimplementing some accessibility plumbing (focus trap, roving tabindex) that a library would provide for free.

---

# Reusable Patterns

- **Reveal/stagger system** (`useReveal` + `revealClasses`/`revealDelayStyle` + `<Reveal index step>`): a general-purpose, hydration-safe scroll-entrance pattern applicable to any blueprint that wants one-time viewport reveals without a hydration mismatch or an animation library.
- **`cn()` (clsx + tailwind-merge)** composition helper — standard but consistently applied everywhere className merging happens.
- **CVA-based polymorphic Button** (`href` prop switches between `<Link>` and `<button>` from one component/prop surface) — a reusable pattern for any component that needs to be "sometimes a link, sometimes a button" without a consumer-facing API split.
- **`routes.ts` + `isRouteActive()`** — centralized route table with a shared "is this the active route" predicate consumed identically by desktop nav, mobile nav, and (implicitly) breadcrumb generation.
- **`createMetadata()` + `seoDefaults`** — a single metadata factory every page's `export const metadata` calls into, so canonical URLs, OG/Twitter fallbacks, and title templating are correct by construction rather than re-derived per page.
- **Data-array-drives-sitemap pattern** — sitemap entries for dynamic routes (`blog/[slug]`, `customers/[slug]`) are generated from the same typed arrays the pages themselves render from, so content and discoverability can never drift apart.
- **Theme-flash prevention pattern** (blocking inline script + `suppressHydrationWarning` on `<html>` + client-side re-sync in an effect) — directly reusable in any Next.js App Router blueprint needing persisted dark mode.

---

# Lessons Learned

- **Accessibility fixes surface as measurable contrast corrections, not vague guidance.** The `--color-fg-subtle` token was tuned with an explicit before/after contrast ratio comment in both themes — a concrete example of "Accessibility by Default" being enforced as a testable property (WCAG AA ratios) rather than a checklist afterthought.
- **Hydration-safety has to be designed into hooks/providers from the start, not patched in.** Both `ThemeProvider` and `useReveal` show the same underlying lesson: any state that depends on `window`, `localStorage`, or `matchMedia` must render identically on the first client pass as it did on the server, with the real value synced only after mount. Retrofitting this after building "the obvious version" (read localStorage directly into `useState`) would have meant hunting down hydration warnings after the fact.
- **A design language is only as strong as its narrowest rule.** The Technical language's insistence that mono type only appears on genuinely technical values (not as a decorative accent) required discipline across dozens of components — it would have been easy to reach for mono type anywhere "code-adjacent" felt right instead of only where the underlying value is actually a system output.
- **Being honest about a missing backend is a design decision, not a limitation to hide.** The mailto-based contact form and the "Nexora Systems is a fictional company" footer disclosure show that HubZero treats simulated functionality as a trust violation, not a corner that's fine to cut for demo polish.

---

# Notable Components

- **`Navbar.tsx`** — Sticky header with scroll-aware background (`useScrolled` hook independently derives whether to show a blurred background, decoupled from mobile-menu or hero-visibility state per the "Interface State Should Be Independently Derived" principle), global `⌘K`/`Ctrl+K` listener, and `inert` applied to itself while the mobile panel is open.
- **`CommandPalette.tsx`** — Full keyboard-driven command launcher: focus trap, `listbox`/`option` ARIA pattern, live filtering over a static `COMMANDS` table, state reset on open/close computed during render (not in an effect) to avoid an extra render pass.
- **`ThemeProvider.tsx`** — Documented, hydration-safe theme context; exposes `mounted` specifically so consumers can gate on "has the client synced the real theme yet."
- **`ArchitectureDiagram.tsx`** — Sources → Nexora control plane → Targets pipeline visualization with sequential per-column/per-arrow reveal timing, built entirely from the shared `Reveal`/motion primitives rather than a diagramming library.
- **`DashboardPreview.tsx`** — Purely decorative (`aria-hidden`) hero illustration composed from `BarChart`, `Sparkline`, and `StatusDot` primitives to look like a real product screen, honoring the Technical Photography Language's preference for authentic-looking product UI over stock imagery — while never claiming to be live data.
- **`ContactForm.tsx`** — Zod-schema-validated form with per-field error state and the mailto hand-off pattern described above.
- **`CodeBlock.tsx` / `Terminal.tsx`** — Paired presentational primitives for static code and simulated CLI output, sharing a chrome style (traffic-light dots vs. filename header) but each tuned to its own content type (line-typed coloring for Terminal; copy-button affordance for CodeBlock).
- **`Button.tsx`** — CVA-variant, polymorphic link/button component; the single source of every clickable CTA's visual treatment in the app.
- **`Reveal.tsx` / `useReveal.ts`** — The load-bearing motion primitive nearly every page composes with.

---

# Developer Notes

- `.hubzero` is read-only from the blueprint's perspective — it is Blueprint Core, synced by the `@hubzero/blueprint` CLI dev dependency, and must never be hand-edited inside this repo.
- Shared infrastructure (`src/config`, `src/seo`, `src/providers`, `src/lib`, `src/utils`, `src/types`, `src/components/layout`, `src/styles`) is Blueprint Base territory — new blueprint-specific work should sit on top of it (e.g. add a new `src/data/*.ts` file, a new `marketing/` component), not fork or replace it.
- `env.ts` validates `NODE_ENV` via Zod at import time — a minimal but real example of the "Configuration Over Hardcoding" / fail-fast pattern; there are currently no other required environment variables (no API keys, no analytics IDs), consistent with there being no backend.
- `logger.ts` is a thin console wrapper (timestamped `info`/`warn`/`error`) used by `error.tsx` — there's no external error-reporting service wired in, which is appropriate for a backend-less demonstration site.
- Fonts are loaded via `next/font/google` with `display: "swap"` and exposed as CSS variables consumed by the `@theme inline` block — changing the font family means changing the `next/font` import and the corresponding `--font-*` variable name in exactly one place (`globals.css`).
- The `/customers/[slug]` and `/blog/[slug]` dynamic routes both source from typed arrays in `src/data/`, not from an external CMS — adding a new blog post or case study means adding an object to the corresponding array, and the sitemap picks it up automatically.

---

# Interesting Engineering

- The **theme-flash prevention** approach (synchronous inline script + deliberately-"light"-seeded React state + post-mount resync) solves a genuinely hard problem — persisted dark mode without either a flash-of-wrong-theme or a hydration warning — with a small, fully auditable amount of code, and the code comments explain *why* each piece exists rather than just what it does.
- The **reveal system's insistence on identical seed state** (`useState(false)` on both server and client for `useReveal`) despite `IntersectionObserver` being trivially feature-detectable is a subtle, easy-to-get-wrong correctness detail that the codebase gets right and documents explicitly in a comment — a good example of the "Predictable Client/Server Rendering" principle being applied at the hook level rather than only at the page level.
- The **manually re-measured contrast tokens** (`--color-fg-subtle` in both themes) with ratio numbers left in the CSS as comments turn an invisible accessibility fix into a self-documenting, re-verifiable decision for the next engineer who touches the palette.
- The **`ArchitectureDiagram`'s sequential reveal** (`step` values 0/1/2/3/4 mapped across columns and arrows via one shared `revealDelayStyle` helper) produces a "pipeline assembling itself" effect using nothing but CSS `transition-delay` — no animation library, no JS timing loop.

---

# Limitations

This blueprint intentionally does not attempt to solve, and should not be mistaken for:

- **A real product.** There is no authentication, no user accounts, no actual infrastructure provisioning, no real API behind `/api`'s documented endpoints — the API reference, CLI, and SDK install snippets are illustrative copy, not working software.
- **A working contact/lead-capture pipeline.** The contact form does not submit anywhere; it opens the visitor's email client. There is no CRM integration, no email service, no server-side form handling.
- **A CMS or dynamic content system.** Blog posts and case studies are hardcoded TypeScript data, not sourced from a headless CMS, database, or MDX pipeline.
- **Payment or billing infrastructure.** Pricing is presented informationally; there is no checkout, no Stripe integration, no plan-selection flow beyond a "Contact sales" / "Start free" CTA link.
- **Internationalization.** The site is English-only, single-locale (`en_US`), with no i18n routing or translation infrastructure.
- **Analytics/telemetry.** No analytics provider, consent banner, or tracking script is wired in.
- **Testing infrastructure.** There is no visible unit/e2e test suite in the repository; correctness is currently enforced only via TypeScript and ESLint.

---

# Suggested Tags

`hubzero`, `blueprint`, `saas`, `b2b-saas`, `infrastructure-platform`, `developer-tools`, `nextjs`, `nextjs-app-router`, `react-19`, `typescript`, `tailwindcss-v4`, `design-system`, `technical-design-language`, `dark-mode`, `command-palette`, `accessibility`, `seo`, `structured-data`, `static-content-site`, `no-backend-demo`, `zod-validation`, `marketing-site`

---

# Structured Summary

```yaml
name: blueprint-saas-technical
type: HubZero Focused Blueprint (SaaS marketing website)
status: built out, content and motion polish passes applied
repository: https://github.com/HubZeroHQ/blueprint-saas-technical
technologies:
  - Next.js 16 (App Router)
  - React 19
  - TypeScript 5
  - Tailwind CSS v4
  - Zod v4
  - class-variance-authority
  - clsx / tailwind-merge
  - next/font (Inter, JetBrains Mono)
architecture: SaaS
design_language: Technical
domains:
  - saas
  - developer-tools
  - infrastructure-platform
  - b2b-marketing-site
primary_language: TypeScript
platforms:
  - web
difficulty: intermediate-to-advanced (design-system fidelity, hydration-safe theming/motion, SEO infra)
maturity: reference-implementation-complete, no backend/tests
key_features:
  - Declarative multi-cloud provisioning narrative (product/features pages)
  - Command palette (Cmd/Ctrl+K) global navigation
  - Persisted light/dark theme with flash-free hydration
  - Zod-validated contact form with mailto hand-off (no backend)
  - JSON-LD structured data (Organization, SoftwareApplication, WebSite, BreadcrumbList)
  - Data-driven sitemap covering static and dynamic (blog/customer) routes
  - Scroll-triggered reveal/stagger animation system
  - Full SaaS information architecture (product, features, integrations, security, pricing, docs, API, customers, blog, about, careers, contact)
engineering_highlights:
  - Hydration-safe theme initialization (blocking inline script + React resync)
  - Hydration-safe IntersectionObserver reveal hook seeded identically on server/client
  - Centralized route table (routes.ts) with shared active-route predicate
  - Single shared motion vocabulary (duration/easing/reveal-distance tokens)
  - Manually re-verified WCAG AA contrast tokens with ratio documentation in CSS
  - Honest-demonstration pattern for missing backend (mailto form, aria-hidden decorative dashboard, fictional-company disclosure)
related_projects:
  - HubZero Blueprint Base (shared engineering foundation this blueprint extends)
keywords:
  - hubzero
  - blueprint
  - nextjs
  - tailwindcss
  - saas
  - technical design language
  - infrastructure control plane
  - command palette
  - dark mode
  - accessibility
  - seo
  - structured data
  - zod
```
