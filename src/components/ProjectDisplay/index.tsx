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

  // Function to open the modal
  const openModal = (image: Image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
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
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }} // Enable pagination dots
          loop={true} // Infinite looping
          centeredSlides={true} // Center current slide
          slidesPerView={1.5} // Show partial next/prev images
          spaceBetween={20} // Adjust space between slides
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)} // Track active slide
        >
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: activeIndex === index ? 1 : 0.8 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '300px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => openModal(image)} // Open modal on click
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: '100%',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && currentImage && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
            onClick={closeModal} // Close modal on background click
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '2%',
                right: '3%',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  borderRadius: '10px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
