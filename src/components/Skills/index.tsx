import { useTranslation } from 'next-i18next';
import TimelineSection from '@/components/TimelineSection';
import styles from './Skills.module.scss';

interface SkillGroup {
  label: string;
  variant: 'fe' | 'dev' | 'default';
  items: string[];
}

export default function Skills() {
  const { t } = useTranslation('common');
  const groups = t('skills.groups', { returnObjects: true }) as SkillGroup[];

  return (
    <TimelineSection
      id="skills"
      eyebrow={t('skills.eyebrow')}
      subtitle={t('skills.subtitle')}
      accentColor="var(--color-skills)"
      pulseColor="#fb7185"
    >
      <p className={styles.intro}>{t('skills.intro')}</p>
      <div className={styles.wrapper}>
        {groups.map(({ label, variant, items }) => (
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
