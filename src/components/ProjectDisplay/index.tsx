import styles from '@/components/ProjectDisplay/index.module.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';

interface Image {
  src: string;
  alt: string;
}
interface Props {
  title: string;
  subtitle: string;
  description: string;
  images: Image[]; // Array of images with src and alt
  backgroundColorBlur: string;
  altText?: string;
}

export const ProjectDisplay = ({
  title,
  subtitle,
  description,
  images,
  backgroundColorBlur = 'blue',
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  const openModal = (image: Image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <article className={styles.article}>
      {/* Blurred background */}
      <div
        style={{ backgroundColor: `${backgroundColorBlur}` }}
        className={`${styles.blurBackground}`}
      />
      <div className={styles.title}>
        <header className={styles.header}>
          <h2>{title}</h2>
          <span>{subtitle}</span>
        </header>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Swiper Slideshow */}
      <div className={styles.slider}>
        <Swiper
          key={`swiper-${title}`}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={20}
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        >
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: activeIndex === index ? 1 : 0.9 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={styles.imageWrapper}
                  onClick={() => openModal(image)}
                >
                  <img src={image.src} alt={image.alt} className={styles.image} />
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && currentImage && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button onClick={closeModal} className={styles.closeButton}>
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={styles.modalContent}
            >
              <img src={currentImage.src} alt={currentImage.alt} className={styles.modalImage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
