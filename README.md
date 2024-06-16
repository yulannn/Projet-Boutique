# Projet de Boutique en Ligne de Maillots Esport

Ce projet fait partie d'une initiative académique visant à développer une boutique en ligne spécialisée dans la vente de maillots esport. Le site permet aux utilisateurs de parcourir et d'acheter des maillots des équipes esport populaires.

## Installation

Pour installer et exécuter ce projet sur votre machine locale, suivez les étapes ci-dessous :

### Prérequis

- Node.js
- MySQL

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/yulannn/Projet-Boutique
   cd Projet-Boutique
    ```

2. **Configurer la base de données**
    - Créez une base de données MySQL vide
    - Importez le fichier `install/database.sql` dans votre base de données


3. **Configurer le fichier config.js**
    - Ouvrez le fichier `./backv2/src/utility/config.js`
    - Modifiez les informations de connexion à la base de données selon votre configuration
   
4. **Démarrer le serveur**
    ```bash
    cd backv2
    npm install
    npm start
    ```

5. **Démarrer le client**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

6. **Accéder au site**
    - Ouvrez votre navigateur et accédez à `http://localhost:3000`
   
## Fonctionnalités

- Parcourir les maillots par équipe
- Ajouter des maillots au panier
- Passer une commande
- Consulter l'historique des commandes
- Consulter les détails d'une commande
- Consulter les détails d'un maillot
- Consulter les détails d'une équipe

## Auteurs

- [yulannn]("https://github.com/yulannn/")
- [romaindr]("https://github.com/romaingdr")