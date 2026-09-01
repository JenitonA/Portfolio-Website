---
name: Jeniton Augustinpillai — Portfolio
description: Heritage-dark portfolio lit by Waterloo gold and Harvard crimson — precision instruments in warm lamplight.
colors:
  primary: "hsl(42 90% 55%)"
  primary-glow: "hsl(45 100% 68%)"
  accent: "hsl(352 68% 56%)"
  accent-glow: "hsl(352 90% 68%)"
  ember-black: "hsl(24 14% 5%)"
  warm-ivory: "hsl(40 28% 94%)"
  card-charcoal: "hsl(26 12% 8%)"
  smoked-umber: "hsl(26 10% 13%)"
  warm-taupe: "hsl(35 10% 64%)"
  border-umber: "hsl(30 10% 16%)"
  brass-highlight: "hsl(42 30% 88%)"
  brass-mid: "hsl(38 14% 58%)"
  brass-shadow: "hsl(28 14% 24%)"
  destructive: "hsl(0 84% 60%)"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.3em"
  elegant:
    fontFamily: "Playfair Display, Georgia, serif"
    fontStyle: italic
    fontWeight: 400
    fontSize: "1.1em"
  monogram-stencil:
    fontFamily: "Dancing Script, cursive"
    fontWeight: 700
    note: "never rendered as UI text — rasterized source shape for the particle JA monogram"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  pill: "9999px"
spacing:
  gutter: "24px"
  card: "24px"
  section-header-gap: "64px"
  section-block: "112px"
components:
  nav-item:
    textColor: "hsl(40 28% 94% / 0.7)"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  nav-item-active:
    backgroundColor: "hsl(42 90% 55% / 0.15)"
    textColor: "{colors.primary-glow}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  button-contact:
    backgroundColor: "hsl(42 90% 55% / 0.1)"
    textColor: "{colors.warm-ivory}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-contact-hover:
    backgroundColor: "hsl(42 90% 55% / 0.2)"
    textColor: "{colors.primary-glow}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ember-black}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  badge-secondary:
    backgroundColor: "{colors.smoked-umber}"
    textColor: "{colors.warm-ivory}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  card-glass:
    backgroundColor: "hsl(26 12% 11% / 0.75)"
    textColor: "{colors.warm-ivory}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Jeniton Augustinpillai — Portfolio

## Overview

**Creative North Star: "The Brass Cleanroom"**

Precision instruments in warm lamplight. The site renders a nanofabrication lab in heritage materials: warm near-black surfaces with an ember undertone, brass borders and dividers, dark glass panels, and light that behaves like instrument light — gold glows that respond to the cursor, an aurora that drifts above the hero, a particle field that hums beneath the sections. It is prestigious and warm, precise and technical, cinematic in atmosphere but quiet and confident in voice: the typography is solid ink, the motion is restrained, and the single expressive flourish is one italic serif word.

Two institutions light the room. Waterloo gold (`primary`) is the dominant voice — lamplight on every interactive surface, glow, and ring. Harvard crimson (`accent`) is punctuation — section index numbers, the second stop of the aurora, the tail of the timeline. The palette never cools; even the grays are warm (umber, taupe, brass), and pure neutral gray does not exist in the system.

**Key Characteristics:**
- Warm near-black ("ember") ground; no pure black except the intro overlay
- Gold leads, crimson punctuates; both carry a paired `-glow` variant for light effects
- Dark glass surfaces (blur 14–22px) framed by 1px brass gradient borders
- Solid-ink typography; exactly one italic serif accent word per composition
- Depth from light, not shade: glows and inset brass highlights replace drop shadows
- Mono uppercase labels with 0.3em tracking as instrument-panel annotations (group labels, dates, cues)

## Colors

A two-crest heritage palette over warm darkness: every neutral carries an ember or brass undertone. All colors are defined as HSL custom properties in `src/index.css` — that file is the single source of truth.

### Primary
- **Lamplight Gold** (hsl(42 90% 55%)): the site's voice — active nav states, badges, focus rings, glow effects, hover borders, the headshot ring, selection highlight. Its lighter partner **Lamplight Flare** (hsl(45 100% 68%), `primary-glow`) is for text on dark hover states and the hot end of gradients.

