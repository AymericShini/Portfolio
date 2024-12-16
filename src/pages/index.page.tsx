import { BadgeList } from '@/components/BadgeList';
import { IconButton } from '@/components/IconButton';
import { InfoCard } from '@/components/InfoCard';
import { SkillSet } from '@/components/SkillSet';
import { useTheme } from '@/context/themeContext';
import { contactDetails } from '@/data/contactDetails';
import { socialLinks } from '@/data/socialLinks';
import styles from '@/pages/index.module.scss';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

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
    <main className={styles.home}>
      <Head>
        <title>Aymeric Demange | Portfolio | Home</title>
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
          {/* Grid 1 Description */}
          <motion.div
            className={styles.gridDescription}
            variants={grid1And2Variants}
            initial="hidden"
            animate="visible"
          >
            <p>{t('description')}</p>
          </motion.div>

          {/* Grid 2 Social and Skills */}
          <motion.div
            className={styles.gridSocial}
            variants={grid1And2Variants}
            initial="hidden"
            animate="visible"
          >
            <BadgeList title={t('contact.skill')} items={['Front-end', 'Next']} />
            <BadgeList title={t('contact.language')} items={Object.values(languages)} />
            <div className={styles.contact}>
              <p className={styles.sectionTitle}>{t('contact.social')}</p>
              <div className={styles.social}>
                {socialLinks.map((link, index) => (
                  <IconButton
                    key={index}
                    url={link.url}
                    iconLight={link.iconLight}
                    iconDark={link.iconDark}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
            {contactDetails.map((detail, index) => (
              <InfoCard key={index} title={t(`contact.${detail.type}`)} content={detail.value} />
            ))}
          </motion.div>

          {/* Grid 3 Skillset */}
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

      {/* Project Done */}
      <section className={styles.project}>
        <div>
          <article className={styles.article}>
            <div className={styles.title}>
              <header className={styles.header}>
                <h2>Cliq analytics</h2>
                <span>Admin interface</span>
              </header>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ligula sit amet
                leo facilisis volutpat et id libero. Suspendisse pretium, purus nec consectetur
                porta, lacus sem bibendum felis, nec dapibus dolor eros nec velit. Orci varius
                natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc
                condimentum nunc ac dictum porttitor. Cras auctor pulvinar rhoncus. Morbi sodales
                velit sagittis turpis lobortis, vitae facilisis lacus scelerisque. Fusce tincidunt
                ipsum in massa fermentum congue.
              </p>
            </div>
            <div className={styles.image}>
              <img src="/test.png" />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
