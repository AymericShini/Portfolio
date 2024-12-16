import Navbar from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollBackToTop';
import { ThemeProvider } from '@/context/themeContext';
import i18n from '@/shared/i18n/i18n';
import '@/styles/globals.css';
import '@/styles/reset.css';
import { createScript } from '@/utils/createScript';
import { motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];

    let input: string[] = [];
    document.addEventListener('keydown', function (event) {
      input.push(event.key);

      if (input.length > konamiCode.length) {
        input.shift();
      }

      if (JSON.stringify(input) === JSON.stringify(konamiCode)) {
        window.location.href = '/konami-code';
        input = [];
      }
    });
  }, []);

  useEffect(() => {
    const dataLayer = createScript(
      null,
      `
        var dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: "pageLoad",
          pagePath: "${router.pathname}", // Path of the page loaded
          pageTitle: "${document.title}", // You can also push the page title
        });
    `,
    );
    document.head.append(dataLayer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.25 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <I18nextProvider i18n={i18n} defaultNS={'fr-FR'}>
        <ThemeProvider>
          <Navbar />
          <Component {...pageProps} />
          <ScrollToTop />
        </ThemeProvider>
      </I18nextProvider>
    </motion.div>
  );
}
