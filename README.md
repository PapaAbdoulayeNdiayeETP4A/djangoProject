# 🚀 Gestion des tâches - Application Fullstack Django/Angular

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)

Une application web moderne pour la gestion des tâches

## 🛠️ Technologies utilisées

### Backend
- **Django** - Framework Python pour le développement web
- **Django REST Framework** - Pour créer l'API RESTful
- **MySQL** - Système de gestion de base de données relationnelle

### Frontend
- **Angular** - Framework TypeScript pour développer des applications web
- **SCSS** - Préprocesseur CSS pour des styles avancés
- **Angular Forms** - Pour la gestion des formulaires et la validation

### Outils
- **XAMPP** - Pour héberger la base de données MySQL localement
- **phpMyAdmin** - Interface d'administration pour MySQL
- **Git/GitHub** - Pour le versionnage et l'hébergement du code

## 📋 Prérequis

- Python 3.8+
- Node.js 14+
- npm 6+
- Angular CLI 15+
- XAMPP (avec MySQL et phpMyAdmin)
- Git

## ⚙️ Installation et configuration

### Étape 1: Cloner le dépôt

```bash
git clone git@github.com:PapaAbdoulayeNdiayeETP4A/djangoProject.git
cd djangoProject
```

### Étape 2: Configurer l'environnement Python

```bash
# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
# Sur Windows
venv\Scripts\activate
# Sur macOS/Linux
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

### Étape 3: Configurer la base de données

1. Démarrer XAMPP et activer les services Apache et MySQL
2. Ouvrir phpMyAdmin à l'adresse `http://localhost/phpmyadmin`
3. Créer une nouvelle base de données nommée `nom_de_votre_base`
4. Configurer les informations de connexion à la base de données dans le fichier `settings.py` de Django:

```python
DATABASES = {'default': dj_database_url.parse('mysql://votre_utilisateur@localhost/nom_de_votre_base')}
```

### Étape 4: Migrer la base de données

```bash
python manage.py makemigrations
python manage.py migrate
```

### Étape 5: Installer les dépendances Angular

```bash
cd angularFront
npm install
cd ..
```

### Étape 6: Lancer l'application

```bash
# Démarrer le serveur Django
python manage.py runserver

# Dans un autre terminal, démarrer l'application Angular
cd angularFront
ng serve
```

L'application sera accessible à l'adresse `http://localhost:4200`.

## 🔧 Commandes utiles

### Django

```bash
# Créer un superutilisateur
python manage.py createsuperuser

# Collecter les fichiers statiques
python manage.py collectstatic

# Lancer les tests
python manage.py test
```

### Angular

```bash
# Générer un nouveau composant
ng generate component nom-du-composant

# Générer un nouveau service
ng generate service nom-du-service