import styles from "@/components/Navbar/index.module.scss";
import { useTheme } from "@/context/themeContext";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.navbar}>
      <div className={styles.content}>
        {/* Left Side: Logo */}
        <div className={styles.logo}>
          <Image
            src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
            alt="Logo"
            width={30}
            height={30}
          />
        </div>

        {/* Right Side: Links and Theme Switcher */}
        <div className={styles.actions}>
          <Link href="/cv" className={styles.link}>
            CV
          </Link>
          <a href="mailto:demange.aymeric@hotmail.com" className={styles.link}>
            Me contacter
          </a>
          <button className={styles.link} onClick={toggleTheme}>
            <Image
              src={theme === "dark" ? "/moon.svg" : "/sun.svg"}
              width={22}
              height={22}
              alt="Theme Switcher logo"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
