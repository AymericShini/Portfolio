import { useEffect, useState } from 'react';
import styles from './FloatingDots.module.scss';

interface DotConfig {
  id: number;
  left: string;
  bottom: string;
  size: number;
  duration: number;
  delay: number;
}

const DOT_COUNT = 30;

function generateDots(): DotConfig[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 15}%`,
    size: 3 + Math.random() * 3,
    duration: 8 + Math.random() * 5,
    delay: -(Math.random() * 13),
  }));
}

export default function FloatingDots() {
  const [dots, setDots] = useState<DotConfig[]>([]);

  useEffect(() => {
    setDots(generateDots());
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      {dots.map(dot => (
        <span
          key={dot.id}
          className={styles.dot}
          style={{
            left: dot.left,
            bottom: dot.bottom,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
