import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import '../styles/login.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    niveau: 'X1',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Effacer l'erreur lors de la saisie
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.fullname || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setLoading(true);
    
    try {
      // Séparer le nom complet en nom et prénom
      const nameParts = formData.fullname.trim().split(' ');
      const prenom = nameParts[0];
      const nom = nameParts.slice(1).join(' ') || nameParts[0];
      
      const response = await authService.signup({
        nom,
        prenom,
        email: formData.email,
        password: formData.password
      });
      
      if (response.ok) {
        // Utiliser le contexte pour mettre à jour l'état global
        login(response.user);
        alert('Compte créé avec succès!');
        navigate('/');
      } else {
        setError(response.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Créer un compte</h1>
          
          {error && (
            <div style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '5px',
              color: '#c33'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullname">Nom complet</label>
              <input 
                type="text" 
                id="fullname"
                name="fullname"
                className="form-input" 
                placeholder="Nom complet"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                className="form-input" 
                placeholder="Entrer votre email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="niveau">Niveaux</label>
              <select 
                id="niveau"
                name="niveau"
                className="form-input" 
                value={formData.niveau}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              >
                <option value="X1">X1</option>
                <option value="X2">X2</option>
                <option value="X3">X3</option>
                <option value="X4">X4</option>
                <option value="X5">X5</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">Mot de passe</label>
              <div className="password-container">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input" 
                  placeholder="Entrer votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Création en cours...' : 'Créer un compte'}
            </button>
            
            <p className="signup-link">
              Vous avez déjà un compte? <Link to="/login">Connectez vous</Link>
            </p>
            <p className="signup-link">Retourner a la pages d'<Link to="/">Acceuil</Link></p>
          </form>
        </div>
        
        <div className="illustration">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="lock-icon"></div>
              <div className="password-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
          
          <div className="character">
            <div className="character-hair"></div>
            <div className="character-head"></div>
            <div className="character-body"></div>
          </div>
          
          <div className="floating-icons">
            <div className="floating-icon">✨</div>
            <div className="floating-icon">📝</div>
            <div className="floating-icon">🎓</div>
          </div>
        </div>
      </div>
    </div>
  );
}
