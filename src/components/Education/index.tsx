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
    degree: 'Bachelor — Web Development & UX',
    school: 'School Name · City',
    years: '2016 — 2018',
    note: 'Focused on frontend development, UX design principles and web application architecture.',
  },
  {
    degree: 'BTS SIO — Computer Science',
    school: 'School Name · City',
    years: '2014 — 2016',
    note: 'Foundation in software development, networking, and systems. First exposure to web technologies.',
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
