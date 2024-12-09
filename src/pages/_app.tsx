import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/themeContext';
import i18n from '@/shared/i18n/i18n';
import '@/styles/reset.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

export default function App({ Component, pageProps }: AppProps) {
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
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <I18nextProvider i18n={i18n} defaultNS={'fr-FR'}>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </I18nextProvider>
  );
}
