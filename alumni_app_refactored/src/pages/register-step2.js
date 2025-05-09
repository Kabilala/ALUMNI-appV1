import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const RegisterStep2 = () => {
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    graduationYear: "",
    specialization: "",
  });
  const [step1Data, setStep1Data] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Récupérer les données de l'étape 1
  useEffect(() => {
    const storedData = sessionStorage.getItem("registerStep1");
    if (!storedData) {
      // Rediriger vers l'étape 1 si les données ne sont pas disponibles
      navigate("/register-step1");
      return;
    }
    
    try {
      setStep1Data(JSON.parse(storedData));
    } catch (e) {
      console.error("Erreur lors de la récupération des données:", e);
      navigate("/register-step1");
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Effacer l'erreur lorsque l'utilisateur corrige le champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    
    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.graduationYear);
    
    if (formData.graduationYear && (isNaN(year) || year < 1950 || year > currentYear + 5)) {
      newErrors.graduationYear = "Année de diplôme invalide";
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    if (!step1Data) {
      navigate("/register-step1");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Créer un nom d'affichage à partir des prénom et nom
      const displayName = `${formData.firstName} ${formData.lastName}`;
      
      // Appeler la fonction d'inscription
      const success = await register(
        step1Data.email,
        step1Data.password,
        displayName
      );
      
      if (success) {
        // Nettoyer les données de session
        sessionStorage.removeItem("registerStep1");
        
        // Rediriger vers la page de connexion
        navigate("/login");
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      setErrors({ submit: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const goBack = () => {
    navigate("/register-step1");
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto py-8 px-4 md:py-12 md:px-0">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
            Créer un compte
          </h1>
          <p className="text-smi text-dimgray">
            Étape 2/2 : Informations personnelles
          </p>
        </div>
        
        {(errors.submit || error) && (
          <div className="bg-red-100 bg-opacity-10 text-red-100 p-3 rounded-3xs mb-6 text-smi">
            {errors.submit || error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="firstName"
              name="firstName"
              label="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
              error={errors.firstName}
            />
            
            <FormInput
              id="lastName"
              name="lastName"
              label="Nom"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Votre nom"
              required
              error={errors.lastName}
            />
          </div>
          
          <FormInput
            id="graduationYear"
            name="graduationYear"
            label="Année de diplôme"
            type="number"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="Ex: 2020"
            error={errors.graduationYear}
          />
          
          <FormInput
            id="specialization"
            name="specialization"
            label="Spécialisation / Filière"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Ex: Informatique, Commerce, Droit..."
            error={errors.specialization}
          />
          
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              type="button"
              variant="outline"
              size="large"
              fullWidth
              onClick={goBack}
            >
              Retour
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterStep2;