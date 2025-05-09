import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { updateUserData } from "../firebase";

const Profile = () => {
  const { currentUser, userData, loading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    company: "",
    position: "",
    education: "",
    graduationYear: "",
    phoneNumber: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Rediriger si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading]);
  
  // Initialiser le formulaire avec les données utilisateur
  useEffect(() => {
    if (currentUser && userData) {
      setFormData({
        displayName: currentUser.displayName || "",
        bio: userData.bio || "",
        location: userData.location || "",
        company: userData.company || "",
        position: userData.position || "",
        education: userData.education || "",
        graduationYear: userData.graduationYear || "",
        phoneNumber: userData.phoneNumber || ""
      });
    }
  }, [currentUser, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    
    try {
      await updateUserData(currentUser.uid, formData);
      setIsEditing(false);
      setSaveSuccess(true);
      
      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setSaveError("Une erreur s'est produite lors de la sauvegarde du profil.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

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
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
              Mon profil
            </h1>
            <p className="text-smi md:text-mini text-dimgray">
              Gérez vos informations personnelles et professionnelles
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              size="medium"
              onClick={handleLogout}
              className="mr-2"
            >
              Déconnexion
            </Button>
            {!isEditing ? (
              <Button
                variant="primary"
                size="medium"
                onClick={() => setIsEditing(true)}
              >
                Modifier le profil
              </Button>
            ) : (
              <Button
                variant="danger"
                size="medium"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            )}
          </div>
        </div>

        {saveSuccess && (
          <div className="bg-green-100 bg-opacity-20 text-green-700 p-3 rounded-3xs mb-6 text-smi">
            Votre profil a été mis à jour avec succès !
          </div>
        )}

        {saveError && (
          <div className="bg-red-100 bg-opacity-10 text-red-100 p-3 rounded-3xs mb-6 text-smi">
            {saveError}
          </div>
        )}

        <div className="bg-whitesmoke rounded-xl p-6">
          <div className="flex flex-col md:flex-row">
            {/* Photo de profil et informations de base */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <div className="w-32 h-32 bg-gainsboro-100 rounded-full flex items-center justify-center text-4xl text-darkslategray-100 font-bold mb-4">
                {currentUser?.displayName?.charAt(0).toUpperCase() || "A"}
              </div>
              
              {!isEditing ? (
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-semibold text-darkslategray-100 mb-1">
                    {formData.displayName || "Utilisateur"}
                  </h2>
                  <p className="text-sm text-dimgray mb-3">{currentUser?.email}</p>
                  <p className="text-sm text-darkslategray-100 mb-4">{formData.bio || "Aucune biographie"}</p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {formData.location && (
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {formData.location}
                      </div>
                    )}
                    
                    {formData.company && (
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {formData.company} {formData.position && `(${formData.position})`}
                      </div>
                    )}
                    
                    {formData.education && (
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        {formData.education} {formData.graduationYear && `(${formData.graduationYear})`}
                      </div>
                    )}
                    
                    {formData.phoneNumber && (
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {formData.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="mb-4">
                    <Button variant="secondary" size="small" className="w-full">
                      Changer de photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Formulaire de profil */}
            <div className="w-full md:w-2/3 md:pl-8">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="displayName"
                      name="displayName"
                      label="Nom complet"
                      value={formData.displayName}
                      onChange={handleChange}
                      required
                    />
                    
                    <FormInput
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Téléphone"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="location"
                      name="location"
                      label="Localisation"
                      value={formData.location}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="company"
                      name="company"
                      label="Entreprise"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="position"
                      name="position"
                      label="Poste"
                      value={formData.position}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="education"
                      name="education"
                      label="Formation"
                      value={formData.education}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      id="graduationYear"
                      name="graduationYear"
                      label="Année de diplôme"
                      value={formData.graduationYear}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label
                      htmlFor="bio"
                      className="block text-darkslategray-100 text-smi mb-1 font-roboto"
                    >
                      Biographie
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-white border border-gainsboro-100 rounded-3xs focus:outline-none focus:ring-1 focus:ring-darkslategray-100 font-roboto text-smi"
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="medium"
                      disabled={isSaving}
                    >
                      {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-darkslategray-100 mb-4 border-b pb-2">
                    Expérience professionnelle
                  </h3>
                  
                  {/* Placeholder pour les données d'expérience */}
                  <div className="mb-8">
                    <div className="bg-white rounded-3xs p-4 mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Aucune expérience</h4>
                          <p className="text-sm text-dimgray mt-1">
                            Ajoutez votre expérience professionnelle en cliquant sur "Modifier le profil"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-darkslategray-100 mb-4 border-b pb-2">
                    Formation
                  </h3>
                  
                  {/* Placeholder pour les données de formation */}
                  <div>
                    <div className="bg-white rounded-3xs p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            {formData.education ? formData.education : "Aucune formation"}
                          </h4>
                          <p className="text-sm text-dimgray mt-1">
                            {formData.graduationYear ? `Promotion ${formData.graduationYear}` : "Ajoutez votre formation en cliquant sur \"Modifier le profil\""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;