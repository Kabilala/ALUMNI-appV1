import React, { useState } from "react";
import { navigate } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const RegisterStep1 = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Valider l'email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    // Valider le mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    
    // Valider la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    // S'il y a des erreurs, les afficher
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Stocker les données dans sessionStorage pour l'étape suivante
    sessionStorage.setItem("registerStep1", JSON.stringify(formData));
    
    // Passer à l'étape suivante
    navigate("/register-step2");
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto py-8 px-4 md:py-12 md:px-0">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
            Créer un compte
          </h1>
          <p className="text-smi text-dimgray">
            Étape 1/2 : Informations de connexion
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <FormInput
            id="email"
            name="email"
            label="Adresse email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            required
            error={errors.email}
          />
          
          <FormInput
            id="password"
            name="password"
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Créez un mot de passe sécurisé"
            required
            error={errors.password}
          />
          
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmez votre mot de passe"
            required
            error={errors.confirmPassword}
          />
          
          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
            >
              Continuer
            </Button>
          </div>
          
          <div className="mt-6 text-center text-smi">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-darkslategray-100 hover:text-steelblue font-medium"
            >
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterStep1;