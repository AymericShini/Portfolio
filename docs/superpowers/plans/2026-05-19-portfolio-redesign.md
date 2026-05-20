# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully rewrite the portfolio UI to match the cinematic dark design spec, replacing all existing page components while keeping the Next.js/i18n/GTM infrastructure.

**Architecture:** Each section becomes its own component under `src/components/`. A shared `TimelineSection` wrapper handles the orange rail + pulsing dot pattern for the five profile sections. The main `index.page.tsx` assembles everything in order.

**Tech Stack:** Next.js 15 · React 18 · TypeScript · SCSS Modules · Framer Motion 11 · Swiper 11

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| Modify | `src/styles/globals.css` | New CSS tokens, scroll snap, remove light mode |
| Modify | `src/pages/_app.tsx` | Remove ThemeProvider, keep i18n + GTM + Konami |
| Delete | `src/context/themeContext.tsx` | No longer needed (dark-only) |
| Create | `src/components/BackgroundOrbs/index.tsx` | Fixed animated spotlight blobs |
| Create | `src/components/BackgroundOrbs/BackgroundOrbs.module.scss` | |
| Rewrite | `src/components/Navbar/index.tsx` | Centered nav, all section links |
| Rewrite | `src/components/Navbar/index.module.scss` | |
| Create | `src/components/StickyCTA/index.tsx` | Fixed pill button, hides on Contact |
| Create | `src/components/StickyCTA/StickyCTA.module.scss` | |
| Create | `src/components/Hero/index.tsx` | Centered hero, parallax orbs, scroll fade |
| Create | `src/components/Hero/Hero.module.scss` | |
| Create | `src/components/About/index.tsx` | Photo + description grid |
| Create | `src/components/About/About.module.scss` | |
| Create | `src/components/TimelineSection/index.tsx` | Rail + dot + header wrapper |
| Create | `src/components/TimelineSection/TimelineSection.module.scss` | |
| Create | `src/components/Experience/index.tsx` | Stacked experience cards |
| Create | `src/components/Experience/Experience.module.scss` | |
| Create | `src/components/Strengths/index.tsx` | 2×2 card grid |
| Create | `src/components/Strengths/Strengths.module.scss` | |
| Create | `src/components/Values/index.tsx` | Swiper carousel |
| Create | `src/components/Values/Values.module.scss` | |
| Create | `src/components/Education/index.tsx` | Stacked education cards |
| Create | `src/components/Education/Education.module.scss` | |
| Create | `src/components/Skills/index.tsx` | Grouped tag sections |
| Create | `src/components/Skills/Skills.module.scss` | |
| Create | `src/components/Contact/index.tsx` | Single-column contact form |
| Create | `src/components/Contact/Contact.module.scss` | |
| Rewrite | `src/pages/index.page.tsx` | Assemble all sections |
| Rewrite | `src/pages/index.module.scss` | Page-level scroll snap styles |
| Update | `public/locales/en-US.json` | Updated content keys |

> No test framework is installed and none is in scope. Visual verification via `npm run dev` is the test method throughout.

---

## Task 1: CSS Foundation

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Replace entire `src/styles/globals.css`** with:

```css
@font-face {
  font-family: 'Geist';
  src: url('/fonts/GeistVF.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'GeistMono';
  src: url('/fonts/GeistMonoVF.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
}

:root {
  /* Palette */
  --bg-base:       #05040d;
  --bg-section:    #081723;
  --violet:        #6d28d9;
  --lavender:      #c4b5fd;
  --indigo:        #818cf8;
  --blue:          #2563eb;
  --sky:           #60a5fa;
  --accent-grad:   linear-gradient(100deg, #c4b5fd, #818cf8, #60a5fa);

  /* Section accents */
  --color-experience: #f97316;
  --color-strengths:  #a78bfa;
  --color-values:     #60a5fa;
  --color-education:  #34d399;
  --color-skills:     #fb7185;

  /* Layout */
  --nav-h:    52px;
  --max-w:    860px;
  --ease:     cubic-bezier(0.4, 0, 0.2, 1);

  /* Card hover transition */
  --card-transition: transform 0.35s var(--ease),
                     border-color 0.35s var(--ease),
                     box-shadow 0.35s var(--ease);
}

/* Scroll snap */
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100%;
}

body {
  background: var(--bg-base);
  color: #fff;
  font-family: 'Geist', system-ui, sans-serif;
  overflow-x: hidden;
  height: 100%;
  margin: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
}

a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }

/* Every section accounts for fixed navbar */
section {
  scroll-margin-top: var(--nav-h);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

- [ ] **Move font files to `public/fonts/`** (Next.js serves from `public/`):

```bash
mkdir -p public/fonts
cp src/fonts/GeistVF.woff public/fonts/GeistVF.woff
cp src/fonts/GeistMonoVF.woff public/fonts/GeistMonoVF.woff
```

- [ ] **Commit:**

```bash
git add src/styles/globals.css public/fonts/
git commit -m "style: replace globals with cinematic dark tokens and scroll snap"
```

---

## Task 2: Remove ThemeContext

**Files:**
- Modify: `src/pages/_app.tsx`
- Delete: `src/context/themeContext.tsx`

- [ ] **Rewrite `src/pages/_app.tsx`:**

```tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/i18n/i18n';
import Navbar from '@/components/Navbar';
import { createScript } from '@/utils/createScript';
import '@/styles/globals.css';
import '@/styles/reset.css';

