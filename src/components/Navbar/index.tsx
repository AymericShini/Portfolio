import FRFlag from '@/assets/france.png';
import USFlag from '@/assets/united-states.png';
import styles from '@/components/Navbar/index.module.scss';
import { useTheme } from '@/context/themeContext';
import i18n from '@/shared/i18n/i18n';
import { createScript } from '@/utils/createScript';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Popover from '../Popover';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // State to handle initial rendering (to avoid SSR mismatch)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after the first render to avoid SSR mismatch
  }, []);

  if (!isMounted) {
    return null; // Render nothing until the component has mounted (avoids SSR mismatch)
  }

  const handleCVClickGTMPush = () => {
    const dataLayer = createScript(
      null,
      `
        var dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: "buttonResumeClicked",
          pagePath: "${router.pathname}",
          pageTitle: "${document.title}",
        });
    `,
    );
    document.head.append(dataLayer);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.content}>
        {/* Left Side: Logo */}
        <Link href="/" className={styles.logo} passHref>
          <Image
            src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'}
            alt="Logo"
            width={30}
            height={30}
          />
        </Link>

        {/* Right Side: Links and Theme Switcher */}
        <div className={styles.actions}>
          <Link href="/resume" className={styles.link} onClick={() => handleCVClickGTMPush()}>
            CV
          </Link>
          <a href="mailto:demange.aymeric@hotmail.com" className={styles.link}>
            Me contacter
          </a>
          {/* Language Switcher */}

          <Popover
            content={
              <>
                <button className={styles.container} onClick={() => i18n.changeLanguage('en-US')}>
                  <Image src={USFlag} width={20} height={20} alt="royaume uni flag" />
                  English
                </button>
                <button className={styles.container} onClick={() => i18n.changeLanguage('fr-FR')}>
                  <Image src={FRFlag} width={20} height={20} alt="royaume uni flag" />
                  Français
                </button>
              </>
            }
          >
            {i18n.language === 'en-US' ? 'English' : 'Français'}
          </Popover>
          <button className={styles.link} onClick={toggleTheme}>
            <Image
              src={theme === 'dark' ? '/moon.svg' : '/sun.svg'}
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
