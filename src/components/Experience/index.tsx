import { useTranslation } from 'next-i18next';
import TimelineSection from '@/components/TimelineSection';
import styles from './Experience.module.scss';

interface BulletGroup {
  title: string;
  items: string[];
}

interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  location: string;
  summary: string;
  bullets: [BulletGroup, BulletGroup];
}

export default function Experience() {
  const { t } = useTranslation('common');
  const jobs = t('experience.jobs', { returnObjects: true }) as ExperienceEntry[];

  return (
    <TimelineSection
      id="experience"
      eyebrow={t('experience.eyebrow')}
      subtitle={t('experience.subtitle')}
      accentColor="var(--color-experience)"
      pulseColor="#f97316"
    >
      <div className={styles.cards}>
        {jobs.map((entry) => (
          <div key={entry.company} className={styles.card}>
            <div className={styles.top}>
              <div>
                <div className={styles.role}>{entry.role}</div>
                <div className={styles.company}>{entry.company}</div>
              </div>
              <div className={styles.meta}>
                <div className={styles.dates}>{entry.dates}</div>
                <div className={styles.location}>{entry.location}</div>
              </div>
            </div>
            <p className={styles.summary}>{entry.summary}</p>
            <div className={styles.bullets}>
              {entry.bullets.map((group) => (
                <div key={group.title}>
                  <div className={styles.bulletTitle}>{group.title}</div>
                  <ul className={styles.bulletList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