declare global {
  interface Window { dataLayer: Record<string, unknown>[]; }
}

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // GTM page tracking
  useEffect(() => {
    const script = createScript(null, `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'pageLoad', pagePath: '${router.pathname}' });
    `);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [router.pathname]);

  // Konami code Easter egg
  useEffect(() => {
    let seq: string[] = [];
    const handler = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) router.push('/konami-code');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  return (
    <I18nextProvider i18n={i18n}>
      <Navbar />
      <Component {...pageProps} />
    </I18nextProvider>
  );
}
```

- [ ] **Delete the ThemeContext file:**

```bash
rm src/context/themeContext.tsx
```

- [ ] **Commit:**

```bash
git add src/pages/_app.tsx
git rm src/context/themeContext.tsx
git commit -m "refactor(theme): remove light/dark theme system, dark-only design"
```

---

## Task 3: BackgroundOrbs

**Files:**
- Create: `src/components/BackgroundOrbs/index.tsx`
- Create: `src/components/BackgroundOrbs/BackgroundOrbs.module.scss`

- [ ] **Create `src/components/BackgroundOrbs/index.tsx`:**

```tsx
import styles from './BackgroundOrbs.module.scss';

export default function BackgroundOrbs() {
  return (
    <>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
    </>
  );
}
```

- [ ] **Create `src/components/BackgroundOrbs/BackgroundOrbs.module.scss`:**

```scss
.orb1,
.orb2 {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.orb1 {
  top: -200px;
  left: 30%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(88, 28, 135, 0.15) 0%,
    rgba(37, 99, 235, 0.05) 45%,
    transparent 70%
  );
  animation: breathe 7s ease-in-out infinite;
}

.orb2 {
  bottom: -100px;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(37, 99, 235, 0.09) 0%,
    transparent 70%
  );
  animation: breathe 10s ease-in-out infinite reverse;
}

@keyframes breathe {
  0%   { opacity: 0;   transform: scale(0.85) translateY(0); }
  30%  { opacity: 1;   transform: scale(1.0)  translateY(20px); }
  60%  { opacity: 0.7; transform: scale(1.05) translateY(-10px); }
  100% { opacity: 0;   transform: scale(0.85) translateY(0); }
}
```

- [ ] **Commit:**

```bash
git add src/components/BackgroundOrbs/
git commit -m "feat(background): add animated spotlight orbs component"
```

---

## Task 4: Navbar

**Files:**
- Rewrite: `src/components/Navbar/index.tsx`
- Rewrite: `src/components/Navbar/index.module.scss`

- [ ] **Rewrite `src/components/Navbar/index.tsx`:**

```tsx
import styles from './index.module.scss';

const NAV_LINKS = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#strengths',  label: 'Strengths' },
  { href: '#values',     label: 'Values' },
  { href: '#education',  label: 'Education' },
  { href: '#skills',     label: 'Skills' },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.links}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} className={styles.link}>{label}</a>
        ))}
        <span className={styles.sep} aria-hidden="true" />
        <a href="#" className={styles.soon} aria-disabled="true">My Projects ✦</a>
        <span className={styles.sep} aria-hidden="true" />
        <a href="#contact" className={styles.link}>Contact</a>
      </div>
    </nav>
  );
}
```

- [ ] **Rewrite `src/components/Navbar/index.module.scss`:**

```scss
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--nav-h);
  background: rgba(5, 4, 13, 0.78);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.link {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.32);
  letter-spacing: 0.06em;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  transition: color 0.2s var(--ease), background 0.2s var(--ease);

  &:hover {
    color: rgba(255, 255, 255, 0.78);
    background: rgba(255, 255, 255, 0.05);
  }
}

.soon {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.16);
  letter-spacing: 0.06em;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-style: italic;
  pointer-events: none;
}

.sep {
  display: block;
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.09);
  margin: 0 0.5rem;
}
```

- [ ] **Commit:**

```bash
git add src/components/Navbar/
git commit -m "feat(navbar): rewrite with centered links and scroll anchors"
```

---

## Task 5: StickyCTA

**Files:**
- Create: `src/components/StickyCTA/index.tsx`
- Create: `src/components/StickyCTA/StickyCTA.module.scss`

- [ ] **Create `src/components/StickyCTA/index.tsx`:**

```tsx
import { useEffect, useRef, useState } from 'react';
import styles from './StickyCTA.module.scss';

