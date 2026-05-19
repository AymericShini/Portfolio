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
    role: 'Senior Frontend Developer',
    company: 'Cliq Digital',
    dates: 'Sep 2021 – Jan 2026 · 4 yrs 4 mos',
    location: 'Paris, France',
    summary: 'Led frontend development for a performance marketing platform serving 10k+ users. Owned the component library and led a team of 5 engineers.',
    bullets: [
      {
        title: 'Product & Engineering',
        items: ['Built analytics dashboard in Next.js', 'Maintained shared component library', 'Led team of 5 engineers in agile scrum'],
      },
      {
        title: 'Process & Collaboration',
        items: ['Worked with product and design daily', 'Introduced Storybook for documentation', 'Mentored junior developers'],
      },
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Ubisoft',
    dates: 'Sep 2019 – Sep 2021 · 2 yrs',
    location: 'Montreuil, France',
    summary: 'Maintained and developed Ubisoft\'s marketing websites in production across high-profile game titles, in close collaboration with the US team.',
    bullets: [
      {
        title: 'Product',
        items: [
          'High-visibility sites: Rainbow Six Siege, Assassin\'s Creed Valhalla',
          'New pages and marketing features built with the US team',
          'Dynamic content via Contentful headless CMS and GraphQL',
        ],
      },
      {
        title: 'Engineering',
        items: [
          'React, Node.js, Lerna stack',
          'Code reviews and deployments via GitLab',
          'Performance and stability in production',
        ],
      },
    ],
  },
  {
    role: 'Freelance Full-stack Developer',
    company: 'LGM',
    dates: 'Sep 2018 – Jan 2019 · 5 mos',
    location: 'Vélizy, France',
    summary: 'Built an internal CRM within the IT department to centralise and manage business data for operational teams.',
    bullets: [
      {
        title: 'Engineering',
        items: [
          'CRM features for internal operations teams',
          'Management interfaces to centralise and administer business data',
          'REST API integration connecting frontend to internal services',
        ],
      },
      {
        title: 'Stack',
        items: ['Angular 5, REST API, C', 'Maintenance and continuous improvements'],
      },
    ],
  },
  {
    role: 'Full-stack Developer',
    company: 'CPI Software',
    dates: 'Sep 2017 – Sep 2018 · 1 yr',
    location: 'Croissy, France',
    summary: 'Work-study focused on full-stack web development and customer-facing technical support.',
    bullets: [
      {
        title: 'Development',
        items: ['Built company website in JS / CSS / HTML / PHP', 'Maintained and extended existing features'],
      },
      {
        title: 'Support',
        items: ['Level 1 support on company software', 'Direct contact with clients'],
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
