# Colaberry V2 AI Website

The **AI Systems Architect Accelerator — Home** page for Colaberry, imported from the
Claude Design project [`Colaberry DS School Final`](https://claude.ai/design/p/098454b7-2472-4c4d-8ab7-2ed3ae605522)
(`098454b7-2472-4c4d-8ab7-2ed3ae605522`) and deployed as a static site on GitHub Pages.

## What this is

A single, self-contained marketing landing page. It renders with React 18 + Babel
(loaded from CDN at runtime) on top of the Colaberry Design System tokens. No build step.

## Structure

```
index.html              ← entry point (the "AI Systems Architect Accelerator - Home" page)
styles.css              ← design-system entry (imports tokens/*)
tokens/                 ← color, type, spacing, motion, base, utilities, fonts
aw.css                  ← accelerator "awwwards" layout
partner.css             ← Anthropic / Claude Partner Network sections
home.css                ← home-page sections
_ds_bundle.js           ← Colaberry Design System runtime (Button, Input, Avatar)
ai-parts.jsx            ← shared parts (icon wrapper, logo, footer, …)
ai-aw-parts.jsx         ← nav, marquee, hero canvas, stats, magnetic, footer
ai-aw-illos.jsx         ← blueprint SVG schematics (Learn / Build / Deploy)
ai-bg-partner.jsx       ← partner badge, proof cards, partnership band
ai-home-hero.jsx        ← nav, hero + Open House registration card, marquee
ai-home-sections.jsx    ← stats, paths, how-it-works, photo, certificate, logos, testimonials, pricing, final CTA
assets/                 ← logos, avatars, photo, og image
.nojekyll               ← tells GitHub Pages to serve files as-is (so _ds_bundle.js isn't ignored)
```

## Local preview

Any static server works, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open the served URL.

## Notes on the import

- Fonts (Roboto, Roboto Mono, Quicksand) and icons (RemixIcon, Lucide) load from CDN.
- `_ds_bundle.js` is a hand-written plain-JS build of the three design-system components
  this page uses (Button, Input, Avatar); the full compiled bundle exceeded the design
  API's 256 KiB per-file read cap, so it was reconstructed faithfully from the component
  sources.
- The cohort photo (`assets/photos/openhouse-cohort.png`) is a Colaberry virtual-open-house
  photo sourced from training.colaberry.com, used in place of the original (which exceeded
  the same read cap and was not in the design-system mirror). Swap in the original any time.
- Internal nav/CTA links (`register.html`, `our-story.html`, etc.) point at sibling pages
  from the source design project that are not part of this single-page deploy; the primary
  CTAs are wired and the Open House registration links to the design's `register.html`.
