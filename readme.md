# Nazbot 🤖

**Nazbot** est un bot Discord conçu pour afficher le statut de toute l'infrastructure Nazel, permettant ainsi aux utilisateurs de rester informés de l'état des serveurs et des services liés au Nazel Launcher.

## Fonctionnalités du bot 🔧

- **Affichage du statut** : Nazbot vous informe en temps réel sur l'état des serveurs et services de l'infrastructure Nazel.
- **Mises à jour automatiques** : Recevez des notifications lorsque l'état des services change.

## Technologies utilisées 🛠️

Nazbot est développé en **Node.js** avec l'utilisation de la bibliothèque **discord.js** pour l'interaction avec l'API Discord.

## Installation locale 🚀

Vous pouvez cloner et exécuter Nazbot localement pour y apporter des modifications ou le tester dans un environnement de développement.

### Prérequis 📋

- Node.js et npm doivent être installés sur votre machine.
- Un serveur Discord sur lequel vous avez des permissions pour ajouter un bot.
- Un token Discord Bot que vous pouvez obtenir en créant une application sur le [Portail des développeurs Discord](https://discord.com/developers/applications).

### Étapes d'installation 🔧

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/Nazel-fondation/nazbot.git
    cd nazbot
    ```

2. Installez les dépendances nécessaires :

    ```bash
    npm install
    ```

3. Configurez le bot :

    - Renommez le fichier `.env.example` en `.env`.
    - Ajoutez votre token Discord Bot dans le fichier `.env` comme suit :

    ```
    DISCORD_TOKEN=your_token_here
    ```

4. Démarrez le bot :

    ```bash
    npm start
    ```

Nazbot sera alors en ligne et prêt à afficher le statut de l'infrastructure Nazel sur votre serveur Discord.

## Contribution 🤝

Les contributions sont les bienvenues ! Voici les étapes de base pour contribuer :

1. Forkez le projet. 🍴
2. Créez une branche pour votre fonctionnalité ou correction (`git checkout -b feature/ma-fonctionnalite`). 🌿
3. Commitez vos modifications (`git commit -m 'Ajout de ma fonctionnalité'`). 💬
4. Poussez votre branche (`git push origin feature/ma-fonctionnalite`). 📤
5. Ouvrez une Pull Request. 🔄

Merci de respecter les bonnes pratiques de code lors de vos contributions.

## Licence 📄

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## Contact 📬

Pour toute question ou support, vous pouvez me contacter via :

- Email : thibaultfalezan@gmail.com
- Discord : Vupilex