#!/bin/bash

# Script d'installation et de lancement de l'application Alumni

echo "=== Installation de l'application Alumni ==="
echo "Ce script va installer les dépendances nécessaires et démarrer l'application."

# Vérifier si Node.js est installé
if ! [ -x "$(command -v node)" ]; then
  echo "Erreur: Node.js n'est pas installé." >&2
  echo "Veuillez installer Node.js avant de continuer: https://nodejs.org/"
  exit 1
fi

# Vérifier si npm est installé
if ! [ -x "$(command -v npm)" ]; then
  echo "Erreur: npm n'est pas installé." >&2
  echo "npm devrait être installé avec Node.js."
  exit 1
fi

# Installer les dépendances
echo "Installation des dépendances..."
npm install

# Vérifier si l'installation s'est bien déroulée
if [ $? -ne 0 ]; then
  echo "Erreur: L'installation des dépendances a échoué." >&2
  exit 1
fi

echo "Dépendances installées avec succès!"

# Demander à l'utilisateur ce qu'il veut faire
echo ""
echo "Que souhaitez-vous faire ?"
echo "1. Démarrer le serveur de développement"
echo "2. Construire l'application pour la production"
echo "3. Quitter"
read -p "Votre choix (1/2/3): " choice

case $choice in
  1)
    echo "Démarrage du serveur de développement..."
    npm start
    ;;
  2)
    echo "Construction de l'application pour la production..."
    npm run build
    echo "Construction terminée avec succès!"
    echo "Les fichiers de production se trouvent dans le dossier 'public/'."
    ;;
  3)
    echo "Au revoir!"
    exit 0
    ;;
  *)
    echo "Choix non valide."
    exit 1
    ;;
esac