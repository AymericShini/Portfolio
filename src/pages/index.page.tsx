import { BadgeList } from '@/components/BadgeList';
import { IconButton } from '@/components/IconButton';
import { InfoCard } from '@/components/InfoCard';
import { ProjectDisplay } from '@/components/ProjectDisplay';
import { SkillSet } from '@/components/SkillSet';
import { useTheme } from '@/context/themeContext';
import { contactDetails } from '@/data/contactDetails';
import { socialLinks } from '@/data/socialLinks';
import styles from '@/pages/index.module.scss';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

interface ProjectsTranslations {
  [key: string]: {
    title: string;
    subtitle: string;
    description: string;
    imageSrc: { src: string; alt: string }[]; // Array of images
    backgroundColorBlur: string;
  };
}

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const grid1And2Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }, // Starts after 0.8s
};

const grid3Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.2 } }, // Starts after Grid 1 and 2
};

const projectVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.8 } }, // Starts after grid3
};

export default function Home() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const skills = t('skills', { returnObjects: true }) as Record<string, Skill>;
  const languages = t('languages', { returnObjects: true }) as Translations;
  const projects = t('projects', { returnObjects: true }) as ProjectsTranslations;

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
      <motion.section
        className={styles.project}
        variants={projectVariants}
        initial="hidden"
        animate="visible"
      >
        {projects &&
          Object.keys(projects).map((project, index) => (
            <ProjectDisplay
              key={index}
              title={projects[project].title}
              subtitle={projects[project].subtitle}
              description={projects[project].description}
              images={projects[project].imageSrc}
              backgroundColorBlur={projects[project].backgroundColorBlur}
            />
          ))}
      </motion.section>
    </main>
  );
}
