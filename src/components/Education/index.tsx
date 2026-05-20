import { useTranslation } from 'next-i18next';
import TimelineSection from '@/components/TimelineSection';
import styles from './Education.module.scss';

interface EducationEntry {
  degree: string;
  school: string;
  years: string;
  note: string;
}

export default function Education() {
  const { t } = useTranslation('common');
  const entries = t('education.entries', { returnObjects: true }) as EducationEntry[];

  return (
    <TimelineSection
      id="education"
      eyebrow={t('education.eyebrow')}
      subtitle={t('education.subtitle')}
      accentColor="var(--color-education)"
      pulseColor="#34d399"
    >
      <div className={styles.cards}>
        {entries.map((entry) => (
          <div key={entry.degree} className={styles.card}>
            <div className={styles.top}>
              <div>
                <div className={styles.degree}>{entry.degree}</div>
                <div className={styles.school}>{entry.school}</div>
              </div>
              <div className={styles.years}>{entry.years}</div>
            </div>
            <p className={styles.note}>{entry.note}</p>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
