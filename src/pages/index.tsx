import { Information } from "@/components/Information";
import { useTheme } from "@/context/themeContext";
import styles from "@/styles/Home.module.css";
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
          objectFit="cover"
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
            </div>{" "}
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
                  window.open("https://github.com/AymericShini", "_blank")
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
                    "_blank"
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
            <Information
              title="React"
              description="I have been working with React for several years."
              // Icon={FaReact}
            />
            <Information
              title="Node.js"
              description="I am also proficient in backend development with Node.js."
              // Icon={FaNodeJs}
            />
            <Information
              title="Node.js"
              description="I am also proficient in backend development with Node.js."
              // Icon={FaNodeJs}
            />
            <Information
              title="Node.js"
              description="I am also proficient in backend development with Node.js."
              // Icon={FaNodeJs}
            />
          </div>
        </div>
      </div>
    </>
  );
}
