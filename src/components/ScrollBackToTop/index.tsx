import styles from '@/components/ScrollBackToTop/index.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect when the user scrolls and toggle visibility of the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.footer}>
      {isVisible && (
        <div className={styles.scrollToTop} onClick={scrollToTop}>
          <div className={styles.arrow}>
            <Image src="/arrow-up.png" alt="Arrow up" width={24} height={24} />
          </div>
        </div>
      )}
    </div>
  );
};
