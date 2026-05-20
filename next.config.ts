import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'tsx'],
  i18n: {
    locales: ['en', 'fr', 'default'],
    defaultLocale: 'default',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import 'mixins.scss';`, // This will auto-import mixins.scss into every file
  },
};

export default nextConfig;
