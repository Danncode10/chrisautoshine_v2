# CLAUDE.md — Chris Auto Shine

> Project-specific instructions for Claude Code. These override global defaults.

## Project Overview

Chris Auto Shine is a **Next.js 16 + TypeScript + Tailwind v4** landing page for a professional mobile car detailing business in Brisbane, QLD. It follows the **Dannflow** architecture — a shared business-template structure used across multiple client sites.

- **Live URL:** https://chrisautoshine.vercel.app
- **GitHub:** https://github.com/Danncode10/chrisautoshine_v2
- **Upstream template:** https://github.com/Danncode10/business-template

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme` block) |
| Animations | Framer Motion 12 |
| Forms | EmailJS (`@emailjs/browser`) |
| Icons | lucide-react + react-icons (Facebook/TikTok) |
| Toasts | Sonner |
| Database | Supabase (shared Dannflow project — see `docs/SUPABASE_PLAN.md`) |

## Key Files

```
business.json              # Single source of truth for all client content
src/lib/business-config.ts # Typed wrapper around business.json
src/lib/config.ts          # siteConfig for layout metadata (SEO)
src/lib/utils.ts           # cn() helper (clsx + tailwind-merge)
src/app/globals.css        # Tailwind theme, utilities, intro animation
src/app/layout.tsx         # Root layout, fonts, SEO metadata
src/app/page.tsx           # Landing page assembly
src/components/navbar.tsx  # Floating pill navbar
src/components/footer.tsx  # 4-column footer
src/components/landing/    # All landing sections
```

## Landing Sections (in order)

1. `hero.tsx` — Typewriter headline + WaterParticles + MagneticCTA + TiltCard
2. `social-proof-bar.tsx` — Rating, customers, years stats
3. `services.tsx` — Double-bezel cards with mouse-follow glow
4. `gallery.tsx` — 6-image hover grid
5. `how-it-works.tsx` — 3-step staircase with terminal cards
6. `packages.tsx` — Tabbed pricing (Exterior/Interior/Exclusive) + extras
7. `cta-banner.tsx` — Radial glow CTA
8. `contact-block.tsx` — EmailJS form + map

## Content Editing

**Always edit `business.json`** to change client-facing copy, contact info, social links, or social proof numbers. The config is read at build time — no code changes needed for content updates.

## Dev Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run setup:env    # Copy .env.example → .env.local
```

## Environment Variables

Copy `.env.example` to `.env.local` before running locally. Required vars:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

Supabase vars are optional until the shared project is configured (see `docs/SUPABASE_PLAN.md`).

## Conventions

- **Colors:** Always use `var(--color-primary)` / Tailwind `bg-primary` etc. Never hardcode `#DC2626` in components.
- **Animations:** All scroll-triggered via `whileInView` + `viewport={{ once: true }}`. Respect `prefers-reduced-motion`.
- **Icons:** lucide-react for UI icons. `react-icons/fa` only for social brand icons (Facebook/TikTok).
- **No auth:** This is a landing page. Do not add Supabase auth until explicitly requested.
- **Commits on Dannflow branch:** Auto-commit permitted at each meaningful stage.

## Branch Strategy

- `main` — production-ready
- `Dannflow` — active development branch (auto-commit enabled)

## Supabase (Future)

This project uses a **shared** Supabase project with RLS isolation via `app_id = 'chris-auto-shine'`. See `docs/SUPABASE_PLAN.md` for the full plan. Do not set up Supabase until explicitly asked.
