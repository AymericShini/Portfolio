# Portfolio Redesign — Design Spec
**Date:** 2026-05-19
**Stack:** Next.js 15 · React 18 · TypeScript · SCSS Modules · Framer Motion 11

---

## 1. Design Direction

**Cinematic dark** — deep space backgrounds, ambient glowing orbs, premium feel. Inspired by jcsuzanne.com (atmosphere) and henridemooij.com (typographic confidence and parallax depth).

Not two moods blended together. One unified canvas with depth.

---

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#05040d` | Page background |
| `--bg-section` | `#081723` | Section card backgrounds |
| `--deep-purple` | `#3b0764` | Deep orb glow |
| `--violet` | `#6d28d9` | Primary accent, CTA buttons |
| `--lavender` | `#c4b5fd` | Gradient highlight, text accents |
| `--indigo` | `#818cf8` | Gradient mid-stop |
| `--blue` | `#2563eb` | CTA gradient end, chip borders |
| `--sky` | `#60a5fa` | Values section accent |
| `--accent-gradient` | `linear-gradient(100deg, #c4b5fd, #818cf8, #60a5fa)` | Hero headline, headings |

**Section accent colors** (dot, eyebrow, highlight):

| Section | Color |
|---|---|
| Experience | `#f97316` (orange) |
| Strengths | `#a78bfa` (purple) |
| Values | `#60a5fa` (blue) |
| Education | `#34d399` (green) |
| Skills | `#fb7185` (rose) |

---

## 3. Typography

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero name | `3.8rem` | 900 | Underlined, `text-underline-offset: 10px`, lavender underline |
| Section eyebrow | `1.5rem` | 800 | Colored per section accent, `letter-spacing: -0.02em` |
| Section subtitle | `0.6rem` | 700 | Uppercase, `letter-spacing: 0.22em`, muted, preceded by a short line |
| Card title | `0.8–0.95rem` | 700 | White |
| Body copy | `0.69–0.75rem` | 400 | `rgba(255,255,255,0.44–0.5)`, `line-height: 1.75–1.85` |
| Tags / labels | `0.55–0.62rem` | 500–700 | Uppercase or sentence case |

Font stack: `system-ui, sans-serif` — swap for a custom font (e.g. Geist or Inter) during build.

---

## 4. Background Animation

**Animated spotlight orbs** — two `position: fixed` radial gradient blobs on the page.

- Orb 1: `top: -200px, left: 30%` · purple-to-blue · `animation: breathe 7s ease-in-out infinite`
- Orb 2: `bottom: -100px, right: 10%` · blue · `10s` · `reverse`

```css
@keyframes breathe {
  0%   { opacity: 0;   transform: scale(0.85) translateY(0); }
  30%  { opacity: 1;   transform: scale(1.0)  translateY(20px); }
  60%  { opacity: 0.7; transform: scale(1.05) translateY(-10px); }
  100% { opacity: 0;   transform: scale(0.85) translateY(0); }
}
```

Additional per-section orbs in the hero panel for the parallax effect (see §6).

---

## 5. Navbar

- `position: fixed`, full-width, `height: 52px`
- Background: `rgba(5,4,13,0.78)` + `backdrop-filter: blur(14px)`
- Border-bottom: `1px solid rgba(255,255,255,0.05)`
- **All links centered** — no logo
- Links: Home · About · Experience · Strengths · Values · Education · Skills · `|` · My Projects *(disabled/italic)* · `|` · Contact
- Click scrolls to section with `scroll-behavior: smooth`
- **Navbar offset fix:** every `<section>` has `scroll-margin-top: 52px`

---

## 6. Hero Section

**Layout:** Full viewport, centered single column. No split screen.

**Content (top to bottom):**
1. `Aymeric Demange` — large name, underlined
2. `Frontend Engineer` — muted role label
3. Availability badge — green pulsing dot + "Open to new opportunities"
4. Two CTAs: **Get in touch** (gradient button) + **LinkedIn** (outline button with icon)
5. Scroll hint — thin vertical line + "SCROLL" label

**Parallax background:** Three radial gradient orbs at different depths react to mouse movement via Framer Motion `useMotionValue`. Speeds: deep purple slowest (0.6s transition), mid blue medium (0.4s), front accent fastest (0.25s).

**On scroll:** tagline fades out at its own rate using `useScroll` + `useTransform`.

---

## 7. About Section

**Layout:** Two-column grid — `240px` photo left, text right. Vertically centered.

**Photo:** B&W (CSS `filter: grayscale(1)`), rounded corners (`border-radius: 14px`), purple glow halo via `box-shadow` + inner `radial-gradient` overlay. Full portrait aspect ratio (3/4).

**Right column:**
- Title: "About" (`1.5rem`, `#c4b5fd`)
- Subtitle: "Frontend Engineer · Bordeaux, France" (small uppercase)
- 2-paragraph description
- Stats row: **6+** Years exp. · **20+** Projects · **3** Companies — numbers use accent gradient
- Skill chips: React · Next.js · TypeScript · Figma · Framer Motion · Open to work

