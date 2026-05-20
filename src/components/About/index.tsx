import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import styles from './About.module.scss';

export default function About() {
  const { t } = useTranslation('common');
  const bio = t('about.bio', { returnObjects: true }) as string[];

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.photoWrap}>
            <Image
              src="/profil-photo.png"
              alt="Aymeric Demange"
              fill
              className={styles.photo}
              priority
            />
            <div className={styles.photoGlow} aria-hidden="true" />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>{t('about.eyebrow')}</h2>
            <p className={styles.subtitle}>{t('about.subtitle')}</p>

            {bio.map((paragraph, i) => (
              <p key={i} className={styles.desc}>{paragraph}</p>
            ))}

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>6+</span>
                <span className={styles.statLabel}>{t('about.stats.experience')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>{t('about.stats.projects')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>4</span>
                <span className={styles.statLabel}>{t('about.stats.companies')}</span>
              </div>
            </div>

            <div className={styles.chips}>
              {['React', 'Next.js', 'TypeScript', 'Figma', 'Framer Motion', 'Open to work'].map(s => (
                <span key={s} className={styles.chip}>{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
