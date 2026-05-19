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

  useEffect(() => {
    const script = createScript(null, `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'pageLoad', pagePath: '${router.pathname}' });
    `);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [router.pathname]);

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
