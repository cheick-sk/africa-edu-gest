# Plateforme SaaS de Gestion Universitaire Multi-Tenant

Bienvenue sur la plateforme SaaS de gestion universitaire ! Ce projet vise à fournir une solution moderne, scalable et réutilisable pour plusieurs universités, inspirée du projet "africa-edu-hub-online-main".

## 1. Objectif Général

Fournir une plateforme SaaS multi-tenante où chaque université dispose de son propre espace, utilisateurs, branding (limité pour le starter), et modules/services. Le système inclut une gestion dynamique des abonnements avec facturation basée sur le nombre d’étudiants et les modules activés.

## 2. Stack Technique (Starter)

*   **Backend :** Node.js avec NestJS (TypeScript)
*   **Frontend :** React.js avec Next.js (TypeScript) et TailwindCSS
*   **Base de données relationnelle :** PostgreSQL (pour utilisateurs, tenants, abonnements, logs structurés, etc.)
*   **Base de données NoSQL :** MongoDB (pour documents pédagogiques, fichiers, historiques IA/chat, etc.)
*   **Authentification :** JWT (OAuth2 peut être une évolution)
*   **Containerisation :** Docker et Docker Compose
*   **Documentation API :** Swagger (OpenAPI)

## 3. Prérequis

*   [Docker](https://www.docker.com/get-started) (Docker Engine et Docker Compose)
*   Node.js (v18+) et npm (pour comprendre les projets `backend` et `frontend`, optionnel si vous utilisez uniquement Docker pour lancer)
*   Un éditeur de code (ex: VS Code)
*   Git

## 4. Installation et Lancement (avec Docker)

1.  **Cloner le dépôt (si ce n'est pas déjà fait) :**
    ```bash
    # git clone <url_du_depot>
    # cd <nom_du_dossier_racine>
    ```

2.  **Configuration de l'environnement :**
    Le fichier `docker-compose.yml` utilise un fichier `.env` à la racine du projet pour la configuration. Un fichier `.env.example` ou un fichier `.env` de base est fourni. Copiez-le ou assurez-vous qu'il existe :
    ```bash
    # cp .env.example .env # Si .env.example est fourni
    # Ou vérifiez/modifiez le fichier .env existant.
    ```
    Assurez-vous que les variables d'environnement dans `.env` (ports, identifiants de base de données, secret JWT) sont correctement configurées selon vos besoins. Les valeurs par défaut sont fournies.

3.  **Construire et démarrer les conteneurs Docker :**
    Depuis le répertoire racine du projet (où se trouve `docker-compose.yml`), exécutez :
    ```bash
    docker-compose up --build -d
    ```
    Le `--build` force la reconstruction des images si les Dockerfiles ont changé. Le `-d` lance les conteneurs en mode détaché (en arrière-plan).

4.  **Accéder aux services :**
    Une fois les conteneurs démarrés :
    *   **Frontend :** [http://localhost:3000](http://localhost:3000) (configurable via `FRONTEND_PORT` dans `.env`)
    *   **Backend API :** [http://localhost:3001](http://localhost:3001) (configurable via `BACKEND_PORT` dans `.env`)
    *   **Documentation API (Swagger) :** [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
    *   **PostgreSQL :** Accessible sur le port `5432` (configurable via `POSTGRES_PORT`) par d'autres outils si nécessaire (ex: pgAdmin, DBeaver).
    *   **MongoDB :** Accessible sur le port `27017` (configurable via `MONGO_PORT`) par d'autres outils si nécessaire (ex: MongoDB Compass).

5.  **Arrêter les services :**
    Pour arrêter les conteneurs :
    ```bash
    docker-compose down
    ```
    Pour arrêter et supprimer les volumes (attention, supprime les données des bases de données !) :
    ```bash
    docker-compose down -v
    ```

## 5. Structure du Projet

```
.
├── backend/        # Code source du backend NestJS
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── frontend/       # Code source du frontend Next.js
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml # Orchestration des services Docker
├── .env               # Variables d'environnement (doit être créé à partir de .env.example ou fourni)
└── README.md          # Ce fichier
```

## 6. Guide API (Starter)

La documentation détaillée de l'API est générée automatiquement par Swagger (OpenAPI) et est accessible lorsque le service backend est en cours d'exécution.

*   **URL de la documentation Swagger UI :** [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

### Endpoints Principaux (Starter) :

*   **`POST /api/v1/tenants/onboarding`**:
    *   Description : Permet d'enregistrer une nouvelle université (tenant) et de créer son utilisateur administrateur principal.
    *   Payload : Voir `CreateTenantDto` dans le code (`backend/src/modules/tenants/dto/create-tenant.dto.ts`).
    *   Réponse : Détails de l'université créée.

*   **`POST /api/v1/auth/login`** (À implémenter/finaliser dans le backend) :
    *   Description : Connecte un utilisateur et retourne un jeton JWT.
    *   Payload : `email`, `password` (et potentiellement un identifiant de tenant si la connexion est spécifique au tenant).
    *   Réponse : `{ access_token: "string" }`.

*   **`GET /api/v1/users/me`** (Protégé) :
    *   Description : Récupère les informations de l'utilisateur actuellement authentifié (via JWT).
    *   Réponse : Détails de l'utilisateur.

Consultez la documentation Swagger pour la liste complète des endpoints, les détails des requêtes/réponses et pour tester les API.

## 7. Roadmap

### MVP (Minimum Viable Product) - Version de Base

L'objectif du starter code actuel est de jeter les bases. Un MVP fonctionnel inclurait :

1.  **Onboarding Université Complet :**
    *   Création de l'espace université (tenant).
    *   Création de l'utilisateur admin initial.
    *   Sélection basique d'un plan d'abonnement (simulation ou un seul plan fixe).
    *   Choix d'un mode de paiement principal (intégration d'UN SEUL fournisseur de paiement, ex: Stripe pour CB ou un mock pour Mobile Money).
2.  **Authentification Utilisateur :**
    *   Connexion des utilisateurs (admin, et plus tard staff, prof, étudiant) au sein de leur université.
    *   Gestion des jetons JWT.
3.  **Gestion Basique des Utilisateurs (par Admin Université) :**
    *   Inviter/créer des utilisateurs (staff, enseignants, étudiants) au sein de son université.
    *   Assigner des rôles prédéfinis.
4.  **Module "Cours" (Exemple) :**
    *   CRUD simple pour les cours par les enseignants/staff.
    *   Inscription des étudiants aux cours.
5.  **Dashboard Admin Université :**
    *   Vue d'ensemble simple (nombre d'étudiants, de cours).
    *   Gestion de l'abonnement (voir son statut, prochaine facture - simulation).
    *   Branding très basique (ex: nom de l'université affiché).
6.  **Isolation des Données :**
    *   Assurer que chaque université ne voit que ses propres données.
7.  **Déploiement :**
    *   Scripts et documentation pour un déploiement simple sur un service cloud (ex: Docker sur une VM).

### Évolutions Futures (Post-MVP)

*   **Paiements & Abonnements Avancés :**
    *   Intégration de multiples fournisseurs de paiement (Orange Money, MTN Mobile Money, Wave, PayPal, Stripe).
    *   Gestion des devises multiples (CFA, GNF, XOF, USD, EUR).
    *   Facturation automatisée détaillée (par étudiant actif, par module consommé).
    *   Gestion des essais gratuits configurables, relances automatiques.
    *   Portail de facturation pour les universités.
*   **Marketplace de Modules :**
    *   Permettre aux universités d'activer/désactiver des modules à la demande (E-learning avancé, gestion d'examens, bibliothèque numérique, etc.).
    *   Facturation modulaire.
*   **Fonctionnalités Utilisateurs Étendus :**
    *   Espace étudiant complet (voir cours, notes, soumettre travaux).
    *   Espace enseignant (gérer cours, noter, communiquer).
*   **Assistant IA Étudiant :**
    *   Chatbot d'aide basé sur les documents pédagogiques et informations de l'université.
*   **Notifications :**
    *   Email et SMS pour les événements importants (rappels, nouvelles notes, annonces).
*   **Support Multilingue :**
    *   Interface traduisible en plusieurs langues (FR, EN minimum).
*   **Analytics & Rapports :**
    *   Tableaux de bord avancés pour les admins d'université et pour le super-admin de la plateforme.
*   **Branding Personnalisé Avancé :**
    *   Plus d'options de personnalisation pour chaque université (domaines personnalisés, thèmes graphiques).
*   **Sécurité & Scalabilité :**
    *   Audits de sécurité réguliers.
    *   Optimisations pour la haute disponibilité et la scalabilité horizontale.
    *   Mise en place de RLS (Row Level Security) dans PostgreSQL si nécessaire.
*   **Super Admin Dashboard :**
    *   Interface pour l'équipe de la plateforme pour gérer les universités, les abonnements globaux, les modules, etc.

## 8. Contribuer

(À définir si le projet devient open source ou collaboratif)

---

Ce README fournit une base. Il devra être mis à jour au fur et à mesure de l'évolution du projet.
