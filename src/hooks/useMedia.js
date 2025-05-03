import { useMediaQuery } from "react-responsive";

/**
 * Хук для работы с медиа-запросами в разных размерах экрана
 * @returns {Object} Объект с флагами для разных размеров экрана
 */
const useMedia = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useMedia;
