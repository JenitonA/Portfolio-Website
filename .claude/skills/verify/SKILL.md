---
name: verify
description: Build, serve, and end-to-end drive this portfolio site with Playwright
---

# Verifying the portfolio site

Single-page Vite + React app. Surface is the browser at `/`.

## Build & serve (production bundle)

```bash
npm run build
npm run preview -- --port 4173 --strictPort   # serves dist/ at http://localhost:4173
```

## Drive with Playwright

`playwright` is not a project dependency — install ad hoc (`npm i --no-save playwright`,
`npx playwright install chromium`) and import it in scripts via absolute file URL if the
script lives outside the repo:
`import { chromium } from "file:///C:/Users/augus/Projects/Portfolio-Website/node_modules/playwright/index.mjs"`

## Flows worth driving

- **Quote intro**: `blockquote` appears on load, scroll is locked
  (`documentElement.style.overflowY === "hidden"`), click anywhere skips, auto-dismisses
  ~3.5s + 0.9s fade. Hero content only mounts after dismissal.
- **Navbar**: floating pill `nav.fixed`. Scroll-spy adds `text-primary-glow` to the active
  item. Mobile dropdown is `nav.fixed .rounded-2xl` (only in DOM while open).
- **mailto/external buttons** use `window.open` — stub it with `context.addInitScript`.
- Experience logos, project carousels (`Next slide` button), `+N more` badge toggle,
  footer `Back to top ↑`.

## Selector gotchas

- The footer contains a second `<nav>` and duplicate section-name buttons — always scope
  to `nav.fixed`, and `.first()` for "Contact" (pill has nav item + CTA with same name).
- The "JA" logo button has `aria-label="Back to top"`, colliding with the footer's
  "Back to top ↑" button — use the exact name with the arrow.
- Smooth scroll from page bottom to top takes ~2s; wait accordingly before asserting
  `scrollY === 0`.
