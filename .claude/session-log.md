# Session Log — Portfolio

## 2026-05-19 — Replace placeholder content with real CV data and global sizing overhaul

**Done:**
- Replaced all experience placeholders with real CV data: Cliq Digital (corrected from Cliq Analytics), Ubisoft with real game titles and Contentful/GraphQL details, LGM freelance Angular/.NET CRM, CPI Software apprenticeship
- Replaced wrong education entries with 3 real degrees: Master HITEMA Issy-les-Moulineaux, Licence Pro SISW/UVSQ Vélizy, DUT GEII IUT de Vélizy; skills expanded from 4 to 7 groups
- Added real profile photo to About section (`public/profil-photo.png`) replacing CSS gradient placeholder; Next.js Image with grayscale filter
- Fixed broken LinkedIn URL in Hero, deleted empty /resume page, added LinkedIn CTA (catchphrase + button) centered below contact form
- Global sizing overhaul: font-size 16→20px, --max-w 860→980px, all sub-0.75rem values bumped across 10+ SCSS files; removed scroll-snap-stop: always; removed 520px cap on Contact card

**Open:**
- About bio: user declined all 3 proposed rewrites — still generic copy, unresolved
- Contact form backend: handleSubmit still fakes success, no real email sending

**Next:**
- Test scroll snap and back-to-top in browser to confirm fixes
- Revisit About bio with user's own wording
- Wire contact form to Resend, Formspree, or Next.js API route

---

## 2026-05-19 — Global typography token system

**Done:**
- Added 7 CSS custom property tokens (`--fs-2xs` → `--fs-2xl`, 0.6rem–3.8rem) to `src/styles/globals.css` `:root`
- Replaced all 44 hardcoded `font-size` declarations across 20 SCSS module files with `var(--fs-*)` references
- Consolidated the noisy 0.72–0.90rem spread into two clean tiers: `--fs-xs` (0.75rem) for dates/metadata, `--fs-sm` (0.85rem) for body/descriptions
- Fixed the one `px` outlier (`24px` in `ProjectDisplay/index.module.scss`) → `var(--fs-md)`
- Chose "practical" scale over strict 4px-grid (user confirmed) — no visual regressions expected

**Open:**
- Browser QA pass not yet done — visual verification needed

**Next:**
- Run `npm run dev` and visually confirm all sections render correctly
- Commit the typography refactor (SCSS + globals.css changes)

---

## 2026-05-19 — Full cinematic dark redesign implemented

**Done:**
- Replaced entire portfolio UI with cinematic dark design (brainstormed → spec → plan → 12 commits)
- Built 12 new components: BackgroundOrbs, Navbar, StickyCTA, Hero, About, TimelineSection, Experience, Strengths, Values, Education, Skills, Contact
- Deleted ThemeContext, stripped _app.tsx, replaced globals.css with new dark tokens + scroll-snap
- Geist fonts moved from src/fonts/ to public/fonts/
- Design spec saved to docs/superpowers/specs/2026-05-19-portfolio-redesign-design.md
- Build passes clean (0 errors)

**Open:**
- Contact form needs real email backend (Formspree/Resend)
- "My Projects" section not yet designed or built

**Next:**
- Fill in placeholder content: real photo (public/images/aymeric.jpg), job titles/dates/companies in Experience, school names in Education
- Wire up contact form to email service
- Design and build "My Projects" section