export default function StickyCTA() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contact = document.getElementById('contact');
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#contact"
      className={styles.cta}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      <span className={styles.dot} aria-hidden="true" />
      Get in touch
    </a>
  );
}
```

- [ ] **Create `src/components/StickyCTA/StickyCTA.module.scss`:**

```scss
.cta {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.68rem 1.4rem;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #fff;
  background: linear-gradient(100deg, #6d28d9, #2563eb);
  box-shadow: 0 0 28px rgba(109, 40, 217, 0.4), 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s var(--ease),
              box-shadow 0.3s var(--ease),
              opacity 0.4s var(--ease);

  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 0 40px rgba(109, 40, 217, 0.6), 0 8px 20px rgba(0, 0, 0, 0.4);
  }
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
```

- [ ] **Commit:**

```bash
git add src/components/StickyCTA/
git commit -m "feat(cta): add sticky get-in-touch button with contact intersection hide"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/Hero/index.tsx`
- Create: `src/components/Hero/Hero.module.scss`

- [ ] **Create `src/components/Hero/index.tsx`:**

```tsx
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import styles from './Hero.module.scss';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed mouse values
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax layers at different speeds
  const orb1X = useTransform(smoothX, v => v * 0.015);
  const orb1Y = useTransform(smoothY, v => v * 0.015);
  const orb2X = useTransform(smoothX, v => v * 0.03);
  const orb2Y = useTransform(smoothY, v => v * 0.03);
  const orb3X = useTransform(smoothX, v => v * 0.055);
  const orb3Y = useTransform(smoothY, v => v * 0.055);

  // Fade content out on scroll
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const contentY = useTransform(scrollY, [0, 250], [0, -30]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className={styles.hero}>
      {/* Parallax orbs */}
      <motion.div className={styles.orbDeep}   style={{ x: orb1X, y: orb1Y }} aria-hidden="true" />
      <motion.div className={styles.orbMid}    style={{ x: orb2X, y: orb2Y }} aria-hidden="true" />
      <motion.div className={styles.orbAccent} style={{ x: orb3X, y: orb3Y }} aria-hidden="true" />

      <motion.div
        className={styles.inner}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h1 className={styles.name}>Aymeric Demange</h1>
        <p className={styles.role}>Frontend Engineer</p>

        <div className={styles.status} aria-label="Availability status">
          <span className={styles.pulse} aria-hidden="true" />
          Open to new opportunities
        </div>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>Get in touch</a>
          <a
            href="https://www.linkedin.com/in/aymeric-demange"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnLinkedin}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </motion.div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
```

- [ ] **Create `src/components/Hero/Hero.module.scss`:**

```scss
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding-top: var(--nav-h);
}

/* Parallax orbs */
.orbDeep,
.orbMid,
.orbAccent {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.orbDeep {
  top: -60px;
  right: 15%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(88, 28, 135, 0.22) 0%, transparent 65%);
}

.orbMid {
  bottom: -40px;
  left: 38%;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 65%);
}

.orbAccent {
  top: 30%;
  right: 5%;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%);
}

.inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.name {
  font-size: 3.8rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(167, 139, 250, 0.45);
  text-underline-offset: 10px;
  text-decoration-thickness: 2px;
  margin-bottom: 0.4rem;
}

.role {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.38);
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(74, 222, 128, 0.07);
  border: 1px solid rgba(74, 222, 128, 0.2);
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.62rem;
  color: rgba(74, 222, 128, 0.72);
  margin-bottom: 2rem;
}

.pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 4rem;
}

.btnPrimary {
  background: linear-gradient(100deg, #6d28d9, #2563eb);
  color: #fff;
  padding: 0.68rem 1.5rem;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  box-shadow: 0 0 22px rgba(109, 40, 217, 0.3);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 34px rgba(109, 40, 217, 0.5);
  }
}

.btnLinkedin {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  padding: 0.68rem 1.2rem;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 500;
  transition: border-color 0.3s var(--ease), color 0.3s var(--ease);

  &:hover {
    border-color: rgba(167, 139, 250, 0.35);
    color: rgba(196, 181, 253, 0.8);
  }
}

.scrollHint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  span {
    font-size: 0.52rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.17);
  }
}

