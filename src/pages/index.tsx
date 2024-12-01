import styles from '@/styles/Home.module.css';
import localFont from 'next/font/local';
import Head from 'next/head';
import Image from 'next/image';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Aymeric Demange | Portfolio</title>
        <meta name="description" content="Aymeric portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.logoContainer}>
              <Image aria-hidden src="/logo.svg" alt="Logo icon header" width={25} height={25} />
            </div>
            <nav className={styles.navigation}>
              <a href="/cv" className={styles.navButton}>
                CV
              </a>
              <a href="mailto:demange.aymeric@hotmail.com" className={styles.navButton}>
                Me contacter
              </a>
              <button className={styles.navButton} aria-label="switch theme">
                <Image aria-hidden src="/sun.svg" alt="Menu icon" width={16} height={16} />
              </button>
            </nav>
          </header>
          <div className={styles.hero}>
            <div className={styles.heroContainer}>
              <img className={styles.heroImage} src="/hero.png" />
            </div>
            <h1 className={styles.heroText}>
              <span>Aymeric</span>
              <span>Demange</span>
            </h1>
          </div>
          <div>
            <p className={styles.description}>
              Développeur web front-end passionné par le design et l'expérience utilisateur. J'aime
              créer des interfaces simples et intuitives qui répondent aux besoins de l'utilisateur.
            </p>

            <div className={styles.iconBadge}>
              {/* <span className={styles.iconText}>
                <img src="/javascript-logo.png" />
              </span> */}
            </div>
            <div className={styles.card}>
              <span className={styles.title}>JavaScript</span>
              <p className={styles.description}>
                I have a great knowledge with JavaScript, particularly ES6+ features. In order to
                gain a deep understanding of JS, I focus on what is happening under the hood.
              </p>
            </div>
          </div>
        </main>
        {/* <footer className={styles.footer}>
          <p>
            Made with ❤️ by <a href="#">Aymeric Demange</a>
          </p>
        </footer> */}
      </div>
    </>
  );
}
