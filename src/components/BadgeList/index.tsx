import styles from '@/components/BadgeList/index.module.scss';

interface Props {
  title: string;
  items: string[];
}

export const BadgeList = ({ title, items }: Props) => (
  <div>
    {title && <p className={styles.sectionTitle}>{title}</p>}
    <div className={styles.badgeSection}>
      {items.map((item, index) => (
        <span key={index} className={styles.badge}>
          {item}
        </span>
      ))}
    </div>
  </div>
);
