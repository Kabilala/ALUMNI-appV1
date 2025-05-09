import React, { useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser, userData, loading } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkslategray-100"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 md:py-12">
        {/* En-tête de bienvenue */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
            Bienvenue, {currentUser?.displayName || "utilisateur"}
          </h1>
          <p className="text-smi md:text-mini text-dimgray">
            Retrouvez les dernières actualités de votre réseau alumni
          </p>
        </div>

        {/* Contenu principal organisé en grille responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne de gauche - Profil et statistiques */}
          <div className="md:col-span-1">
            <div className="bg-whitesmoke rounded-xl p-4 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gainsboro-100 rounded-full flex items-center justify-center text-2xl text-darkslategray-100 font-bold mr-4">
                  {currentUser?.displayName?.charAt(0).toUpperCase() || "A"}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-darkslategray-100">
                    {currentUser?.displayName || "Utilisateur"}
                  </h2>
                  <p className="text-sm text-dimgray">{currentUser?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white rounded-3xs p-2">
                  <div className="text-lg font-semibold text-darkslategray-100">0</div>
                  <div className="text-xs text-dimgray">Connexions</div>
                </div>
                <div className="bg-white rounded-3xs p-2">
                  <div className="text-lg font-semibold text-darkslategray-100">0</div>
                  <div className="text-xs text-dimgray">Messages</div>
                </div>
              </div>
            </div>

            {/* Section Suggestions */}
            <div className="bg-whitesmoke rounded-xl p-4">
              <h3 className="text-md font-semibold text-darkslategray-100 mb-3">
                Suggestions pour vous
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center bg-white rounded-3xs p-2">
                    <div className="w-10 h-10 bg-gainsboro-100 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-darkslategray-100">
                        Alumni {item}
                      </div>
                      <div className="text-xs text-dimgray">Promotion 202{item}</div>
                    </div>
                    <button className="text-xs bg-black text-white py-1 px-2 rounded-3xs">
                      Suivre
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne centrale - Flux d'actualités */}
          <div className="md:col-span-2">
            {/* Formulaire de publication */}
            <div className="bg-whitesmoke rounded-xl p-4 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gainsboro-100 rounded-full mr-3 flex items-center justify-center text-lg text-darkslategray-100 font-bold">
                  {currentUser?.displayName?.charAt(0).toUpperCase() || "A"}
                </div>
                <input
                  type="text"
                  placeholder="Partagez quelque chose avec votre réseau..."
                  className="flex-1 bg-white border-0 rounded-3xs px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <button className="text-xs flex items-center text-dimgray hover:text-darkslategray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Photo
                  </button>
                  <button className="text-xs flex items-center text-dimgray hover:text-darkslategray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Lien
                  </button>
                </div>
                <button className="text-xs bg-black text-white py-1 px-3 rounded-3xs">
                  Publier
                </button>
              </div>
            </div>

            {/* Publications */}
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-whitesmoke rounded-xl p-4 mb-6">
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 bg-gainsboro-100 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-darkslategray-100">Alumni {post}</div>
                    <div className="text-xs text-dimgray mb-1">il y a {post} heure{post > 1 ? 's' : ''}</div>
                    <p className="text-sm">
                      Ceci est un exemple de publication sur le réseau alumni. Les utilisateurs pourront partager leurs expériences, actualités et opportunités professionnelles.
                    </p>
                  </div>
                </div>
                {post % 2 === 0 && (
                  <div className="bg-gainsboro-200 rounded-3xs h-40 mb-3 flex items-center justify-center text-dimgray">
                    [Image de la publication]
                  </div>
                )}
                <div className="flex justify-between text-xs text-dimgray">
                  <button className="flex items-center hover:text-darkslategray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905v.714L7.5 9h-3a2 2 0 00-2 2v.635M18 19h.01" />
                    </svg>
                    J'aime ({post * 5})
                  </button>
                  <button className="flex items-center hover:text-darkslategray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Commenter ({post * 2})
                  </button>
                  <button className="flex items-center hover:text-darkslategray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Partager
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;