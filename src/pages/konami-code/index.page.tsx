import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function KonamiCode() {
  return <>Konami code page to be done</>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale === 'default' ? 'fr' : (locale ?? 'fr'),
      ['common']
    )),
  },
});
