import { SkillSet } from '@/components/SkillSet';
import { useTheme } from '@/context/themeContext';
import styles from '@/pages/index.module.scss';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';

interface Translations {
  [key: string]: string; // This is a dictionary with string keys and string values
}

interface Skill {
  title: string;
  description: string;
  iconPath: string;
  colorCode: string;
}

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const grid1And2Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }, // Starts after 0.8s
};

const grid3Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.2 } }, // Starts after Grid 1 and 2
};

export default function Home() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const skills = t('skills', { returnObjects: true }) as Record<string, Skill>;
  const languages = t('languages', { returnObjects: true }) as Translations;

  return (
    <>
      <Head>
        <title>Aymeric Demange | Portfolio</title>
        <meta
          name="description"
          content="Aymeric Demange | Portfolio | Dev frontend | nextjs | react"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo-light.svg" />
      </Head>

      {/* Hero Banner */}
      <motion.div
        className={styles.heroContainer}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.heroText}>
          <p className={styles.heroTitle}>Aymeric</p>
          <p className={styles.heroSubtitle}>Demange</p>
        </div>
      </motion.div>

      {/* Grid Skills */}
      <div className={styles.skills}>
        <div className={styles.gridContainer}>
          {/* Grid 1 */}
          <motion.div
            className={styles.gridDescription}
            variants={grid1And2Variants}
            initial="hidden"
            animate="visible"
          >
            <p>{t('description')}</p>
          </motion.div>

          {/* Grid 2 */}
          <motion.div
            className={styles.gridSocial}
            variants={grid1And2Variants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.skill}>
              <p className={styles.sectionTitle}>{t('contact.skill')}</p>
              <div className={styles.badgeSection}>
                <span className={styles.badge}>Front-end</span>
                <span className={styles.badge}>Next</span>
              </div>
            </div>
            <div className={styles.language}>
              <p className={styles.sectionTitle}>{t('contact.language')}</p>
              <div className={styles.badgeSection}>
                {Object.keys(languages).map((language, index) => (
                  <span key={index} className={styles.badge}>
                    {languages[language]}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.social}>
              <p className={styles.sectionTitle}>{t('contact.social')}</p>
              <div className={styles.contact}>
                <button
                  className={styles.gridSection}
                  onClick={() =>
                    window.open('https://github.com/AymericShini', '_blank', 'noopener')
                  }
                >
                  <Image
                    src={theme === 'dark' ? '/logo-github-light.svg' : '/logo-github-dark.svg'}
                    alt="github logo"
                    width={30}
                    height={30}
                  />
                </button>
                <button
                  className={styles.gridSection}
                  onClick={() =>
                    window.open(
                      'https://www.linkedin.com/in/demange-aymeric/',
                      '_blank',
                      'noopener',
                    )
                  }
                >
                  <Image
                    src={theme === 'dark' ? '/logo-linkedin-light.svg' : '/logo-linkedin-dark.svg'}
                    alt="linkedin logo"
                    width={30}
                    height={30}
                  />
                </button>
              </div>
            </div>
            <div className={styles.address}>
              <p className={styles.sectionTitle}>{t('contact.address')}</p>
              <p>Vitry-sur-seine</p>
            </div>
            <div className={styles.email}>
              <p className={styles.sectionTitle}>Email</p>
              <p>demange.aymeric@hotmail.com</p>
            </div>
            <div className={styles.phone}>
              <p className={styles.sectionTitle}>{t('contact.phone')}</p>
              <p>+33 6 63 93 53 66</p>
            </div>
          </motion.div>

          {/* Grid 3 */}
          <motion.div
            className={styles.gridSkillset}
            variants={grid3Variants}
            initial="hidden"
            animate="visible"
          >
            {Object.keys(skills).map((skill, index) => (
              <SkillSet
                key={index}
                title={skills[skill].title}
                description={skills[skill].description}
                iconPath={skills[skill].iconPath}
                colorCode={skills[skill].colorCode}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
