import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../context/AuthContext';

const Layout = ({ children, hideFooter = false, hideHeader = false }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  // Fixer le problème d'hydratation côté client/serveur
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si le composant n'est pas monté (côté serveur), utiliser des valeurs par défaut
  if (!isMounted) {
    return (
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-white">
          {!hideHeader && <Header />}
          <main className="flex-grow">{children}</main>
          {!hideFooter && <Footer />}
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-white">
        {!hideHeader && <Header isMobile={!isDesktop} />}
        <main className={`flex-grow ${isDesktop ? 'max-w-7xl mx-auto w-full px-6' : 'w-full px-4'}`}>
          {children}
        </main>
        {!hideFooter && <Footer isMobile={!isDesktop} />}
      </div>
    </AuthProvider>
  );
};

export default Layout;