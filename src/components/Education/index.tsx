import TimelineSection from '@/components/TimelineSection';
import styles from './Education.module.scss';

interface EducationEntry {
  degree: string;
  school: string;
  years: string;
  note: string;
}

const ENTRIES: EducationEntry[] = [
  {
    degree: 'Master — Software Development & IoT',
    school: 'H3 HITEMA · Issy-les-Moulineaux',
    years: '2019 — 2021',
    note: 'Specialised in software architecture, IoT systems and advanced web development.',
  },
  {
    degree: 'Licence Pro — Back-end Development',
    school: 'SISW, UVSQ · Vélizy',
    years: '2017 — 2018',
    note: 'Focused on server-side development, APIs and database management.',
  },
  {
    degree: 'DUT GEII — Electrical & Industrial Computing',
    school: 'IUT de Vélizy, UVSQ · Vélizy',
    years: '2015 — 2017',
    note: 'Foundation in electronics, industrial computing and programming fundamentals.',
  },
];

export default function Education() {
  return (
    <TimelineSection
      id="education"
      eyebrow="Education"
      subtitle="Background"
      accentColor="var(--color-education)"
      pulseColor="#34d399"
    >
      <div className={styles.cards}>
        {ENTRIES.map((entry) => (
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