.scrollLine {
  width: 1px;
  height: 24px;
  background: linear-gradient(to bottom, rgba(167, 139, 250, 0.4), transparent);
}
```

- [ ] **Commit:**

```bash
git add src/components/Hero/
git commit -m "feat(hero): add centered hero with mouse parallax orbs and scroll fade"
```

---

## Task 7: About Section

**Files:**
- Create: `src/components/About/index.tsx`
- Create: `src/components/About/About.module.scss`

- [ ] **Create `src/components/About/index.tsx`:**

```tsx
import Image from 'next/image';
import styles from './About.module.scss';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.photoWrap}>
            {/* Replace src with your real photo path: /images/aymeric.jpg */}
            <div className={styles.photoPlaceholder} aria-label="Photo of Aymeric Demange" />
            <div className={styles.photoGlow} aria-hidden="true" />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>About</h2>
            <p className={styles.subtitle}>Frontend Engineer · Bordeaux, France</p>

            <p className={styles.desc}>
              I&apos;m a frontend engineer with 6 years of experience building web products that
              people actually enjoy using. I care about the details — the transitions, the
              micro-interactions, the moment a user smiles because something just works.
            </p>
            <p className={styles.desc}>
              I&apos;ve worked across analytics dashboards, SaaS billing flows, marketing landing
              pages and everything in between. I thrive in cross-functional teams where design
              and engineering speak the same language.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>6+</span>
                <span className={styles.statLabel}>Years exp.</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>3</span>
                <span className={styles.statLabel}>Companies</span>
              </div>
            </div>

            <div className={styles.chips}>
              {['React', 'Next.js', 'TypeScript', 'Figma', 'Framer Motion', 'Open to work'].map(s => (
                <span key={s} className={styles.chip}>{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Create `src/components/About/About.module.scss`:**

```scss
.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: calc(var(--nav-h) + 2rem) 0 2rem;
}

.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3.5rem;
  align-items: center;
}

.photoWrap {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
}

.photoPlaceholder {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: linear-gradient(165deg, #282828 0%, #181818 45%, #0d0d0d 100%);
  filter: grayscale(1);
  box-shadow:
    0 0 0 1px rgba(167, 139, 250, 0.1),
    0 24px 60px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(109, 40, 217, 0.1);
}

.photoGlow {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: radial-gradient(ellipse at 50% 40%, rgba(109, 40, 217, 0.14) 0%, transparent 65%);
  pointer-events: none;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--lavender);
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  margin-bottom: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 14px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
}

.desc {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.48);
  line-height: 1.85;
  margin-bottom: 1rem;

  &:last-of-type { margin-bottom: 1.6rem; }
}

.stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.statNum {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  background: var(--accent-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.statLabel {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.28);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip {
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 500;
  background: rgba(167, 139, 250, 0.08);
  border: 1px solid rgba(167, 139, 250, 0.15);
  color: rgba(196, 181, 253, 0.6);
}
```

> **Note:** The photo is a placeholder div. When ready, add your real photo to `public/images/aymeric.jpg` and replace `<div className={styles.photoPlaceholder}>` with `<Image src="/images/aymeric.jpg" alt="Aymeric Demange" fill style={{ objectFit: 'cover', filter: 'grayscale(1)', borderRadius: '14px' }} />`.

- [ ] **Commit:**

```bash
git add src/components/About/
git commit -m "feat(about): add about section with photo, stats, and chips"
```

---

## Task 8: TimelineSection Wrapper

**Files:**
- Create: `src/components/TimelineSection/index.tsx`
- Create: `src/components/TimelineSection/TimelineSection.module.scss`

- [ ] **Create `src/components/TimelineSection/index.tsx`:**

```tsx
import type { ReactNode } from 'react';
import styles from './TimelineSection.module.scss';

interface TimelineSectionProps {
  id: string;
  eyebrow: string;
  subtitle: string;
  accentColor: string;
  pulseColor: string; // same as accentColor, named separately for animation keyframe
  children: ReactNode;
}

export default function TimelineSection({
  id,
  eyebrow,
  subtitle,
  accentColor,
  children,
}: TimelineSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>

          {/* Orange vertical rail */}
          <div className={styles.rail} aria-hidden="true" />

          {/* Pulsing dot anchored to eyebrow row */}
          <div
            className={styles.dot}
            style={{
              background: accentColor,
              boxShadow: `0 0 0 0 ${accentColor}`,
              // Pulse animation injected inline so color is dynamic
              animation: `timelinePulse 2.4s ease-in-out infinite`,
            }}
            aria-hidden="true"
          />
          <div
            className={styles.connector}
            style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.eyebrow} style={{ color: accentColor }}>{eyebrow}</h2>
              <p className={styles.subtitleText}>{subtitle}</p>
            </div>
            <div className={styles.body}>
              {children}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Create `src/components/TimelineSection/TimelineSection.module.scss`:**

```scss
.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: calc(var(--nav-h) + 2rem) 0 2rem;
}

.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
}

.wrapper {
  position: relative;
  padding-left: 40px;
}

/* Always-orange vertical rail */
.rail {
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(249, 115, 22, 0.5) 4%,
    rgba(249, 115, 22, 0.5) 96%,
    transparent 100%
  );
  border-radius: 2px;
}

/* Pulsing dot — anchored to eyebrow row via absolute positioning */
.dot {
  position: absolute;
  left: calc(6px);
  top: 0.22rem; /* aligns with eyebrow text baseline */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

/* Horizontal connector from dot to content edge */
.connector {
  position: absolute;
  left: calc(6px + 6px);
  top: calc(0.22rem + 5px);
  width: calc(40px - 12px - 1px);
  height: 1px;
  opacity: 0.25;
}

.content {}

.header {
  margin-bottom: 1.2rem;
}

.eyebrow {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.3rem;
}

.subtitleText {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 14px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
}

.body {
  background: var(--bg-section);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.6rem 1.8rem;
}

/* Pulse animation — referenced by the inline style above */
:global {
  @keyframes timelinePulse {
    0%, 100% { box-shadow: 0 0 0 0 currentColor; }
    50%       { box-shadow: 0 0 0 8px transparent; }
  }
}
```

> **Note:** The pulse `box-shadow` color is driven by the inline `background` property. In the browser, `currentColor` in `box-shadow` inside a `@keyframes` doesn't pick up inline styles directly. If the pulse glow needs full color accuracy, swap to per-section CSS classes (one per accent color). This is a visual polish item — the dot itself is always correctly colored.

- [ ] **Commit:**

```bash
git add src/components/TimelineSection/
git commit -m "feat(timeline): add reusable timeline section wrapper with pulsing dot"
```

---

## Task 9: Experience Section

**Files:**
- Create: `src/components/Experience/index.tsx`
- Create: `src/components/Experience/Experience.module.scss`

- [ ] **Create `src/components/Experience/index.tsx`:**

```tsx
import TimelineSection from '@/components/TimelineSection';
import styles from './Experience.module.scss';

interface BulletGroup {
  title: string;
  items: string[];
}

interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  location: string;
  summary: string;
  bullets: [BulletGroup, BulletGroup];
}

const ENTRIES: ExperienceEntry[] = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Cliq Analytics',
    dates: 'Jan 2022 – Present · 3 yrs',
    location: 'Bordeaux, France',
    summary: 'Led frontend architecture for an analytics dashboard serving 10k+ users. Owned the full component library, built campaign management and billing UIs end-to-end.',
    bullets: [
      {
        title: 'Product & Engineering',
        items: ['Built analytics dashboard in Next.js', 'Maintained shared component library', 'Shipped billing flow (Stripe)'],
      },
      {
        title: 'Process & Collaboration',
        items: ['Worked with product and design daily', 'Introduced Storybook for documentation', 'Mentored junior developers'],
      },
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Previous Company',
    dates: 'Mar 2019 – Dec 2021 · 2 yrs 9 mos',
    location: 'Paris, France',
    summary: 'Delivered landing pages, onboarding flows and billing interfaces for a SaaS product. Iterated fast with product and design.',
    bullets: [
      {
        title: 'Delivery',
        items: ['Responsive pages + A/B variants', 'GTM tracking across all key flows'],
      },
      {
        title: 'Stack',
        items: ['React, TypeScript, SCSS', 'Figma handoffs daily'],
      },
    ],
  },
];