### Secondary
- **Smoked Umber** (hsl(26 10% 13%)): quiet fills — secondary badges, hover washes, the dark half of glass gradients.

### Tertiary
- **Veritas Crimson** (hsl(352 68% 56%)): punctuation only — skill group labels, list bullets, the crimson stop of the aurora, the fade-out of the timeline spine, the accent half of the underline gradient. **Veritas Flare** (hsl(352 90% 68%), `accent-glow`) is its glow partner.

### Neutral
- **Ember Black** (hsl(24 14% 5%)): the page ground — charcoal with a warm undertone, never pure black.
- **Warm Ivory** (hsl(40 28% 94%)): all body and heading ink.
- **Card Charcoal** (hsl(26 12% 8%)): opaque card/popover surfaces.
- **Warm Taupe** (hsl(35 10% 64%)): secondary text — descriptions, kicker labels, captions.
- **Border Umber** (hsl(30 10% 16%)): default borders and inputs.
- **Brass Highlight / Mid / Shadow** (hsl(42 30% 88%) / hsl(38 14% 58%) / hsl(28 14% 24%)): the metal family — gradient borders, dividers, inset top-edge highlights on glass.

### Named Rules
**The Two Crests Rule.** Gold is the voice; crimson is punctuation. Crimson never fills a surface, never styles a button, and never competes with gold in the same element — it appears in small, deliberate doses (a group label, a gradient stop, a spine fade).

**The Warm Neutral Rule.** No pure grays and no pure black surfaces. Every neutral in the system carries a warm hue (24–42°); a cool or achromatic neutral is a defect.

## Typography

