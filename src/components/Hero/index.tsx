import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import styles from './Hero.module.scss';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const orb1X = useTransform(smoothX, v => v * 0.015);
  const orb1Y = useTransform(smoothY, v => v * 0.015);
  const orb2X = useTransform(smoothX, v => v * 0.03);
  const orb2Y = useTransform(smoothY, v => v * 0.03);
  const orb3X = useTransform(smoothX, v => v * 0.055);
  const orb3Y = useTransform(smoothY, v => v * 0.055);

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const contentY = useTransform(scrollY, [0, 250], [0, -30]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className={styles.hero}>
      <motion.div className={styles.orbDeep}   style={{ x: orb1X, y: orb1Y }} aria-hidden="true" />
      <motion.div className={styles.orbMid}    style={{ x: orb2X, y: orb2Y }} aria-hidden="true" />
      <motion.div className={styles.orbAccent} style={{ x: orb3X, y: orb3Y }} aria-hidden="true" />

      <motion.div
        className={styles.inner}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h1 className={styles.name}>Aymeric Demange</h1>
        <p className={styles.role}>Frontend Engineer</p>

        <div className={styles.status} aria-label="Availability status">
          <span className={styles.pulse} aria-hidden="true" />
          Open to new opportunities
        </div>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>Get in touch</a>
          <a
            href="https://www.linkedin.com/in/aymeric-demange"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnLinkedin}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </motion.div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
