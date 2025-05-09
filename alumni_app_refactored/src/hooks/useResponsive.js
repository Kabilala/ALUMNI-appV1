import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Fonction pour gérer le redimensionnement de la fenêtre
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Ajouter un écouteur d'événement pour le redimensionnement
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mettre à jour les types d'appareils en fonction de la largeur de la fenêtre
  useEffect(() => {
    const { width } = windowSize;
    setDeviceType({
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
    });
  }, [windowSize]);

  return {
    windowSize,
    ...deviceType,
    isMobileOrTablet: deviceType.isMobile || deviceType.isTablet,
  };
};

export default useResponsive;