import { useEffect, useState } from 'react';
import styles from './StickyCTA.module.scss';

export default function StickyCTA() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contact = document.getElementById('contact');
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#contact"
      className={styles.cta}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      <span className={styles.dot} aria-hidden="true" />
      Get in touch
    </a>
  );
}
