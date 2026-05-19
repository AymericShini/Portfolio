import Image from 'next/image';
import styles from './About.module.scss';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.photoWrap}>
            <Image
              src="/profil-photo.png"
              alt="Aymeric Demange"
              fill
              className={styles.photo}
              priority
            />
            <div className={styles.photoGlow} aria-hidden="true" />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>About</h2>
            <p className={styles.subtitle}>Frontend Engineer · Bordeaux, France</p>

            <p className={styles.desc}>
              I&apos;m a frontend engineer with 6 years of experience building web products that
              people actually enjoy using. I care about the details — the transitions, the
              micro-interactions, the moment a user smiles because something just works.
            </p>
            <p className={styles.desc}>
              I&apos;ve worked across analytics dashboards, SaaS billing flows, marketing landing
              pages and everything in between. I thrive in cross-functional teams where design
              and engineering speak the same language.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>6+</span>
                <span className={styles.statLabel}>Years exp.</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>4</span>
                <span className={styles.statLabel}>Companies</span>
              </div>
            </div>

            <div className={styles.chips}>
              {['React', 'Next.js', 'TypeScript', 'Figma', 'Framer Motion', 'Open to work'].map(s => (
                <span key={s} className={styles.chip}>{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
