import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";

const LoggedOut = () => {
  return (
    <Layout hideFooter>
      <div className="flex flex-col md:flex-row items-center min-h-[calc(100vh-4rem)] py-8 md:py-16">
        {/* Côté gauche (texte) */}
        <div className="w-full md:w-1/2 px-4 md:px-6 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-comfortaa font-bold mb-4 text-darkslategray-100">
            Bienvenue sur AlumniApp
          </h1>
          <p className="text-lg md:text-xl text-darkslategray-200 mb-6 md:mb-8 max-w-xl">
            Restez connectés avec vos anciens camarades, développez votre réseau professionnel et partagez vos expériences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to="/login">
              <Button variant="primary" size="large">
                Se connecter
              </Button>
            </Link>
            <Link to="/register-step1">
              <Button variant="outline" size="large">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>

        {/* Côté droit (image) */}
        <div className="w-full md:w-1/2 px-4 md:px-10 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(89,_42,_96,_0.03)] via-[rgba(216,_62,_239,_0.03)] to-[rgba(223,_203,_205,_0)] rounded-167xl"></div>
          <img
            className="relative z-10 w-full h-auto rounded-167xl object-cover shadow-lg max-w-md mx-auto"
            alt="Réseau Alumni"
            src="/image-2@2x.png"
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoggedOut;