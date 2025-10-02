# 🗄️ Configuration de la Base de Données phpMyAdmin

## 📋 Prérequis

- **XAMPP** ou **WAMP** installé
- **phpMyAdmin** accessible via `http://localhost/phpmyadmin`

---

## 🚀 Étapes d'Installation

### 1️⃣ Démarrer les services

1. Ouvrez **XAMPP Control Panel**
2. Démarrez **Apache** et **MySQL**
3. Vérifiez que les deux services sont en vert (Running)

### 2️⃣ Créer la base de données

1. Ouvrez votre navigateur
2. Allez sur `http://localhost/phpmyadmin`
3. Cliquez sur l'onglet **SQL** en haut
4. Copiez-collez le contenu du fichier `backend/database_schema.sql`
5. Cliquez sur **Exécuter**

✅ Votre base de données `archiva_db` est créée avec 3 tables :
- `users` (utilisateurs)
- `cers` (CERs avec 6 exemples)
- `favorites` (favoris)

### 3️⃣ Configurer la connexion PHP

Le fichier `backend/db_connect_new.php` contient la configuration :

```php
$host = 'localhost';
$dbname = 'archiva_db';
$username = 'root';      // Par défaut sur XAMPP/WAMP
$password = '';          // Vide par défaut
```

**Si vous avez un mot de passe MySQL**, modifiez la ligne `$password = '';`

### 4️⃣ Démarrer le serveur PHP

Ouvrez un terminal dans le dossier `backend` :

```bash
cd backend
php -S localhost:8000
```

✅ Le serveur PHP tourne sur `http://localhost:8000`

### 5️⃣ Démarrer l'application React

Ouvrez un autre terminal dans le dossier `frontend` :

```bash
cd frontend
npm run dev
```

✅ L'application React tourne sur `http://localhost:5173`

---

## 🔌 Tester la connexion

### Test 1 : Vérifier l'API

Ouvrez votre navigateur et allez sur :
```
http://localhost:8000/api/cers.php
```

Vous devriez voir :
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "title": "Prosit 3.2 Annuaire Active Directory",
      "author": "Sadjo Mamadou",
      ...
    }
  ]
}
```

### Test 2 : Depuis React

Modifiez votre page `Home.jsx` pour charger les CERs depuis la DB :

```javascript
import { useState, useEffect } from 'react';
import { cerService } from '../services/api';

export default function Home() {
  const [cers, setCers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCers() {
      try {
        const response = await cerService.getAll();
        if (response.ok) {
          setCers(response.data);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCers();
  }, []);

  if (loading) return <div>Chargement...</div>;

  // Reste du code...
}
```

---

## 🛠️ Résolution de problèmes

### ❌ Erreur : "Access denied for user 'root'@'localhost'"

**Solution** : Vérifiez votre mot de passe MySQL dans `db_connect_new.php`

### ❌ Erreur : "Unknown database 'archiva_db'"

**Solution** : Exécutez le fichier SQL dans phpMyAdmin (étape 2)

### ❌ Erreur CORS

**Solution** : Vérifiez que le serveur PHP tourne sur le port 8000 et que les headers CORS sont configurés dans `cers.php`

### ❌ Les images ne s'affichent pas

**Solution** : Placez vos images dans `frontend/public/` et utilisez les chemins `/MS.jpg`, `/UML.png`, etc.

---

## 📁 Structure des fichiers

```
workshop/
├── backend/
│   ├── db_connect_new.php      ← Configuration DB
│   ├── database_schema.sql     ← Script SQL
│   └── api/
│       └── cers.php            ← API REST
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js          ← Service API
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Cer.jsx
│   │       └── ...
│   └── public/
│       ├── MS.jpg
│       ├── UML.png
│       └── ...
└── vite.config.js              ← Config proxy
```

---

## ✅ Checklist finale

- [ ] XAMPP/WAMP démarré (Apache + MySQL)
- [ ] Base de données `archiva_db` créée
- [ ] Tables créées avec données de test
- [ ] Serveur PHP lancé (`php -S localhost:8000`)
- [ ] Application React lancée (`npm run dev`)
- [ ] Test API réussi (`http://localhost:8000/api/cers.php`)
- [ ] Images placées dans `frontend/public/`

---

## 🎉 Félicitations !

Votre application est maintenant connectée à phpMyAdmin ! 🚀

Il faut aller dans le dossier backend de workshop et executer la commande
 C:\xampp\php\php.exe -S localhost:8000 pour activer le serveur