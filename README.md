# Pokedex

## Pipeline CI

Fichier : .github/workflows/github-actions-demo.yml

Cette pipeline garantit la qualité et la validité du code source. Elle contient les étapes suivantes :

- Le code source est extrait du dépôt pour être utilisé par le runner GitHub.
- Installe la version 20 de Node.js pour exécuter les outils de build et de test.
- Installe toutes les dépendances nécessaires avec npm ci.
- Utilise Prettier pour vérifier si le code est bien formaté.
- Vérifie les règles de style et les erreurs avec ESLint.
- Utilise TypeScript pour s'assurer que tous les types sont correctement définis.
- Compile le projet et génère les fichiers de production dans le dossier dist/
