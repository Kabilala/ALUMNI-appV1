import React from "react";
import { Link } from "gatsby";
import { useAuth } from "../context/AuthContext";

const Footer = ({ isMobile = false }) => {
  const { currentUser } = useAuth();

  return (
    <footer className="bg-whitesmoke py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {isMobile ? (
          // Version mobile du footer
          <div className="flex justify-around">
            {currentUser && (
              <>
                <Link
                  to="/home"
                  className="flex flex-col items-center text-darkslategray-100 hover:text-steelblue"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-xs mt-1">Accueil</span>
                </Link>
                <Link
                  to="/search"
                  className="flex flex-col items-center text-darkslategray-100 hover:text-steelblue"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-xs mt-1">Recherche</span>
                </Link>
                <Link
                  to="/chats"
                  className="flex flex-col items-center text-darkslategray-100 hover:text-steelblue"
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span className="text-xs mt-1">Messages</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex flex-col items-center text-darkslategray-100 hover:text-steelblue"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-xs mt-1">Profil</span>
                </Link>
              </>
            )}
          </div>
        ) : (
          // Version desktop du footer
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-comfortaa font-bold">AlumniApp</h2>
              <p className="text-sm text-darkslategray-100">
                Restez connectés avec vos anciens camarades
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
              <Link to="/" className="text-darkslategray-100 hover:text-steelblue">
                Accueil
              </Link>
              <Link to="/contact" className="text-darkslategray-100 hover:text-steelblue">
                Contact
              </Link>
              <Link to="/search" className="text-darkslategray-100 hover:text-steelblue">
                Recherche
              </Link>
              {!currentUser ? (
                <>
                  <Link to="/login" className="text-darkslategray-100 hover:text-steelblue">
                    Connexion
                  </Link>
                  <Link to="/register-step1" className="text-darkslategray-100 hover:text-steelblue">
                    Inscription
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="text-darkslategray-100 hover:text-steelblue">
                    Profil
                  </Link>
                  <Link to="/chats" className="text-darkslategray-100 hover:text-steelblue">
                    Messages
                  </Link>
                </>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-darkslategray-100">
              © {new Date().getFullYear()} AlumniApp
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;