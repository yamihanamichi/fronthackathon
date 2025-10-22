# 🩺 VaccinData

Une application web moderne pour la planification et l'analyse de campagnes vaccinales, développée dans le cadre d'un hackathon EPITECH.

## 🚀 Fonctionnalités

- **Interface intuitive** : Formulaire simple pour saisir les paramètres de campagne
- **Mode sombre/clair** : Basculement facile entre les thèmes
- **Visualisations interactives** : Graphiques intégrés via Metabase
- **API intégrée** : Connexion directe avec l'API de prédiction de campagnes
- **Design responsive** : Optimisé pour tous les écrans

## 🛠️ Technologies utilisées

- **Frontend** : React 19, Vite
- **Styling** : Tailwind CSS, shadcn/ui
- **Build** : Vite
- **Déploiement** : Docker + Nginx

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Docker (optionnel)

## 🚀 Installation et démarrage

### Développement local

```bash
# Cloner le repository
git clone <url-du-repo>
cd fronthackathon

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Avec Docker

```bash
# Construire l'image
docker build -t vaccindata .

# Lancer le conteneur
docker run -p 3000:80 vaccindata
```

L'application sera accessible sur `http://localhost:3000`

## 📖 Utilisation

1. **Saisir les paramètres** :

   - Date de début de campagne
   - Date de fin de campagne
   - Budget disponible (en euros)

2. **Lancer l'analyse** :

   - Cliquer sur "Charger les données"
   - Attendre le traitement par l'API

3. **Consulter les résultats** :
   - Graphique épidémiologique
   - Graphique des coûts

## 🔧 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Vérification du code
```

## 🌐 API

L'application communique avec l'API :

```
POST https://api-vaccin-campagne.ratioaws.org/predict/campaign
```

**Payload** :

```json
{
  "campaign_start_date": "2024-01-01",
  "campaign_end_date": "2024-12-31",
  "campaign_cost": 50000
}
```

## 📁 Structure du projet

```
src/
├── components/ui/     # Composants UI réutilisables
├── App.jsx           # Composant principal
├── main.jsx          # Point d'entrée
└── index.css         # Styles globaux
```

## 🎨 Personnalisation

- **Thème** : Modifier les couleurs dans `tailwind.config.cjs`
- **Composants** : Ajouter de nouveaux composants dans `src/components/`
- **API** : Changer l'URL dans `App.jsx` ligne 28

## 🐛 Dépannage

**Erreur API** : Vérifier la connectivité réseau et l'URL de l'API
**Build échoue** : S'assurer que toutes les dépendances sont installées
**Mode sombre ne fonctionne pas** : Vérifier la configuration Tailwind

## 📝 Licence

Projet développé dans le cadre d'un hackathon EPITECH.

## 👥 Équipe

- Développement frontend : [Votre nom]
- Hackathon EPITECH 2024

---

_Fait avec ❤️ pour améliorer la planification des campagnes vaccinales_
