// Service API pour communiquer avec le backend PHP
const API_BASE = 'http://localhost:8000/api';

export const cerService = {
  // Récupérer tous les CERs
  async getAll() {
    const response = await fetch(`${API_BASE}/cers.php`);
    return response.json();
  },

  // Créer un nouveau CER
  async create(cerData) {
    const response = await fetch(`${API_BASE}/cers.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cerData)
    });
    return response.json();
  }
};

export const authService = {
  // Inscription
  async signup(userData) {
    const response = await fetch(`${API_BASE}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',
        ...userData
      })
    });
    return response.json();
  },

  // Connexion
  async login(email, password) {
    const response = await fetch(`${API_BASE}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        email,
        password
      })
    });
    return response.json();
  },

  // Sauvegarder l'utilisateur dans le localStorage
  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Récupérer l'utilisateur du localStorage
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return this.getUser() !== null;
  }
};
