# SKILLS.md — Chris Auto Shine Detailing

Available Claude skills and commands for this project.

## Usage

Type `/skill-name` in the Claude Code prompt to invoke a skill.

## Available Skills

| Command | Description |
|---------|-------------|
| `/build` | Run `npm run build` and report any TypeScript or Next.js errors |
| `/lint` | Run ESLint and show issues with file + line references |
| `/review` | Full code review of staged or recent changes |
| `/ultrareview` | Multi-agent cloud review of the current branch (billed, thorough) |

## Quick Reference

### Content Updates

To update any client-facing text, prices, or contact info — **edit `business.json` only**. The entire site reads from it via `src/lib/business-config.ts`.

### Adding a New Landing Section

1. Create `src/components/landing/your-section.tsx`
2. Use `"use client"` if it has any animations or interactivity
3. Use `<Typewriter>` for section headings (imported from `./typewriter`)
4. Use double-bezel card pattern: `rounded-3xl p-px bg-gradient-to-br from-white/10 ... inner-highlight`
5. Wrap reveal animations in `whileInView` + `viewport={{ once: true }}`
6. Import and add to `src/app/page.tsx`

### Changing the Color Theme

All brand colors are in `src/app/globals.css` under `@theme`. Currently:
- Primary: `#DC2626` (red)
- Background: `#000000` (OLED black)

### UI must work in Safari AND Chrome

When building or editing any UI, target **both browsers equally**. The common
pitfall: Tailwind v4 compiles alpha modifiers (`bg-white/5`, `border-white/[0.07]`,
`divide-white/10`, `text-white/40`) into `color-mix()`, which **Safari renders
inconsistently** — borders and panels can blow out to near-full white (a harsh
outlined box that looks fine in Chrome).

**Always use solid semantic tokens for surfaces, borders, dividers, and base text:**
`bg-background` · `bg-card` · `bg-muted` · `border-border` · `divide-border` ·
`text-foreground` · `text-muted-foreground` · `bg-primary`. These are flat colors
and render pixel-identically in Safari and Chrome. Run `/ui` to auto-enforce this.

### EmailJS Setup

1. Create account at emailjs.com
2. Add service + template (fields: `user_name`, `user_email`, `message`)
3. Add auto-reply template
4. Paste keys into `.env.local`

### Deploying to Vercel

```bash
# Push to main → auto-deploys on Vercel
git push origin main
```

Set environment variables in Vercel dashboard (match `.env.example`).
