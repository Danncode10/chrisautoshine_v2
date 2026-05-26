---
name: project-stack-migration
description: Chris Auto Shine Detailing migrated from Vite+JSX to Next.js 16 + TypeScript on the Dannflow branch, following the business-template structure
metadata:
  type: project
---

Migrated chris-auto-shine from Vite + React JSX to Next.js 16.2.1 + TypeScript on the `Dannflow` branch.

**Why:** User wants all client sites to follow the dannflow structure from https://github.com/Danncode10/business-template — which is a Next.js + TypeScript + Supabase template.

**How to apply:** Always work in Next.js App Router patterns (src/app/, server components by default, "use client" for interactive components). Use the business-template as upstream (`git remote upstream`).

New structure:
- `src/app/` — layout.tsx, page.tsx, globals.css
- `src/components/landing/` — hero, services, packages, about, contact-block, social-proof-bar
- `src/components/` — navbar.tsx, footer.tsx
- `src/lib/` — config.ts (siteConfig), utils.ts (cn)
- `docs/SUPABASE_PLAN.md` — shared Supabase plan
- `business.json` — single source of truth for client data
- Tailwind v4 (postcss `@tailwindcss/postcss`), no tailwind.config.js

Key files: [[project-supabase-plan]], src/lib/config.ts for all contact/social/socialProof data.
