import styles from './index.module.scss';

const NAV_LINKS = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#strengths',  label: 'Strengths' },
  { href: '#values',     label: 'Values' },
  { href: '#education',  label: 'Education' },
  { href: '#skills',     label: 'Skills' },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.links}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} className={styles.link}>{label}</a>
        ))}
        <span className={styles.sep} aria-hidden="true" />
        <a href="#" className={styles.soon} aria-disabled="true">My Projects ✦</a>
        <span className={styles.sep} aria-hidden="true" />
        <a href="#contact" className={styles.link}>Contact</a>
      </div>
    </nav>
  );
}
