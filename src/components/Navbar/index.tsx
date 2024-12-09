import FRFlag from '@/assets/france.png';
import UKFlag from '@/assets/royaume-uni.png';
import styles from '@/components/Navbar/index.module.scss';
import { useTheme } from '@/context/themeContext';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Popover from '../Popover';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  // State to handle initial rendering (to avoid SSR mismatch)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after the first render to avoid SSR mismatch
  }, []);

  if (!isMounted) {
    return null; // Render nothing until the component has mounted (avoids SSR mismatch)
  }
  return (
    <header className={styles.navbar}>
      <div className={styles.content}>
        {/* Left Side: Logo */}
        <div className={styles.logo} onClick={() => (window.location.href = '/')}>
          <Image
            src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'}
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
              src={theme === 'dark' ? '/moon.svg' : '/sun.svg'}
              width={22}
              height={22}
              alt="Theme Switcher logo"
            />
          </button>

          {/* Language Switcher */}

          <Popover
            content={
              <div className={styles.popoverContent}>
                <button className={styles.container} onClick={() => i18n.changeLanguage('en-US')}>
                  <Image src={UKFlag} width={20} height={20} alt="royaume uni flag" />
                  English
                </button>
                <button className={styles.container} onClick={() => i18n.changeLanguage('fr-FR')}>
                  <Image src={FRFlag} width={20} height={20} alt="royaume uni flag" />
                  Français
                </button>
              </div>
            }
          >
            {i18n.language === 'en-US' ? 'English' : 'Français'}
          </Popover>
        </div>
      </div>
    </header>
  );
}
