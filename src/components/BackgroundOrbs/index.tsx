import styles from './BackgroundOrbs.module.scss';

export default function BackgroundOrbs() {
  return (
    <>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
    </>
  );
}
