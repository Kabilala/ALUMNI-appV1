import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useAuth } from "../context/AuthContext";

const Header = ({ isMobile = false }) => {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mise à jour de l'heure toutes les minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Formater l'heure
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Barre d'état (version mobile uniquement) */}
        {isMobile && (
          <div className="flex justify-between items-center px-4 h-11 border-b">
            <div className="font-sf-pro-text tracking-[-0.33px] font-semibold">
              {formattedTime}
            </div>
            <div className="flex items-center">
              <img
                className="h-4 w-auto object-contain"
                alt="Connexion"
                src="/connections1@2x.png"
              />
            </div>
          </div>
        )}

        {/* Navigation principale */}
        <nav className="flex justify-between items-center px-4 py-3 md:py-4">
          <Link to="/" className="text-xl font-comfortaa font-bold">
            AlumniApp
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/home" className="text-gray-100 hover:text-darkslategray-100">
                  Accueil
                </Link>
                <Link to="/search" className="text-gray-100 hover:text-darkslategray-100">
                  Recherche
                </Link>
                <Link to="/chats" className="text-gray-100 hover:text-darkslategray-100">
                  Messages
                </Link>
                <Link to="/profile" className="text-gray-100 hover:text-darkslategray-100">
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-3xs text-white bg-gray-100 hover:bg-darkslategray-100"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-100 hover:text-darkslategray-100">
                  Connexion
                </Link>
                <Link
                  to="/register-step1"
                  className="px-4 py-2 rounded-3xs text-white bg-gray-100 hover:bg-darkslategray-100"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Menu mobile */}
        {isMobile && menuOpen && (
          <div className="fixed inset-0 bg-white z-50 pt-16">
            <div className="flex flex-col items-center space-y-6 pt-8">
              <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {currentUser ? (
                <>
                  <Link
                    to="/home"
                    className="text-lg py-3 border-b border-gray-200 w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/search"
                    className="text-lg py-3 border-b border-gray-200 w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Recherche
                  </Link>
                  <Link
                    to="/chats"
                    className="text-lg py-3 border-b border-gray-200 w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Messages
                  </Link>
                  <Link
                    to="/profile"
                    className="text-lg py-3 border-b border-gray-200 w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-lg py-3 text-white bg-gray-100 rounded-3xs px-8 mt-4"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg py-3 border-b border-gray-200 w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register-step1"
                    className="text-lg py-3 text-white bg-gray-100 rounded-3xs px-8 mt-4"
                    onClick={() => setMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;