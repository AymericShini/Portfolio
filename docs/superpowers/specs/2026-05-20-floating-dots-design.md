# Floating Dots Background — Design Spec

**Date:** 2026-05-20
**Status:** Implemented

## Problem

The portfolio background felt empty when scrolling past the hero section. The existing `BackgroundOrbs` component only provides large gradient blobs; there was no ambient motion filling the full page.

## Solution

Add 30 small white glowing dots that slowly rise upward across the full viewport, providing subtle ambient motion visible in every section.

## Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Dot style | Glowing/ethereal (white with purple-white box-shadow) | Fits the dark purple/blue aesthetic |
| Dot density | ~30 dots | Medium — noticeable but not distracting, preserves performance |
| Animation engine | CSS keyframes on DOM divs | GPU compositor, zero JS per frame |
| SSR safety | Generate dots in useEffect | Avoids hydration mismatch |

## Component

`src/components/FloatingDots/index.tsx` — client component, mirrors BackgroundOrbs pattern.
`src/components/FloatingDots/FloatingDots.module.scss` — keyframe + container styles.

## Animation

`riseUp` keyframe: `translateY(0)` → `translateY(-105vh)` over 8–13s, with opacity fade-in at 12% and fade-out at 88%. Glow via `box-shadow: 0 0 6px 2px rgba(180,180,255,0.45)` active from 12%–88%.

## Performance

- `will-change: transform, opacity` on each dot — compositor hint
- `pointer-events: none` — no hit-testing cost
- `overflow: hidden` on container — no layout side-effects
- `prefers-reduced-motion: reduce` — animation disabled for users who prefer it
- 30 fixed-position elements at 3–6px is negligible GPU load
