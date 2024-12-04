import { SkillSet } from "@/components/SkillSet";
import { useTheme } from "@/context/themeContext";
import styles from "@/pages/index.module.scss";
import localFont from "next/font/local";
import Head from "next/head";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { theme } = useTheme();
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
            <p>
              Salut, je suis aymeric, un Développeur Frontend curieux (et
              parfois Designer UI) avec plus de 5 ans d'expérience, basé à Vitry
              sur Seine. Je m'efforce toujours de grandir et d'apprendre quelque
              chose de nouveau pour créer de meilleures choses et obtenir de
              meilleurs résultats. Je me spécialise dans le développement
              Frontend, avec un accent particulier sur créer un code fonctionnel
              et orientée pour le business. Je me décris comme un développeur
              qui souhaite avant tout faire du bon code propre.
            </p>
          </div>

          {/* Grid 2 */}
          <div className={styles.grid2}>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Compétences</p>
              <div className={styles.badgeSection}>
                <span className={styles.badge}>Front-end confirmé</span>
                <span className={styles.badge}>Next</span>
              </div>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Adresse</p>
              <p>Vitry-sur-seine</p>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Email</p>
              <p>demange.aymeric@hotmail.com</p>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Téléphone</p>
              <p>+33 6 63 93 53 66</p>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Diplôme</p>
              <p>To be done</p>
            </div>
            <div className={styles.gridSection}>
              <p className={styles.sectionTitle}>Language</p>
              <div className={styles.badgeSection}>
                <span className={styles.badge}>Français</span>
                <span className={styles.badge}>Anglais</span>
              </div>
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
            {/* Displaying multiple GridComponents */}
            <SkillSet
              title="Javascript"
              description="I have a great knowledge with JavaScript, particularly ES6+ features. In order to gain a deep understanding of JS, I focus on what is happening under the hood."
              iconPath="/logo-javascript.png"
              colorCode="#f0db4f"
            />
            <SkillSet
              title="React"
              description="I'm experienced with React, which I have used for many projects. I'm familiar with common concepts of React. My principle is to write clean and maintainable code."
              iconPath="/logo-react.png"
              colorCode="#60D7F7"
            />
            <SkillSet
              title="TypeScript"
              description="Fix Bugs in Development instead of Production. This is my reason why I should use TypeScript. TypeScript is my main language to start a new project."
              iconPath="/logo-typescript.svg"
              colorCode="#017ACD"
            />
            <SkillSet
              title="SASS"
              description="Effective design can encourage customers to buy from you and not from your competitors. I care about design, and I think it should be pleasing."
              iconPath="/logo-scss.png"
              colorCode="#CD669A"
            />
          </div>
        </div>
      </div>
    </>
  );
}
