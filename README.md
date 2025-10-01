# Simulateur de salaire dirigeant

Projet réalisé en vibe coding (itération rapide + code guidé par l’interface).Inspiré par [hlassiege/inmypocket](https://github.com/hlassiege/inmypocket), avec l’objectif d’être plus précis grâce aux calculateurs URSSAF (moteur publicodes + modele-social).

## 🎯 Objet

Application web (Vue 3 + Vite + TypeScript) pour estimer :

- le net annuel du dirigeant (via URSSAF / modele-social),
- l’IS (impôt sur les sociétés) sur la base d’un barème éditable,
- l’IR (impôt sur le revenu) selon un barème éditable.

Deux vues :

- Saisie : CA annuel, salaire brut annuel, frais récupérables/déductibles, statut du dirigeant.
- Paramètres : édition des barèmes IR/IS (seuils & taux), persistés en localStorage (+ import/export).

Déploiement automatique sur GitHub Pages.

## 🧱 Stack

- Vue 3, Vite, TypeScript

- Vue Router, Pinia

- publicodes + modele-social (URSSAF) pour les calculs sociaux

- CSS minimal maison (variables, .container, .card, etc.)

## 🚀 Démarrage
```bash
# Cloner
git clone https://github.com/quentinbdno/sim-salaire-dirigeant.git
cd sim-salaire-dirigeant

# Installer
npm install

# Dev
npm run dev

# Build
npm run build

# Prévisualisation du build
npm run preview
```

Prérequis : Node 18+ (recommandé : Node 20).

## 🧮 Calculs

- Net annuel : via publicodes + modele-social (URSSAF).

- IS / IR : calcul progressif sur la base de barèmes éditables dans la vue Paramètres.

Les barèmes par défaut sont fournis à titre indicatif ; vous pouvez les adapter (seuils/taux) et les sauvegarder côté navigateur.

ℹ️ Les formules IR/IS sont volontairement simplifiées au départ (pas de quotient familial, d’abattements spécifiques, etc.). La logique est conçue pour être affinée par étapes.

## ⚙️ Paramétrage & persistance

- Les barèmes par défaut vivent dans src/config/taxes.config.ts.

- Les modifications utilisateur sont stockées en localStorage (via Pinia).

- Importer/Exporter un preset JSON depuis la vue Paramètres.

- Bouton “Restaurer valeurs d’usine” pour revenir aux defaults.

## 🛣️ Roadmap (idées)

Coût employeur détaillé (cotisations patronales) depuis publicodes.

IR plus réaliste (revenus autres, quotient familial, abattements).

Périodicité (mensuel/annuel) et ventilation par mois.

Partage des presets de barèmes par URL.

Tests unitaires (utils + composables).

## ✅ Crédit & inspirations

- Projet initial : hlassiege/inmypocket

- Moteur de règles : publicodes

- Modèle URSSAF : modele-social (URSSAF / betagouv)

- Outils : Vue 3, Vite, Pinia, Vue Router

## ⚠️ Avertissement

Ce simulateur est fourni à titre informatif. Il ne constitue pas un conseil juridique, fiscal ou social.
Vérifiez toujours vos paramètres et résultats avec une source officielle ou un professionnel.

## 📄 Licence

DPL 3.0

## 🤝 Contribuer

Issues/PRs bienvenus.
Style : simple, typé (TS), fonctions pures en utils/, logique réactive en composables/, et UI propre en views//components/.