import TimelineSection from '@/components/TimelineSection';
import styles from './Skills.module.scss';

interface SkillGroup {
  label: string;
  variant: 'fe' | 'dev' | 'default';
  items: string[];
}

const GROUPS: SkillGroup[] = [
  { label: 'Frontend',        variant: 'fe',      items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'VueJS', 'Node.js', 'SCSS'] },
  { label: 'Styling',         variant: 'fe',      items: ['TailwindCSS', 'MUI', 'Ant Design', 'Radix UI', 'Styled-components'] },
  { label: 'Testing',         variant: 'dev',     items: ['Jest', 'Cypress', 'Playwright', 'React Testing Library', 'Vitest'] },
  { label: 'Tooling & CI/CD', variant: 'dev',     items: ['Git', 'Vite', 'Webpack', 'GitHub Actions', 'Vercel', 'Netlify', 'ESLint / Prettier'] },
  { label: 'Data & Viz',      variant: 'dev',     items: ['REST API', 'React Query', 'WebSocket', 'Recharts', 'D3.js', 'Chart.js'] },
  { label: 'Design',          variant: 'default', items: ['Figma', 'Photoshop', 'Adobe XD', 'Illustrator', 'i18next'] },
  { label: 'Languages',       variant: 'default', items: ['French — native', 'English — professional'] },
];

export default function Skills() {
  return (
    <TimelineSection
      id="skills"
      eyebrow="Skills"
      subtitle="Tech stack"
      accentColor="var(--color-skills)"
      pulseColor="#fb7185"
    >
      <p className={styles.intro}>
        A focused stack built over 6 years. Every tool here has been used in production.
      </p>
      <div className={styles.wrapper}>
        {GROUPS.map(({ label, variant, items }) => (
          <div key={label} className={styles.group}>
            <div className={styles.groupLabel}>{label}</div>
            <div className={styles.tagRow}>
              {items.map((item) => (
                <span key={item} className={`${styles.tag} ${styles[variant]}`}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
