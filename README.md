# ConcertApp — Frontend Angular

Application web de billetterie en ligne pour la gestion et la réservation de concerts.

---

## Prérequis

Avant de lancer le projet, assure-toi d'avoir installé :

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [npm](https://www.npmjs.com/) v9 ou supérieur
- [Angular CLI](https://angular.io/cli) v17 ou supérieur

```bash
npm install -g @angular/cli
```

- Le **backend JAX-RS** doit tourner sur `http://localhost:8080`

---

## Installation et lancement

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd concert_front
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
ng serve
```

L'application sera accessible sur **http://localhost:4200**

---

##  Configuration

L'URL du backend est configurée dans chaque service Angular (`src/app/services/`) :

```typescript
private apiUrl = 'http://localhost:8080';
```

Si ton backend tourne sur un port différent, modifie cette valeur dans :
- `src/app/services/auth.ts`
- `src/app/services/event.service.ts`
- `src/app/services/ticket.service.ts`

---

## Fonctionnalités

###  Page publique (sans connexion)
- Consulter la liste des concerts disponibles
- Voir les détails de chaque concert (artiste, lieu, date, prix, places)
- Accéder au formulaire d'inscription / connexion

### Espace Client
- Créer un compte client
- Se connecter / se déconnecter
- Parcourir et réserver des billets pour des concerts
- Consulter ses billets achetés

###  Espace Manager
- Se connecter avec un compte manager (créé par un admin)
- Créer des événements (concerts)
- Consulter la liste de ses événements avec leur statut
- Supprimer un événement (si non validé)

### Espace Admin
- Connexion avec le compte admin par défaut (`admin@concert.com` / `admin123`)
- Créer des comptes managers
- Consulter tous les événements
- Valider ou refuser les événements soumis par les managers

---

## Structure du projet

```
src/app/
├── components/
│   ├── public/          → Pages publiques (accueil, concerts)
│   ├── auth/            → Connexion, inscription
│   ├── client/          → Dashboard client, tickets
│   ├── manager/         → Dashboard manager, événements
│   └── admin/           → Dashboard admin, gestion managers/événements
├── services/
│   ├── auth.ts          → Authentification, gestion session
│   ├── event.service.ts → Gestion des événements
│   └── ticket.service.ts→ Gestion des billets
└── guards/
    ├── auth.guard.ts    → Protection des routes (connexion requise)
    └── role.guard.ts    → Protection par rôle (CLIENT, MANAGER, ADMIN)
```

---

##  Rôles utilisateurs

| Rôle | Accès | Création du compte |
|---|---|---|
| **CLIENT** | Réservation de billets | Inscription publique |
| **MANAGER** | Gestion des événements | Créé par un Admin |
| **ADMIN** | Gestion globale | Initialisé au démarrage du backend |

---

##  Technologies utilisées

- **Angular 17+** — Framework frontend
- **TypeScript** — Langage principal
- **Angular Router** — Navigation et guards
- **HttpClient** — Communication avec l'API REST
- **Reactive Forms** — Gestion des formulaires
