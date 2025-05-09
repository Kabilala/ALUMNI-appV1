import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  
  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation de base
    if (!email || !password) {
      setFormError("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsLoading(true);
    setFormError("");
    
    try {
      const success = await login(email, password, rememberMe);
      if (!success) {
        setFormError("Échec de la connexion. Vérifiez vos identifiants.");
      }
    } catch (err) {
      setFormError("Une erreur s'est produite. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-8 px-4 md:py-12 md:px-0">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
            Connexion
          </h1>
          <p className="text-smi text-dimgray">
            Accédez à votre compte AlumniApp
          </p>
        </div>

        {(formError || error) && (
          <div className="bg-red-100 bg-opacity-10 text-red-100 p-3 rounded-3xs mb-6 text-smi">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            id="email"
            label="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />

          <FormInput
            id="password"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-smi text-black cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-darkslategray-100 focus:ring-darkslategray-100 border-gainsboro-100 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Se souvenir de moi
            </label>
            <Link
              to="/register-step2"
              className="text-smi text-darkslategray-100 hover:text-steelblue underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>

          <div className="mt-6 text-center text-smi">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/register-step1"
              className="text-darkslategray-100 hover:text-steelblue font-medium"
            >
              S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;