# Cipher Landing Page — Frontend Team Handoff

## IMPORTANT CONTEXT

This is ONLY the marketing landing page for Cipher. It is a separate page from the existing application (the dashboard/app that users see after signing in). 

**DO NOT touch the existing application UI.** The current user experience inside the app (Vercel deployment at `game-tape-digest.vercel.app`) stays exactly as-is. This landing page is an addition — it's the first thing visitors see before they sign in or request access.

---

## What This Is

A premium dark-mode marketing landing page with 7 sections:

1. **Navbar** — Fixed top nav with "CIPHER" logo, tagline, Sign In + Request Access buttons
2. **Hero** — "Know what to talk about before anyone else does" + CTA
3. **Sameness** — 6 network cards (ESPN, The Athletic, TNT, CBS, FS1, NBC) showing identical headlines
4. **Convergence Funnel** — Interactive 3-state visualization (NBA/MLB/NFL) with data labels, gold bezier lines, and insight cards
5. **Delivery** — How intelligence gets delivered (constellation viz, alert cards, phone mockup)
6. **Emotion** — "You fell in love with this game"
7. **Audience** — 3 persona cards (producers, hosts, sports obsessives)
8. **Final CTA** — Request early access + footer

---

## Tech Stack

- **Next.js 16.1.6** (App Router)
- **React 19.2.3**
- **TailwindCSS 4** (using `@theme inline` for custom properties)
- **Framer Motion 12.34.4** (all animations)
- **TypeScript**
- **Google Fonts** loaded via `<link>` tags in layout.tsx (Playfair Display, Source Sans 3, JetBrains Mono)

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#111111` | Page background |
| `--foreground` | `#F5F3EF` | Primary text |
| `--card-bg` | `#1A1A1A` | Card backgrounds |
| `--card-border` | `#2A2A2A` | Card borders |
| `--text-secondary` | `#A0A0A0` | Secondary text |
| `--text-muted` | `#6B6B6B` | Muted text |
| `--gold` | `#B8952A` | Primary accent (ONLY accent color) |
| `--gold-light` | `#D4B245` | Gold highlight |
| `--gold-dark` | `#8B6914` | Gold shadow |
| Font serif | Playfair Display | Headlines |
| Font sans | Source Sans 3 | Body text |
| Font mono | JetBrains Mono | Data labels |

**CRITICAL:** No blue, red, green, or multi-color gradients anywhere. The entire site is dark (#111111) + gold (#B8952A) only.

---

## File Map

```
src/
├── app/
│   ├── globals.css          # Design system tokens + Tailwind theme
│   ├── layout.tsx           # Root layout with Google Fonts
│   └── page.tsx             # Main page — imports all 8 sections
├── components/
│   ├── Navbar.tsx            # Fixed nav bar
│   ├── Hero.tsx              # Hero section
│   ├── Sameness.tsx          # Network cards with SVG logos
│   ├── ConvergenceFunnel.tsx # Interactive 3-state visualization (COMPLEX)
│   ├── Delivery.tsx          # Intelligence delivery section
│   ├── Emotion.tsx           # Emotional hook section
│   ├── Audience.tsx          # Persona cards
│   ├── FinalCTA.tsx          # CTA + footer
│   └── ScrollReveal.tsx      # Reusable scroll animation wrapper
├── data/
│   └── funnelStates.ts       # All 60 data points, 3 insight cards, connection maps
public/
└── logos/
    ├── espn.svg
    ├── the-athletic.svg
    ├── tnt.svg
    ├── cbs.svg               # Actual CBS eye logo (white)
    ├── fs1.svg
    └── nbc.svg
```

---

## Integration Notes

### Sign In Button
The Navbar "Sign In" link currently points to `https://game-tape-digest.vercel.app`. Update this to wherever your app's login route lives.

### Request Access Button
Both the Navbar "Request Access" and the Final CTA gold button scroll to `#cta` (the bottom CTA section). You may want to wire these to a waitlist form or Typeform.

### Routing
This landing page lives at the root route (`/`). The existing application should be behind authentication (e.g., `/dashboard` or a separate domain). The landing page should be visible to unauthenticated visitors.

### The Convergence Funnel (ConvergenceFunnel.tsx)
This is the most complex component — 460+ lines. Key architecture:
- Uses a seeded random number generator for deterministic label placement
- Pixel-space collision detection on a 720×500 reference canvas
- Labels constrained to left 58% of canvas
- 800 placement attempts per label with 12-14px gap enforcement
- Gold bezier curves drawn via SVG `<path>` with Framer Motion `pathLength` animation
- 3 states (NBA/MLB/NFL) with AnimatePresence transitions
- All data lives in `src/data/funnelStates.ts`

### Framer Motion SVG Notes
- Use `motion.path` (NOT `motion.line`) for animated SVG lines — `pathLength` only works on `<path>` elements
- Don't animate SVG geometric attributes like `r` on `motion.circle` — use opacity animations instead
- Array keyframe animations (e.g., `opacity: [0, 1, 0]`) work on `motion.div` but can be unreliable on SVG elements

---

## How to Run Locally

```bash
cd website
npm install
npm run dev
# Open http://localhost:3000
```

---

## Dependencies (from package.json)

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "framer-motion": "^12.34.4"
}
```

Dev dependencies: `@types/react`, `@types/react-dom`, `@tailwindcss/postcss`, `tailwindcss`, `typescript`
