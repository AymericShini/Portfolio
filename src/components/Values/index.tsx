import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'next-i18next';
import TimelineSection from '@/components/TimelineSection';
import styles from './Values.module.scss';
import 'swiper/css';

interface ValueItem {
  title: string;
  desc: string;
}

export default function Values() {
  const { t } = useTranslation('common');
  const items = t('values.items', { returnObjects: true }) as ValueItem[];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TimelineSection
      id="values"
      eyebrow={t('values.eyebrow')}
      subtitle={t('values.subtitle')}
      accentColor="var(--color-values)"
      pulseColor="#60a5fa"
    >
      <p className={styles.intro}>{t('values.intro')}</p>
      <Swiper
        slidesPerView={1.6}
        spaceBetween={14}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiper}
      >
        {items.map(({ title, desc }) => (
          <SwiperSlide key={title}>
            <div className={styles.card}>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{desc}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.dots}>
        {items.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
        ))}
      </div>
    </TimelineSection>
  );
}
