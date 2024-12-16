import styles from '@/components/InfoCard/index.module.scss';

interface Props {
  title: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
}

export const InfoCard = ({ title, content, icon = null, className = '' }: Props) => (
  <div className={`${styles.infoCard} ${className}`}>
    {icon && <span className={styles.icon}>{icon}</span>}
    <p className={styles.sectionTitle}>{title}</p>
    <p>{content}</p>
  </div>
);
