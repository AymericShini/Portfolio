import React, { useRef, useState } from 'react';
import styles from '@/components/ProjectDisplay/index.module.scss';

interface Props {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  backgroundColorBlur: string;
  altText?: string;
}

export const ProjectDisplay = ({
  title,
  subtitle,
  description,
  imageSrc,
  backgroundColorBlur = 'blue',
  altText = 'Project image',
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const blurRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const projectRect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - projectRect.left; // X position relative to project div
    const mouseY = event.clientY - projectRect.top; // Y position relative to project div

    // Move the blur towards the mouse position
    if (blurRef.current && blurRef.current) {
      blurRef.current.style.transform = `translate3d(${mouseX - 100}px, ${mouseY - 100}px, 0)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div>
      <article
        className={styles.article}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Blurred background */}
        <div
          style={{ backgroundColor: `${backgroundColorBlur}` }}
          className={`${styles.blurBackground} ${isHovering ? styles.active : ''}`}
          ref={blurRef}
        />
        <div className={styles.title}>
          <header className={styles.header}>
            <h2>{title}</h2>
            <span>{subtitle}</span>
          </header>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.image}>
          <img src={imageSrc} alt={altText} />
        </div>
      </article>
    </div>
  );
};
