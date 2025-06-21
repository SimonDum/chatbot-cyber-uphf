# CyberBot UPHF

Ce projet est un assistant conversationnel développé dans le cadre du projet ICY 4A de l’Université Polytechnique des Hauts-de-France (UPHF).  
L’objectif est de fournir un chatbot pédagogique local, permettant de sensibiliser les utilisateurs aux bonnes pratiques de cybersécurité, avec un respect total de la confidentialité des données.

## Équipe projet

- Bastian Corlay
- Tristan Ducraux
- Simon Dumoulin

## Fonctionnalités principales

- Réponses conversationnelles basées sur un modèle LLM local.
- Intégration dynamique des connaissances internes de l'UPHF via un système RAG.
- Mémoire conversationnelle multi-tour.
- Interface web responsive (PC et mobile).
- Authentification sécurisée via JWT.
- Aucune dépendance cloud : tout est exécuté localement.

## Architecture technique

- **Backend** : FastAPI (Python 3.11)
- **Logique conversationnelle** : LangChain
- **Modèles IA** : Ollama (LLama3 et nomic-embed-text)
- **Base de données** : PostgreSQL avec extension `pgvector`
- **Frontend** : React + Tailwind CSS

## Installation

### Prérequis

- Python 3.11
- Docker (pour la base PostgreSQL via `docker-compose` fourni)
- Ollama installé localement (https://ollama.com/)
- Node.js (pour le frontend React)

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/SimonDum/chatbot-cyber-uphf.git
cd chatbot-cyber-uphf
```

### 2️⃣ Préparer les modèles Ollama

Assurez-vous qu’Ollama est bien installé et démarré localement, puis téléchargez les modèles nécessaires :

```bash
ollama pull llama3
ollama pull nomic-embed-text
```

### 3️⃣ Lancer la base de données PostgreSQL avec Docker

Depuis la racine du projet, exécuter :

```bash
docker-compose up -d
```

Cela démarre le conteneur PostgreSQL prêt à l’emploi avec `pgvector` préinstallé.

### 4️⃣ Installer le backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # (Linux/macOS)
venv\Scripts\activate  # (Windows)

pip install -r requirements.txt
```

Configurer les variables d’environnement dans un fichier `.env` (Optionnel) :

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/chatbot_db
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

Lancer le serveur FastAPI :

```bash
uvicorn app.main:app --reload
```

### 5️⃣ Installer le frontend

```bash
cd frontend
npm install
npm run dev
```

L'application web sera disponible sur `http://localhost:5173`.

## Licence

Projet académique non destiné à la production commerciale.
