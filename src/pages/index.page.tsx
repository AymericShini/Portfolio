import { SkillSet } from "@/components/SkillSet";
import { useTheme } from "@/context/themeContext";
import styles from "@/pages/index.module.scss";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";

interface Translations {
  [key: string]: string; // This is a dictionary with string keys and string values
}

interface Skill {
  title: string;
  description: string;
  iconPath: string;
  colorCode: string;
}

export default function Home() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true }) as Record<string, Skill>;
  const languages = t("languages", { returnObjects: true }) as Translations;
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
      <div className={styles.heroContainer}>
        <Image
          src="/hero.jpg"
          alt="hero banner"
          width={1920}
          height={1080}
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <p className={styles.heroTitle}>Aymeric</p>
          <p className={styles.heroSubtitle}>Demange</p>
        </div>
      </div>

      {/* Grid Skills */}
      <div className={styles.skills}>
        <div className={styles.gridContainer}>
          {/* Grid 1 */}
          <div className={styles.grid1}>
            <p>{t("description")}</p>
          </div>

          {/* Grid 2 */}
          <div className={styles.grid2}>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>{t("contact.skill")}</p>
              <div className={styles.badgeSection}>
                <span className={styles.badge}>Front-end</span>
                <span className={styles.badge}>Next</span>
              </div>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>{t("contact.language")}</p>
              <div className={styles.badgeSection}>
                {Object.keys(languages).map((language, index) => (
                  <span key={index} className={styles.badge}>
                    {languages[language]}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>{t("contact.address")}</p>
              <p>Vitry-sur-seine</p>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Email</p>
              <p>demange.aymeric@hotmail.com</p>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>{t("contact.phone")}</p>
              <p>+33 6 63 93 53 66</p>
            </div>
            <div className={styles.contact}>
              <button
                className={styles.gridSection}
                onClick={() =>
                  window.open(
                    "https://github.com/AymericShini",
                    "_blank",
                    "noopener"
                  )
                }
              >
                <Image
                  src={
                    theme === "dark"
                      ? "/logo-github-light.svg"
                      : "/logo-github-dark.svg"
                  }
                  alt="github logo"
                  width={30}
                  height={30}
                />
              </button>
              <button
                className={styles.gridSection}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/demange-aymeric/",
                    "_blank",
                    "noopener"
                  )
                }
              >
                <Image
                  src={
                    theme === "dark"
                      ? "/logo-linkedin-light.svg"
                      : "/logo-linkedin-dark.svg"
                  }
                  alt="linkedin logo"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>

          {/* Grid 3 */}
          <div className={styles.grid3}>
            {Object.keys(skills).map((skill, index) => (
              <SkillSet
                key={index}
                title={skills[skill].title}
                description={skills[skill].description}
                iconPath={skills[skill].iconPath}
                colorCode={skills[skill].colorCode}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
