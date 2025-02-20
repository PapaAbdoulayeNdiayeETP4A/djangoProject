# Gestion de Projets - ESMT

Ce projet facilite l'organisation et le suivi des projets à l'ESMT. Il permet de créer, modifier, supprimer des projets et de gérer les tâches associées.

## Prérequis

Assurez-vous d'avoir installé les éléments suivants :

*   Python 3.x
*   Django 5.x
*   Git

## Installation

Suivez ces étapes pour installer le projet :

1. **Cloner le dépôt :**
    ```bash
    git clone git@github.com:PapaAbdoulayeNdiayeETP4A/djangoProject.git
    ```

2. **Configuration du backend (Python/Django) :**
    *   Créer un environnement virtuel :
        ```bash
        python3 -m venv env
        source env/bin/activate  # Windows : env\Scripts\activate
        ```
    *   Installer les dépendances :
        ```bash
        pip install -r requirements.txt
        ```

3. **Migrations :**
    ```bash
    python manage.py migrate
    ```

4. **Lancer le serveur :**
    ```bash
    python manage.py runserver
    ```
    Le serveur sera accessible à l'adresse suivante : http://127.0.0.1:8000/

## Fonctionnalités

Ce projet offre les fonctionnalités suivantes :

*   **Gestion des projets :** Création, modification et suppression de projets.
*   **Gestion des tâches :** Création des tâches dans un projet.
*   **Attribution des tâches :** Attribution de tâches à des utilisateurs spécifiques.
*   **Suivi de statut :** Suivi du statut de chaque tâche et de chaque projet (en cours, terminé, en retard, etc.).

## Contribuer

Vous êtes les bienvenus pour contribuer à ce projet ! Voici les étapes à suivre :

1.  Forkez le dépôt.
2.  Créez une branche pour votre fonctionnalité :
    ```bash
    git checkout -b feature/nouvelle-fonction
    ```

3.  Effectuez vos modifications et validez-les :
    ```bash
    git commit -m 'Ajout d'une fonctionnalité'
    ```

4.  Poussez vos modifications :
    ```bash
    git push origin feature/nouvelle-fonction
    ```

5.  Soumettez une *pull request*.

## Licence

Ce projet est sous licence MIT.