**Display Font:** Space Grotesk (with Inter, system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** JetBrains Mono
**Accent Serif:** Playfair Display italic (with Georgia fallback)
**Monogram Stencil:** Dancing Script 700 — never rendered as UI text; it is rasterized as the source shape for the particle "JA" monogram

**Character:** Engineered geometry (Space Grotesk) set in solid warm ivory, annotated like an instrument panel in mono, with a single italic serif word as the one moment of literary warmth. Quiet, confident, precise.

### Hierarchy
- **Display** (700, clamp(3rem, 8vw, 4.5rem), 1.02): the hero name only. Tight tracking (-0.025em), solid ink, revealed character-by-character (DiaTextReveal).
- **Headline** (700, clamp(2.25rem, 5vw, 3rem), 1.1): section titles inside SectionHeader, over a short metal-divider tick.
- **Title** (600–700, 1.25–1.875rem): card titles, the footer email link.
- **Body** (400, 1–1.25rem, 1.625): descriptions in Warm Taupe; lead paragraphs may step to 1.125–1.25rem.
- **Label** (400–500, 0.75rem, 0.3em tracking, UPPERCASE, JetBrains Mono): skill group labels, the scroll cue, timeline dates.
- **Elegant** (Playfair Display italic, 1.1em of surrounding text, colored Lamplight Flare): single emphasized words inside body copy; also the intro quote (2xl–4xl on black).

### Named Rules
**The Solid Ink Rule.** Type is never gradient-filled, outlined, or image-masked. Ink is Warm Ivory (or Warm Taupe for secondary); color arrives through the one serif word and interactive states only.

**The One Serif Word Rule.** Playfair italic appears at most once per composition — a single word or phrase (e.g. *nanofabrication*). It is the site's only expressive typographic accent; adding a second dilutes it.

## Layout

Single-page scroll of full-viewport acts. Content lives in a centered container (max 1400px, 24px side padding, 2rem container padding at breakpoints); text measures cap at `max-w-xl`–`max-w-2xl`. Sections stack with generous vertical air (roughly 112px blocks; section headers claim 64px below themselves). The hero is a full viewport (`min-h-screen`) with content left-aligned on desktop (offset ~5vw) and centered on mobile; the footer contact is likewise a full-viewport act, centered.

Navigation floats: a fixed glass pill centered 16px from the top, max-width 42rem, never a full-width bar. `scroll-padding-top: 5.5rem` keeps anchored sections clear of it; `scrollbar-gutter: stable` prevents layout shift when the intro overlay locks scroll. Section rhythm is announced by the SectionHeader (title → short metal-divider tick → optional description), always centered.

Atmosphere layers sit behind content in fixed/absolute stacks: the aurora is masked to the top 60% of the hero, the three.js particle field and glow beams run behind sections at low opacity. Content always sits on `z-10` or above; atmosphere is always `pointer-events-none`.

## Elevation & Depth

**Glow is the shadow.** This system does not use gray drop shadows for elevation. Depth is conveyed by light: soft gold or crimson glows around elevated elements, translucent dark-glass surfaces with backdrop blur (14px cards, 22px nav), and a 1px inset brass highlight along top edges that reads as machined metal catching lamplight. The only true dark shadow in the vocabulary is a deep warm ambient (`hsl(24 30% 2% / 0.35–0.5)`) that grounds glass panels against the ember background — it is atmosphere, not elevation.

### Shadow Vocabulary
- **glow-primary** (`0 0 24px hsl(42 90% 55% / 0.25), 0 8px 32px hsl(24 30% 2% / 0.5)`): resting glow for gold-lit elements (headshot, key surfaces).
- **glow-accent** (`0 0 24px hsl(352 68% 56% / 0.22), 0 8px 32px hsl(24 30% 2% / 0.5)`): crimson equivalent, rare.
- **glow-strong** (`0 0 40px hsl(42 90% 55% / 0.35), 0 0 90px hsl(42 90% 55% / 0.15)`): the hot end of `pulse-glow`; hover/active emphasis.
- **Inset brass edge** (`inset 0 1px 0 hsl(42 30% 88% / 0.07–0.25)`): the machined top-edge highlight on every glass and metal surface.

### Named Rules
**The Glow-Is-The-Shadow Rule.** Elevation is expressed as emitted light, never as a neutral gray drop shadow. If an element needs more depth, brighten its glow or its brass edge — do not darken beneath it.

## Shapes

Machined-soft geometry. The base radius is 0.75rem (12px), stepping down to 10px and 8px for nested elements. Anything that floats or wraps a short label is a full pill: the nav bar, nav items, badges, the education chip, contact buttons. The headshot is a perfect circle with a glowing ring. Borders are 1px and metallic — either flat Border Umber or the `metal-border` treatment: a 1px brass gradient drawn with a masked `::before` overlay, so frames shimmer from brass highlight through gold. Dividers are never solid lines; the `metal-divider` is a 1px horizontal gradient that swells from transparent through brass to a gold center. Sharp corners and heavy borders do not exist in the system.

## Components

### Navigation (glass pill)
- **Character:** a floating brass-framed instrument, not a bar.
- **Surface:** `glass-pill` — 55–65% opaque umber gradient, 22px blur + 1.4 saturate, brass metal-border, inset brass edge.
- **Items:** pill buttons, 0.875rem/500; inactive `foreground/70`, hover → full ink over `muted/40` wash; active → `primary/15` fill, Lamplight Flare text, soft gold halo (`0 0 16px` at 25%). Scroll-spy drives the active state.
- **Mobile:** toggle icon opens a `glass-card` dropdown (rounded-2xl) with the same states, fade-in entrance.

### Buttons
- **Shape:** pill (9999px) for page-level actions; `rounded-md` for shadcn utility buttons.
- **Contact pill (in use):** `border-primary/40` on `primary/10` fill, 24px/12px padding, 1.125rem/600 ink; hover deepens fill to `primary/20`, brightens border and text to Lamplight Flare, 300ms.
- **Surface vocabulary (defined in `index.css`, ready for new work):** `btn-metal` (vertical brass gradient, inset highlight, gold glow on hover), `btn-glass` (gold-tinted glass, 8px blur, glowing border), `btn-shine` (one skewed light sweep across the face on hover, 0.7s).
- **Feedback:** the `interactive` utility — lift `-2px` on hover, `scale(0.98)` press, 250ms.

### Cards / Containers
- **Corner Style:** 12px (`rounded-lg`) to 16px (`rounded-2xl`).
- **Background:** `glass-card` — 75–85% opaque umber-to-ember gradient, 14px blur.
- **Border:** 1px `brass-highlight/8`; hover shifts to `primary/25`.
- **Shadow Strategy:** inset brass edge + deep warm ambient (see Elevation); no gray shadows.
- **Spotlight:** project/experience cards wrap in `SpotlightCard` — a 340px gold radial (11%) tracks the cursor via `--spot-x/--spot-y`, fading in over 0.4s.
- **Internal Padding:** 24px.

### Badges / Chips
- **Style:** full pills, 0.75rem/600, 10px/2px padding. Default: solid Lamplight Gold with Ember Black text. Secondary: Smoked Umber with ivory text (the workhorse for tech tags). Outline: ivory text, umber border.

### Inputs / Fields
- Standard shadcn primitives themed by tokens: Border Umber stroke on transparent/card fill, `rounded-md`, gold focus ring (`ring` = Lamplight Gold). No custom input identity yet — no forms in production (contact is `mailto:`).

### SectionHeader (signature)
- The act divider: centered Space Grotesk headline over a 64px metal-divider tick → optional taupe description (max-w-2xl). Slide-up entrance. No kickers or index numbers — the headline carries its own weight.

### Instrument Ledger (signature — Toolkit)
- Skills render as a spec sheet: full-width rows separated by 1px hairlines, each row a two-column grid — mono uppercase category label in the left margin (alternating gold/crimson, 0.3em tracking) and capabilities flowing right in Inter (1–1.125rem, `foreground/85`) separated by brass middots. Coursework is a first-class ledger row, equal in weight to the skill categories. Hovering a row swaps its quiet hairline for the gold metal-divider gradient (300ms) — lamplight catching a brass edge; hovering an item warms it to Lamplight Flare. Rows stagger in (70ms) on first view; a closing rule bounds the sheet.

### Timeline (signature)
- Experience spine: 1px vertical gradient from Lamplight Flare through gold into a crimson fade-out. Nodes are ember-filled circles with 2px gold borders glowing both outward (12px) and inward (4px).

### Atmosphere & Motion (signature)
- **QuoteIntro:** full-screen pure-black overlay; Playfair italic quote (2xl–4xl white) with sans attribution at 60% white; click/scroll dismisses and hands off to the hero entrance.
- **Aurora (hero):** WebGL ribbons in gold → crimson → flare (`#E8A33D`, `#A51C30`, `#F2C14E`), 40% opacity, masked out before reaching the text.
- **ParticleField / GlowBeams:** ambient three.js particles and drifting 12°-rotated beams (14s cycle) behind sections.
- **DiaTextReveal:** hero name reveal, staggered 0.3s between lines.
- **Grammar:** two easings — `smooth` (0.3s cubic-bezier(0.4,0,0.2,1)) for state changes, `spring` (0.5s cubic-bezier(0.34,1.56,0.64,1)) for playful arrivals. Entrances are slide-up 0.6s / fade-in 0.8s. Idle motion is slow and soft: float 6s, pulse-glow 2s alternate, shimmer 6s. `prefers-reduced-motion` collapses all animation and smooth scroll to instant.

## Do's and Don'ts

### Do:
- **Do** define every color as an HSL custom property in `src/index.css` and consume it through Tailwind's token classes — the stylesheet header makes HSL mandatory.
- **Do** announce every section with the SectionHeader pattern: headline over a short metal-divider tick, no kicker above it.
- **Do** frame floating or premium surfaces with the 1px `metal-border` brass gradient rather than a flat border.
- **Do** express hover as light: brighten the glow, warm the border toward gold, lift `-2px` via `interactive`.
- **Do** keep atmosphere layers (aurora, particles, beams) `pointer-events-none`, below `z-10`, and masked away from text.
- **Do** honor `prefers-reduced-motion` — the global kill-switch in `index.css` must keep working for any new animation.

### Don't:
- **Don't** use gradient, outlined, or image-masked text — typography is solid ink only (The Solid Ink Rule, confirmed in code comments).
- **Don't** add gray drop shadows for elevation — glow is the shadow (confirmed by the user).
- **Don't** fill surfaces or buttons with crimson; it is punctuation, never a voice (The Two Crests Rule).
- **Don't** introduce cool or achromatic neutrals — every gray must carry a warm 24–42° hue (The Warm Neutral Rule).
- **Don't** use more than one Playfair italic accent per composition (The One Serif Word Rule).
- **Don't** replace the pill geometry of floating elements (nav, badges, contact actions) with rectangles.
