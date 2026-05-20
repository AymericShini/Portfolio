import { useTranslation } from 'next-i18next';
import TimelineSection from '@/components/TimelineSection';
import styles from './Strengths.module.scss';

interface StrengthItem {
  title: string;
  desc: string;
}

export default function Strengths() {
  const { t } = useTranslation('common');
  const items = t('strengths.items', { returnObjects: true }) as StrengthItem[];

  return (
    <TimelineSection
      id="strengths"
      eyebrow={t('strengths.eyebrow')}
      subtitle={t('strengths.subtitle')}
      accentColor="var(--color-strengths)"
      pulseColor="#a78bfa"
    >
      <p className={styles.intro}>{t('strengths.intro')}</p>
      <div className={styles.grid}>
        {items.map(({ title, desc }) => (
          <div key={title} className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>{desc}</div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
