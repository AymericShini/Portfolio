import TimelineSection from '@/components/TimelineSection';
import styles from './Strengths.module.scss';

const STRENGTHS = [
  { title: 'Execution speed', desc: 'I ship fast without cutting corners. Rapid iteration is a habit, not a shortcut.' },
  { title: 'Design sensibility', desc: "Comfortable in Figma and equally comfortable pushing back when something's off." },
  { title: 'Cross-functional bridge', desc: 'I translate between design, product and engineering without losing anything.' },
  { title: 'Systems thinking', desc: "I build components that scale. Patterns, not one-offs. Libraries, not repetition." },
];

export default function Strengths() {
  return (
    <TimelineSection
      id="strengths"
      eyebrow="Strengths"
      subtitle="What I bring"
      accentColor="var(--color-strengths)"
      pulseColor="#a78bfa"
    >
      <p className={styles.intro}>
        I don&apos;t just write code — I bring craft, speed, and a product mindset to everything I build.
      </p>
      <div className={styles.grid}>
        {STRENGTHS.map(({ title, desc }) => (
          <div key={title} className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>{desc}</div>
          </div>
        ))}
      </div>
    </TimelineSection>
  );
}
