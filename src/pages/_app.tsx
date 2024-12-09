import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/themeContext";
import "@/styles/globals.css";
import { createScript } from "@/utils/createScript";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    `
    );
    document.head.append(dataLayer);
  }, []);

  return (
    <I18nextProvider i18n={i18n} defaultNS={'fr-FR'}>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </I18nextProvider>
  );
}
