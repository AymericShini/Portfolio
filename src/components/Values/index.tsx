import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TimelineSection from '@/components/TimelineSection';
import styles from './Values.module.scss';
import 'swiper/css';

const VALUES = [
  { title: 'Craft matters', desc: "Good enough isn't. The last 10% of polish is what separates memorable from forgettable." },
  { title: 'Ownership', desc: 'I treat what I build as mine to care for — not just a ticket to close.' },
  { title: 'Clarity first', desc: 'Simple beats clever. I write code and interfaces that are easy to understand.' },
  { title: 'Keep learning', desc: "The stack changes. Curiosity doesn't. I stay close to what's coming next." },
];

export default function Values() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TimelineSection
      id="values"
      eyebrow="Values"
      subtitle="What I believe in"
      accentColor="var(--color-values)"
      pulseColor="#60a5fa"
    >
      <p className={styles.intro}>
        These aren&apos;t buzzwords. They&apos;re what actually shapes how I work and what I&apos;m proud to ship.
      </p>
      <Swiper
        slidesPerView={1.6}
        spaceBetween={14}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiper}
      >
        {VALUES.map(({ title, desc }) => (
          <SwiperSlide key={title}>
            <div className={styles.card}>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{desc}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.dots}>
        {VALUES.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
        ))}
      </div>
    </TimelineSection>
  );
}
