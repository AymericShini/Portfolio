import styles from "@/components/SkillSet/index.module.scss";
// type Grid component

interface Props {
  title: string;
  description: string;
  iconPath: string;
  colorCode: string;
}

export const SkillSet = ({
  title,
  description,
  iconPath,
  colorCode,
}: Props) => {
  return (
    <div className={styles.gridItem}>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <img className={styles.icon} src={iconPath} alt="javascript logo" />
      <div className={styles.color}>
        <div
          className={styles.colorBackground}
          style={{ backgroundColor: colorCode }}
        />
      </div>
      {/* )} */}
    </div>
  );
};