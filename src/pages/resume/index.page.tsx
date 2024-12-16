import styles from '@/pages/resume/index.module.scss';
import Head from 'next/head';

export default function Resume() {
  return (
    <main className={styles.resume}>
      <Head>
        <title>Aymeric Demange | Portfolio | Resume</title>
        <meta
          name="description"
          content="Aymeric Demange | Portfolio | Dev frontend | nextjs | react | resume | CV"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo-light.svg" />
      </Head>
      Resume code page to be done
    </main>
  );
}
