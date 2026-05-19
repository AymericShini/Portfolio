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
