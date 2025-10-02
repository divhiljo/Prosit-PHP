# Migration HTML/CSS vers React - Archiva

## ✅ Migration Complétée

Toutes tes pages HTML/CSS ont été migrées vers React avec succès !

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Header avec navigation
│   │   ├── Footer.jsx       # Footer avec infos contact
│   │   └── Layout.jsx       # Layout principal (Header + Outlet + Footer)
│   ├── pages/
│   │   ├── Home.jsx         # Page d'accueil (index.html)
│   │   ├── Login.jsx        # Page de connexion
│   │   ├── Signup.jsx       # Page d'inscription
│   │   ├── Cer.jsx          # Page CERs
│   │   ├── Favoris.jsx      # Page Favoris
│   │   └── AllCer.jsx       # Page Gestion CER
│   ├── styles/
│   │   ├── header.css       # Styles du header
│   │   ├── footer.css       # Styles du footer
│   │   ├── home.css         # Styles de la page d'accueil
│   │   └── login.css        # Styles login/signup
│   ├── App.jsx              # Configuration des routes
│   ├── index.css            # Styles globaux
│   └── main.jsx
└── package.json
```

## 🚀 Pour Démarrer

### 1. Installer les dépendances

Ouvre PowerShell **en tant qu'administrateur** et exécute :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Puis dans le dossier frontend :

```powershell
cd frontend
npm install
```

### 2. Lancer le serveur de développement

```powershell
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔗 Routes Disponibles

- `/` - Page d'accueil
- `/login` - Connexion
- `/signup` - Inscription
- `/cer` - CERs
- `/favoris` - Mes CER Favoris
- `/all-cer` - Gestion de CER

## 📝 Prochaines Étapes

### 1. Copier les assets

Copie le dossier `assets/` dans `frontend/public/` :

```powershell
Copy-Item -Path ..\assets -Destination .\public\ -Recurse
```

### 2. Connecter au Backend PHP

Pour connecter le frontend React au backend PHP, configure le proxy dans `vite.config.js` :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

Puis lance ton serveur PHP :

```powershell
cd ..\backend
php -S localhost:8000
```

### 3. Créer les endpoints API

Exemple d'endpoint dans `backend/api/cers.php` :

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
require_once __DIR__ . '/../db_connect.php';

try {
  $stmt = $pdo->query('SELECT * FROM cers ORDER BY created_at DESC');
  $cers = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(['ok' => true, 'data' => $cers]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
```

### 4. Appeler l'API depuis React

Dans `Home.jsx`, remplace les données statiques :

```jsx
import { useEffect, useState } from 'react';

export default function Home() {
  const [cers, setCers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cers.php')
      .then(r => r.json())
      .then(data => {
        if (data.ok) setCers(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  
  // ... reste du code
}
```

## 🎨 Personnalisation

- **Couleurs** : Modifie les couleurs dans les fichiers CSS
- **Fonts** : Les fonts Google sont déjà importées dans `index.css`
- **Composants** : Tous les composants sont dans `src/components/`
- **Pages** : Toutes les pages sont dans `src/pages/`

## 🐛 Dépannage

### Erreur PowerShell "scripts is disabled"

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port 5173 déjà utilisé

Change le port dans `vite.config.js` :

```js
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Assets non trouvés

Assure-toi que le dossier `assets/` est dans `frontend/public/`

## 📦 Build pour Production

```powershell
npm run build
```

Les fichiers seront générés dans `frontend/dist/`

---

**Bon développement ! 🚀**
