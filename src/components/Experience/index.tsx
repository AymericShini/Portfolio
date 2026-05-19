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

const ENTRIES: ExperienceEntry[] = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Cliq Analytics',
    dates: 'Jan 2022 – Present · 3 yrs',
    location: 'Bordeaux, France',
    summary: 'Led frontend architecture for an analytics dashboard serving 10k+ users. Owned the full component library, built campaign management and billing UIs end-to-end.',
    bullets: [
      {
        title: 'Product & Engineering',
        items: ['Built analytics dashboard in Next.js', 'Maintained shared component library', 'Shipped billing flow (Stripe)'],
      },
      {
        title: 'Process & Collaboration',
        items: ['Worked with product and design daily', 'Introduced Storybook for documentation', 'Mentored junior developers'],
      },
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Previous Company',
    dates: 'Mar 2019 – Dec 2021 · 2 yrs 9 mos',
    location: 'Paris, France',
    summary: 'Delivered landing pages, onboarding flows and billing interfaces for a SaaS product. Iterated fast with product and design.',
    bullets: [
      {
        title: 'Delivery',
        items: ['Responsive pages + A/B variants', 'GTM tracking across all key flows'],
      },
      {
        title: 'Stack',
        items: ['React, TypeScript, SCSS', 'Figma handoffs daily'],
      },
    ],
  },
];

export default function Experience() {
  return (
    <TimelineSection
      id="experience"
      eyebrow="Experience"
      subtitle="Where I've worked"
      accentColor="var(--color-experience)"
      pulseColor="#f97316"
    >
      <div className={styles.cards}>
        {ENTRIES.map((entry) => (
          <div key={entry.role} className={styles.card}>
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
