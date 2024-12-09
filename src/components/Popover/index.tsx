import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface Props {
  children: ReactNode; // children can be any valid React node
  content: ReactNode; // content can also be any valid React node
}

const Popover = ({ children, content }: Props) => {
  const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
  const popoverRef = useRef<HTMLDivElement | null>(null); // Reference to the popover element (div)
  const triggerRef = useRef<HTMLButtonElement | null>(null); // Reference to the button element that triggers the popover

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) && // Type assertion to Node here
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) // Type assertion to Node here
      ) {
        setIsVisible(false); // Close the popover if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.popoverContainer}>
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className={styles.popoverTrigger}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className={styles.popoverContent}
          role="dialog"
          aria-modal="true"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
