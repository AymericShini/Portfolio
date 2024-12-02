import styles from "@/styles/Information.module.css";
// type Grid component

interface Props {
  title: string;
  description: string;
  Icon?: any;
}

export const Information = ({ title, description, Icon }: Props) => {
  return (
    <div className={styles.gridItem}>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      {/* {Icon && ( */}
      {/* <div className={styles.icon}>
        <img
          className={styles.logo}
          src="/javascript-logo.png"
          alt="javascript logo"
        />
      </div> */}
      <img
        className={styles.icon}
        src="/javascript-logo.png"
        alt="javascript logo"
      />
      <div className={styles.color}>
        <div className={styles.colorBackground}></div>
      </div>
      {/* )} */}
    </div>
  );
};
