import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: { order: ['localStorage', 'navigator'] },
    react: {
      useSuspense: false,
    },
    debug: false,
    supportedLngs: ['en-US', 'fr-FR'],
    fallbackLng: 'fr-FR',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: function (lng: string) {
        return `/locales/${lng}.json`;
      },
      crossDomain: true,
      withCredentials: false,
    },
  });

export default i18n;
