import type { ReactNode } from 'react';
import styles from './TimelineSection.module.scss';

interface TimelineSectionProps {
  id: string;
  eyebrow: string;
  subtitle: string;
  accentColor: string;
  pulseColor: string;
  children: ReactNode;
}

export default function TimelineSection({
  id,
  eyebrow,
  subtitle,
  accentColor,
  children,
}: TimelineSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>

          <div className={styles.rail} aria-hidden="true" />

          <div
            className={styles.dot}
            style={{
              background: accentColor,
              animation: 'timelinePulse 2.4s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
          <div
            className={styles.connector}
            style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
            aria-hidden="true"
          />

          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.eyebrow} style={{ color: accentColor }}>{eyebrow}</h2>
              <p className={styles.subtitleText}>{subtitle}</p>
            </div>
            <div className={styles.body}>
              {children}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
