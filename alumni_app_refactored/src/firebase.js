// firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBf-gLERangd1M6z_xTSKkFQL4ms0ttQNQ',
  authDomain: 'alumni-c1dcb.firebaseapp.com',
  projectId: 'alumni-c1dcb',
  storageBucket: 'alumni-c1dcb.appspot.com',
  messagingSenderId: '499227318430',
  appId: '1:499227318430:web:818522872ca5cabe6fc38f',
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Fonction pour gérer la persistance de session
const setPersistence = (remember) => {
  const persistence = remember ? 'LOCAL' : 'SESSION';
  localStorage.setItem('auth_persistence', persistence);
};

// Récupérer la persistance sauvegardée
const getPersistence = () => {
  return localStorage.getItem('auth_persistence') || 'SESSION';
};

// Fonction pour s'inscrire
const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Mettre à jour le profil avec le nom d'affichage
    await updateProfile(user, { displayName });
    
    // Créer un document utilisateur dans Firestore
    await setDoc(doc(db, 'users', user.uid), {
      displayName,
      email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Fonction pour se connecter
const loginUser = async (email, password, remember = false) => {
  try {
    setPersistence(remember);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Mettre à jour la dernière connexion
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date().toISOString(),
    });
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Fonction pour se déconnecter
const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
};

// Fonction pour réinitialiser le mot de passe
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
};

// Fonction pour récupérer les données utilisateur de Firestore
const getUserData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Aucune donnée utilisateur trouvée');
    }
  } catch (error) {
    throw error;
  }
};

// Fonction pour mettre à jour les données utilisateur
const updateUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export {
  auth,
  db,
  storage,
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getUserData,
  updateUserData,
  onAuthStateChanged,
};