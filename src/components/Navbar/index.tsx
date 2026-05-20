import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from './index.module.scss';

const NAV_KEYS = [
  { href: '#hero',       key: 'nav.home' },
  { href: '#about',      key: 'nav.about' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#strengths',  key: 'nav.strengths' },
  { href: '#values',     key: 'nav.values' },
  { href: '#education',  key: 'nav.education' },
  { href: '#skills',     key: 'nav.skills' },
];

export default function Navbar() {
  const { t } = useTranslation('common');
  const { locale, pathname } = useRouter();

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.links}>
        {NAV_KEYS.map(({ href, key }) => (
          <a key={href} href={href} className={styles.link}>{t(key)}</a>
        ))}
        <span className={styles.sep} aria-hidden="true" />
        <a href="#" className={styles.soon} aria-disabled="true">{t('nav.projects')}</a>
        <span className={styles.sep} aria-hidden="true" />
        <a href="#contact" className={styles.link}>{t('nav.contact')}</a>
        <span className={styles.sep} aria-hidden="true" />
        <div className={styles.langToggle}>
          <Link
            href={pathname}
            locale="en"
            className={`${styles.langBtn} ${locale === 'en' ? styles.langActive : ''}`}
            aria-label="Switch to English"
          >
            🇬🇧
          </Link>
          <Link
            href={pathname}
            locale="fr"
            className={`${styles.langBtn} ${locale === 'fr' ? styles.langActive : ''}`}
            aria-label="Passer en français"
          >
            🇫🇷
          </Link>
        </div>
      </div>
    </nav>
  );
}
