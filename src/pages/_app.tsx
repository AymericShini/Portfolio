import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/themeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    let input: string[] = [];
    document.addEventListener("keydown", function (event) {
      input.push(event.key);

      // Only keep the last 10 inputs (length of the Konami code)
      if (input.length > konamiCode.length) {
        input.shift();
      }

      // Check if the input matches the Konami Code
      if (JSON.stringify(input) === JSON.stringify(konamiCode)) {
        window.location.href = "/konami-code";
        input = []; // Reset after code is entered
      }
    });
  }, []);
  return (
    <ThemeProvider>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