export default function Experience() {
  return (
    <TimelineSection
      id="experience"
      eyebrow="Experience"
      subtitle="Where I've worked"
      accentColor="var(--color-experience)"
      pulseColor="#f97316"
    >
      <div className={styles.cards}>
        {ENTRIES.map((entry) => (
          <div key={entry.role} className={styles.card}>
            <div className={styles.top}>
              <div>
                <div className={styles.role}>{entry.role}</div>
                <div className={styles.company}>{entry.company}</div>
              </div>
              <div className={styles.meta}>
                <div className={styles.dates}>{entry.dates}</div>
                <div className={styles.location}>{entry.location}</div>
              </div>
            </div>
            <p className={styles.summary}>{entry.summary}</p>
            <div className={styles.bullets}>
              {entry.bullets.map((group) => (
                <div key={group.title}>
                  <div className={styles.bulletTitle}>{group.title}</div>
                  <ul className={styles.bulletList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
```

- [ ] **Create `src/components/Experience/Experience.module.scss`:**

```scss
.cards { display: flex; flex-direction: column; gap: 0.75rem; }

.card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 1.3rem 1.4rem;
  transition: var(--card-transition);

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(167, 139, 250, 0.22);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(167, 139, 250, 0.08);
  }
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}

.role    { font-size: 0.95rem; font-weight: 700; color: var(--color-experience); margin-bottom: 0.18rem; }
.company { font-size: 0.72rem; font-weight: 600; color: rgba(255, 255, 255, 0.7); }

.meta    { text-align: right; }
.dates   { font-size: 0.63rem; color: rgba(255, 255, 255, 0.36); margin-bottom: 0.1rem; }
.location { font-size: 0.59rem; color: rgba(255, 255, 255, 0.22); }

.summary {
  font-size: 0.69rem;
  color: rgba(255, 255, 255, 0.46);
  line-height: 1.78;
  margin-bottom: 0.9rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.bullets { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.bulletTitle {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-experience);
  margin-bottom: 0.38rem;
}

.bulletList {
  list-style: none;
  padding: 0;

  li {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.33);
    line-height: 1.65;
    padding-left: 0.75rem;
    position: relative;

    &::before {
      content: '·';
      position: absolute;
      left: 0;
      color: rgba(255, 255, 255, 0.2);
    }
  }
}
```

- [ ] **Commit:**

```bash
git add src/components/Experience/
git commit -m "feat(experience): add experience section with stacked cards"
```

---

## Task 10: Strengths Section

**Files:**
- Create: `src/components/Strengths/index.tsx`
- Create: `src/components/Strengths/Strengths.module.scss`

- [ ] **Create `src/components/Strengths/index.tsx`:**

```tsx
import TimelineSection from '@/components/TimelineSection';
import styles from './Strengths.module.scss';

const STRENGTHS = [
  { title: 'Execution speed', desc: 'I ship fast without cutting corners. Rapid iteration is a habit, not a shortcut.' },
  { title: 'Design sensibility', desc: "Comfortable in Figma and equally comfortable pushing back when something's off." },
  { title: 'Cross-functional bridge', desc: 'I translate between design, product and engineering without losing anything.' },
  { title: 'Systems thinking', desc: "I build components that scale. Patterns, not one-offs. Libraries, not repetition." },
];

export default function Strengths() {
  return (
    <TimelineSection
      id="strengths"
      eyebrow="Strengths"
      subtitle="What I bring"
      accentColor="var(--color-strengths)"
      pulseColor="#a78bfa"
    >
      <p className={styles.intro}>
        I don&apos;t just write code — I bring craft, speed, and a product mindset to everything I build.
      </p>
      <div className={styles.grid}>
        {STRENGTHS.map(({ title, desc }) => (
          <div key={title} className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>{desc}</div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
```

- [ ] **Create `src/components/Strengths/Strengths.module.scss`:**

```scss
.intro {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.75;
  margin-bottom: 1.2rem;
  max-width: 480px;
}

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }

.card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(167, 139, 250, 0.09);
  border-radius: 14px;
  padding: 1.2rem;
  transition: var(--card-transition);

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(167, 139, 250, 0.28);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
}

.title { font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem; }
.desc  { font-size: 0.63rem; color: rgba(255, 255, 255, 0.33); line-height: 1.65; }
```

- [ ] **Commit:**

```bash
git add src/components/Strengths/
git commit -m "feat(strengths): add strengths section with 2x2 card grid"
```

---

## Task 11: Values Section

**Files:**
- Create: `src/components/Values/index.tsx`
- Create: `src/components/Values/Values.module.scss`

- [ ] **Install Swiper React types if not present and create `src/components/Values/index.tsx`:**

```tsx
'use client';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import TimelineSection from '@/components/TimelineSection';
import styles from './Values.module.scss';
import 'swiper/css';

const VALUES = [
  { title: 'Craft matters', desc: "Good enough isn't. The last 10% of polish is what separates memorable from forgettable." },
  { title: 'Ownership', desc: 'I treat what I build as mine to care for — not just a ticket to close.' },
  { title: 'Clarity first', desc: 'Simple beats clever. I write code and interfaces that are easy to understand.' },
  { title: 'Keep learning', desc: "The stack changes. Curiosity doesn't. I stay close to what's coming next." },
];

export default function Values() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TimelineSection
      id="values"
      eyebrow="Values"
      subtitle="What I believe in"
      accentColor="var(--color-values)"
      pulseColor="#60a5fa"
    >
      <p className={styles.intro}>
        These aren&apos;t buzzwords. They&apos;re what actually shapes how I work and what I&apos;m proud to ship.
      </p>
      <Swiper
        slidesPerView={1.6}
        spaceBetween={14}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiper}
      >
        {VALUES.map(({ title, desc }) => (
          <SwiperSlide key={title}>
            <div className={styles.card}>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{desc}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.dots}>
        {VALUES.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
        ))}
      </div>
    </TimelineSection>
  );
}
```

- [ ] **Create `src/components/Values/Values.module.scss`:**

```scss
.intro {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.75;
  margin-bottom: 1.2rem;
}

.swiper { overflow: visible; }

.card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(96, 165, 250, 0.1);
  border-radius: 14px;
  padding: 1.3rem;
  transition: var(--card-transition);

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(96, 165, 250, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
}

.title { font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 0.45rem; }
.desc  { font-size: 0.63rem; color: rgba(255, 255, 255, 0.33); line-height: 1.65; }

.dots { display: flex; gap: 0.38rem; margin-top: 0.85rem; }

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  transition: width 0.3s var(--ease), background 0.3s var(--ease);
}

.dotActive {
  background: rgba(96, 165, 250, 0.6);
  width: 16px;
  border-radius: 3px;
}
```

- [ ] **Commit:**

```bash
git add src/components/Values/
git commit -m "feat(values): add values section with Swiper carousel"
```

---

## Task 12: Education Section

**Files:**
- Create: `src/components/Education/index.tsx`
- Create: `src/components/Education/Education.module.scss`

- [ ] **Create `src/components/Education/index.tsx`:**

```tsx
import TimelineSection from '@/components/TimelineSection';
import styles from './Education.module.scss';

interface EducationEntry {
  degree: string;
  school: string;
  years: string;
  note: string;
}

const ENTRIES: EducationEntry[] = [
  {
    degree: 'Bachelor — Web Development & UX',
    school: 'School Name · City',
    years: '2016 — 2018',
    note: 'Focused on frontend development, UX design principles and web application architecture.',
  },
  {
    degree: 'BTS SIO — Computer Science',
    school: 'School Name · City',
    years: '2014 — 2016',
    note: 'Foundation in software development, networking, and systems. First exposure to web technologies.',
  },
];

export default function Education() {
  return (
    <TimelineSection
      id="education"
      eyebrow="Education"
      subtitle="Background"
      accentColor="var(--color-education)"
      pulseColor="#34d399"
    >
      <div className={styles.cards}>
        {ENTRIES.map((entry) => (
          <div key={entry.degree} className={styles.card}>
            <div className={styles.top}>
              <div>
                <div className={styles.degree}>{entry.degree}</div>
                <div className={styles.school}>{entry.school}</div>
              </div>
              <div className={styles.years}>{entry.years}</div>
            </div>
            <p className={styles.note}>{entry.note}</p>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
```

- [ ] **Create `src/components/Education/Education.module.scss`:**

```scss
.cards { display: flex; flex-direction: column; gap: 0.75rem; }

.card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 1.2rem 1.4rem;
  transition: var(--card-transition);

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(52, 211, 153, 0.22);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.degree { font-size: 0.9rem; font-weight: 700; color: var(--color-education); margin-bottom: 0.18rem; }
.school { font-size: 0.68rem; color: rgba(255, 255, 255, 0.48); }
.years  { font-size: 0.62rem; color: rgba(255, 255, 255, 0.28); white-space: nowrap; }
.note   { font-size: 0.65rem; color: rgba(255, 255, 255, 0.28); line-height: 1.65; }
```

- [ ] **Commit:**

```bash
git add src/components/Education/
git commit -m "feat(education): add education section with card layout"
```

---

## Task 13: Skills Section

**Files:**
- Create: `src/components/Skills/index.tsx`
- Create: `src/components/Skills/Skills.module.scss`

- [ ] **Create `src/components/Skills/index.tsx`:**

```tsx
import TimelineSection from '@/components/TimelineSection';
import styles from './Skills.module.scss';

interface SkillGroup {
  label: string;
  variant: 'fe' | 'dev' | 'default';
  items: string[];
}

const GROUPS: SkillGroup[] = [
  { label: 'Frontend',          variant: 'fe',      items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'SCSS', 'Framer Motion'] },
  { label: 'Tooling & DevOps',  variant: 'dev',     items: ['Git', 'Docker', 'Vite', 'ESLint / Prettier', 'Vercel'] },
  { label: 'Design & Analytics',variant: 'default', items: ['Figma', 'Google Tag Manager', 'GA4'] },
  { label: 'Languages',         variant: 'default', items: ['French — native', 'English — professional'] },
];

export default function Skills() {
  return (
    <TimelineSection
      id="skills"
      eyebrow="Skills"
      subtitle="Tech stack"
      accentColor="var(--color-skills)"
      pulseColor="#fb7185"
    >
      <p className={styles.intro}>
        A focused stack built over 6 years. Every tool here has been used in production.
      </p>
      <div className={styles.wrapper}>
        {GROUPS.map(({ label, variant, items }) => (
          <div key={label} className={styles.group}>
            <div className={styles.groupLabel}>{label}</div>
            <div className={styles.tagRow}>
              {items.map((item) => (
                <span key={item} className={`${styles.tag} ${styles[variant]}`}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
```

- [ ] **Create `src/components/Skills/Skills.module.scss`:**

```scss
.intro {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.75;
  margin-bottom: 1.3rem;
}

.wrapper {
  background: rgba(251, 113, 133, 0.04);
  border: 1px solid rgba(251, 113, 133, 0.1);
  border-radius: 11px;
  padding: 1.4rem;
}

.group { margin-bottom: 1.1rem; &:last-child { margin-bottom: 0; } }

.groupLabel {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(251, 113, 133, 0.4);
  margin-bottom: 0.5rem;
}

.tagRow { display: flex; flex-wrap: wrap; gap: 0.35rem; }

.tag {
  padding: 0.24rem 0.68rem;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.44);
  background: rgba(255, 255, 255, 0.03);
}

.fe {
  background: rgba(167, 139, 250, 0.09);
  border-color: rgba(167, 139, 250, 0.16);
  color: rgba(196, 181, 253, 0.68);
}

.dev {
  background: rgba(96, 165, 250, 0.09);
  border-color: rgba(96, 165, 250, 0.16);
  color: rgba(147, 197, 253, 0.68);
}
```

- [ ] **Commit:**

```bash
git add src/components/Skills/
git commit -m "feat(skills): add skills section with grouped tag layout"
```

---

## Task 14: Contact Section

**Files:**
- Create: `src/components/Contact/index.tsx`
- Create: `src/components/Contact/Contact.module.scss`

- [ ] **Create `src/components/Contact/index.tsx`:**

```tsx
import { FormEvent, useState } from 'react';
import styles from './Contact.module.scss';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: wire up to your preferred email service (Formspree, Resend, etc.)
    setSent(true);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.glow} aria-hidden="true" />
          <h2 className={styles.heading}>
            Got a project<br />in mind?{' '}
            <span className={styles.headingGrad}>Let&apos;s talk.</span>
          </h2>
          <p className={styles.sub}>
            Available for freelance projects, full-time roles, and anything interesting in
            between. Drop me a line and I&apos;ll get back to you quickly.
          </p>

          {sent ? (
            <p className={styles.thanks}>Message sent — I&apos;ll be in touch soon!</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="ct-name">Name</label>
                <input id="ct-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-subject">Subject</label>
                <input id="ct-subject" name="subject" type="text" placeholder="What's this about?" />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-message">Message</label>
                <textarea id="ct-message" name="message" placeholder="Tell me about your project..." required />
              </div>
              <button type="submit" className={styles.btn}>Send message →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Create `src/components/Contact/Contact.module.scss`:**

```scss
.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: calc(var(--nav-h) + 2rem) 0 2rem;
}

.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
}

.card {
  background: var(--bg-section);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  position: relative;
  overflow: hidden;
  max-width: 520px;
}

.glow {
  position: absolute;
  top: -80px;
  right: -60px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(109, 40, 217, 0.13) 0%, transparent 65%);
  pointer-events: none;
}

.heading {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.headingGrad {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sub {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.32);
  line-height: 1.8;
  margin-bottom: 1.8rem;
  position: relative;
  z-index: 1;
}

.thanks {
  font-size: 0.8rem;
  color: rgba(74, 222, 128, 0.7);
  padding: 1rem 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  position: relative;
  z-index: 1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  label {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.23);
  }

  input,
  textarea {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 7px;
    padding: 0.65rem 0.85rem;
    font-size: 0.7rem;
    color: #fff;
    font-family: inherit;
    outline: none;
    resize: none;
    transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);

    &::placeholder { color: rgba(255, 255, 255, 0.15); }

    &:focus {
      border-color: rgba(124, 58, 237, 0.45);
      box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
    }
  }

  textarea { min-height: 110px; }
}

.btn {
  width: 100%;
  background: linear-gradient(100deg, #6d28d9, #2563eb);
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 7px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  box-shadow: 0 0 22px rgba(109, 40, 217, 0.25);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 34px rgba(109, 40, 217, 0.45);
  }
}
```

- [ ] **Commit:**

```bash
git add src/components/Contact/
git commit -m "feat(contact): add single-column contact form section"
```

---

## Task 15: Assemble index.page.tsx + Footer

**Files:**
- Rewrite: `src/pages/index.page.tsx`
- Rewrite: `src/pages/index.module.scss`

- [ ] **Rewrite `src/pages/index.page.tsx`:**

```tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import StickyCTA from '@/components/StickyCTA';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Strengths from '@/components/Strengths';
import Values from '@/components/Values';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import styles from './index.module.scss';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Aymeric Demange — Frontend Engineer</title>
      <meta name="description" content="Frontend engineer specialising in React, Next.js and TypeScript. Open to new opportunities." />
    </Head>

    <BackgroundOrbs />
    <StickyCTA />

    <main>
      <Hero />
      <About />
      <Experience />
      <Strengths />
      <Values />
      <Education />
      <Skills />
      <Contact />
    </main>

    <footer className={styles.footer}>
      <span className={styles.footerCopy}>© 2026 Aymeric Demange</span>
      <button
        className={styles.footerBack}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑ Back to top
      </button>
    </footer>
  </>
);

export default Home;
```

- [ ] **Rewrite `src/pages/index.module.scss`:**

```scss
.footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.6rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
  scroll-snap-align: start;
}

.footerCopy {
  grid-column: 2;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.18);
  letter-spacing: 0.08em;
  text-align: center;
}

.footerBack {
  grid-column: 3;
  justify-self: end;
  background: none;
  border: none;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.16);
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: color 0.2s;
  font-family: inherit;

  &:hover { color: rgba(255, 255, 255, 0.45); }
}
```

- [ ] **Start dev server and visually verify the full page:**

```bash
npm run dev
# Open http://localhost:3000
# Check: scroll snap jumps section to section
# Check: navbar links scroll to correct sections (below navbar bar)
# Check: sticky CTA fades on Contact section
# Check: hero mouse parallax works
# Check: all timeline dots are aligned to section titles
# Check: card hover transitions work on Experience, Strengths, Education cards
```

- [ ] **Commit:**

```bash
git add src/pages/index.page.tsx src/pages/index.module.scss
git commit -m "feat(page): assemble redesigned portfolio page"
```

---

## Task 16: Clean Up Unused Components

**Files:**
- Keep but do not delete (user may want them for reference): `ProjectDisplay`, `SkillSet`, `BadgeList`, `IconButton`, `InfoCard`, `Popover`, `ScrollBackToTop`
- Update: `public/locales/en-US.json`

- [ ] **Remove unused imports from `_app.tsx`** — `ScrollBackToTop` is no longer rendered there. Verify `_app.tsx` only imports what it uses.

- [ ] **Update `public/locales/en-US.json`** — remove stale keys no longer used. Add a placeholder for future i18n of new content:

```json
{
  "meta": {
    "title": "Aymeric Demange — Frontend Engineer",
    "description": "Frontend engineer specialising in React, Next.js and TypeScript."
  }
}
```

- [ ] **Update `public/locales/fr-FR.json`** with the same structure:

```json
{
  "meta": {
    "title": "Aymeric Demange — Ingénieur Frontend",
    "description": "Ingénieur frontend spécialisé en React, Next.js et TypeScript."
  }
}
```

- [ ] **Run lint to confirm no errors:**

```bash
npm run lint
# Expected: 0 errors (pre-existing img warnings in old components are fine)
```

- [ ] **Commit:**

```bash
git add public/locales/
git commit -m "chore(i18n): reset locale files to new content structure"
```

---

## Verification Checklist

After all tasks are complete, run through the full page in the browser:

| Check | Pass? |
|---|---|
| `npm run build` completes with no errors | |
| Scroll snap — each scroll jump lands on the next full section | |
| Navbar links — each anchor scrolls to section below the navbar bar (not hidden behind it) | |
| Hero — mouse movement shifts the three orbs at different speeds | |
| Hero — scrolling down fades out the hero content | |
| Sticky CTA — visible on all sections, fades on Contact, reappears on scroll up | |
| All section timeline dots — sit next to their section eyebrow, not floating | |
| Card hover — all cards lift 3px with ease-in cubic-bezier transition | |
| Contact form — submit shows confirmation message | |
| Footer — copyright centered, Back to top on far right | |
| `npm run lint` — no new errors introduced | |
