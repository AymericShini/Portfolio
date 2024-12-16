import styles from '@/components/IconButton/index.module.scss';
import Image from 'next/image';

interface Props {
  url: string;
  iconLight: string;
  iconDark: string;
  theme: 'light' | 'dark';
  alt?: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton = ({
  url,
  iconLight,
  iconDark,
  alt = 'icon',
  theme = 'light',
  onClick,
  className = '',
}: Props) => (
  <button
    className={`${styles.container} ${className}`}
    onClick={() => (onClick ? onClick() : window.open(url, '_blank', 'noopener'))}
  >
    <Image src={theme === 'dark' ? iconDark : iconLight} alt={alt} width={30} height={30} />
  </button>
);
