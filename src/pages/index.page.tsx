import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import FloatingDots from '@/components/FloatingDots';
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

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>

      <BackgroundOrbs />
      <FloatingDots />
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
        <span className={styles.footerCopy}>{t('footer.copy')}</span>
        <a href="#__next" className={styles.footerBack}>{t('footer.back')}</a>
      </footer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale === 'default' ? 'fr' : (locale ?? 'fr'), ['common'])),
  },
});

export default Home;
