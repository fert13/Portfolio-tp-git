# Présentation
Bienvenue dans mon portfolio personnel ! 
Ce projet a été réalisé dans le cadre de mon apprentissage en développement web. Il met en avant mes compétences en HTML et CSS tout en reflétant ma créativité et mon approche dans la conception de sites web.

# Aperçu
Ce portfolio est une vitrine qui présente :

- Mon parcours et mes compétences.
- Les projets sur lesquels j'ai travaillé.
- Une section pour me contacter facilement.

https://fert13.github.io/Portfolio-tp-git/

# Fonctionnalités
- Design responsive : Adapté à toutes les tailles d’écran (mobile, tablette, desktop).
- Interface utilisateur élégante : Mise en page structurée et agréable à explorer.
- Navigation intuitive : Accès rapide aux sections importantes.
Technologies utilisées
- HTML5 : Structure et contenu des pages.
- CSS3 : Mise en forme et styles visuels (animations, transitions, flexbox, etc.).
- Comment utiliser ce projet ?

# Objectifs du projet

- Approfondir mes connaissances en HTML et CSS.
- Créer un portfolio professionnel pour présenter mes compétences et mes projets.
- Explorer les bases du design web responsive.


# Installation
git clone https://github.com/token@username/Recette_cosmopolitain.git

git config --global user.name "username"

git config --global user.email "email"

# Création de branche et envoie en ligne
git branch nom_branche

git push

git checkout branch

# Envoie des modifications
git add . || git add fichier_modifié

git commit -m "Commentaire"

git push origin main (si sur une autre branche) ou git push (si sur la branche main)


# Recupération des modification
git pull (si sur main ) ou git pull origin nom_branche_cible (si sur une autre branch)

# Création de token 

1.	Connectez-vous à votre compte GitHub.
2.	Accédez à Settings > Developer settings > Personal access tokens > Tokens (classic).
3.	Cliquez sur Generate new token.
4.	Donnez un nom à votre token et sélectionnez les permissions appropriées. Par exemple, pour cloner, lire ou écrire sur des dépôts, cochez l’option repo.
5.	Une fois configuré, cliquez sur Generate token en bas de la page.
6.	Copiez le token généré immédiatement. GitHub ne vous le montrera plus par la suite.
7. Taper ceci : git config --global credential.helper cache ( enregistrer le token une fois pour de bon )
