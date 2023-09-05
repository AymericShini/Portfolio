import Layout from 'components/MainLayout';

import { CssBaseline, ThemeProvider } from '@mui/material';
import 'assets/styles/app.css';
import { darkTheme } from 'assets/styles/theme';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aymeric Portfolio',
  description: 'Aymeric Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