---

## 8. Profile Sections (Experience → Skills)

### Shared structure

Each section is a **full-viewport-height page** (`height: 100vh`). Scroll snaps section-to-section (`scroll-snap-type: y mandatory` on `html`).

**Vertical timeline rail:**
- `position: absolute` left edge, `2px` wide, always orange (`rgba(249,115,22,0.5)`)
- Gradient fades at top and bottom

**Pulsing dot per section:**
- `position: absolute` anchored to the section's `::before` pseudo-element
- Sits at the eyebrow label height — always aligned to the title, regardless of card height
- Color and pulse animation match the section accent

**Section header (outside the card):**
- Eyebrow: large (`1.5rem`, 800 weight), colored with section accent
- Subtitle: small (`0.6rem`), uppercase, muted, preceded by a short horizontal rule

**Section card background:** `#081723`

**Card hover interaction:** `transform: translateY(-3px)` + `border-color` glow + `box-shadow` lift
```css
transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
            border-color 0.35s cubic-bezier(0.4,0,0.2,1),
            box-shadow 0.35s cubic-bezier(0.4,0,0.2,1);
```

---

### 8a. Experience

Cards stacked vertically. Each card:
- **Top row:** Role (orange, `0.95rem` bold) + Company left · Dates + Location right
- **Body:** Summary paragraph
- **Bottom:** Two-column bullet breakdown with bold category headers (orange)

---

### 8b. Strengths

Intro paragraph + 2×2 rounded card grid (`border-radius: 14px`).
Each card: Title + description. No icons.

---

### 8c. Values

Intro paragraph + horizontal scroll carousel.
Each card: Title + description. No numbers.
Pagination dots below.

---

### 8d. Education

Same card style as Experience.
Each card: Degree (green, `0.9rem` bold) + School left · Year right + note paragraph.

---

### 8e. Skills

Intro paragraph + single wrapper box (`background: rgba(251,113,133,0.04)`, rose border).
Grouped by category:
- **Frontend** — purple tags
- **Tooling & DevOps** — blue tags
- **Design & Analytics** — default tags
- **Languages** — default tags

---

## 9. Contact Section

Full viewport height. Single column, `max-width: 520px`.
Card background: `#081723`.

**Content:**
- Headline: "Got a project in mind? Let's talk." (gradient on "Let's talk.")
- Short paragraph
- Form fields: Name · Email · Subject · Message (textarea)
- Full-width "Send message →" button (gradient, glows on hover)

**No** email/GitHub links in this section.

---

## 10. Sticky CTA

- `position: fixed`, bottom-right (`bottom: 2rem, right: 2rem`)
- Gradient pill button: "Get in touch" + green blinking availability dot
- **Hides on Contact section:** `IntersectionObserver` sets `opacity: 0` + `pointer-events: none` when `#contact` enters viewport
- Fade transition: `opacity 0.4s cubic-bezier(0.4,0,0.2,1)`

---

## 11. Footer

- Centered copyright: `© 2026 Aymeric Demange`
- "↑ Back to top" — far right, smooth scrolls to top
- Layout: 3-column CSS grid (`1fr auto 1fr`) so copyright is truly centered

---

## 12. Scroll Behaviour

```css
html {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: 52px; /* navbar offset */
}
```

---

## 13. Sections Not Yet Designed

- **My Projects** — placeholder in navbar (italic, disabled). Separate brainstorm session after profile site ships.
- **Resume/CV page** — stub exists in codebase (`/resume`), keep for later.
- **Konami code Easter egg** — hook already in `_app.tsx`, keep it.

---

## 14. Content To Fill In

Before or during build, replace placeholders with:

- [ ] Real B&W photo (portrait, 3:4 ratio)
- [ ] Actual job titles, company names, date ranges, locations
- [ ] Real bullet points per role
- [ ] School names + cities
- [ ] Hero tagline (currently "I craft interfaces that feel alive." — confirm or revise)
- [ ] About section paragraphs
- [ ] Strengths, Values card copy
- [ ] Stat numbers (years, projects, companies)

---

## 15. Existing Code to Reuse

| Asset | Path | Notes |
|---|---|---|
| Framer Motion | Already installed (`^11.13.5`) | Use for parallax, scroll animations, card transitions |
| `useTheme` hook | `src/components/Navbar/` | **Remove** — redesign is dark-only. Delete theme toggle button, light mode CSS vars, and `ThemeContext`. |
| i18n setup | `src/pages/_app.tsx` | Keep EN/FR support |
| GTM integration | `src/pages/_document.tsx` | Keep as-is |
| Project images | `public/projects/` | Reuse for Work section |
| Logo SVGs | `public/logo-*.svg` | May no longer be needed — review |
| Swiper | Already installed (`^11.1.15`) | Use for Values carousel |
