import React, { createContext, useState, useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { 
  auth, 
  onAuthStateChanged, 
  loginUser, 
  logoutUser, 
  registerUser, 
  resetPassword,
  getUserData
} from '../firebase';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Observer les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        try {
          // Récupérer les données utilisateur depuis Firestore
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (err) {
          console.error("Erreur lors de la récupération des données utilisateur :", err);
        }
      } else {
        setUserData(null);
      }
    });

    // Nettoyer l'observateur lors du démontage
    return unsubscribe;
  }, []);

  // Fonction pour gérer la connexion
  const login = async (email, password, remember = false) => {
    try {
      setError(null);
      await loginUser(email, password, remember);
      navigate('/home');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Fonction pour gérer l'inscription
  const register = async (email, password, displayName) => {
    try {
      setError(null);
      await registerUser(email, password, displayName);
      navigate('/login');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Fonction pour gérer la déconnexion
  const logout = async () => {
    try {
      setError(null);
      await logoutUser();
      navigate('/');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Fonction pour réinitialiser le mot de passe
  const resetUserPassword = async (email) => {
    try {
      setError(null);
      await resetPassword(email);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Valeur à fournir au contexte
  const value = {
    currentUser,
    userData,
    loading,
    error,
    login,
    register,
    logout,
    resetUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};