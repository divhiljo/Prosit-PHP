import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await authService.login(email, password);
      
      if (response.ok) {
        // Utiliser le contexte pour mettre à jour l'état global
        login(response.user);
        alert('Connexion réussie!');
        navigate('/');
      } else {
        setError(response.message || 'Erreur lors de la connexion');
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
          <h1 className="login-title">Se connecter</h1>
          
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
              <label className="form-label" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">Mot de passe</label>
              <div className="password-container">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password" 
                  className="form-input" 
                  placeholder="Entrer votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              <a href="#" className="forgot-password">Mot de passe oublié ?</a>
            </div>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
            
            <p className="signup-link">
              Vous n'avez pas de compte? <Link to="/signup">Créez un nouveau compte</Link>
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
            <div className="floating-icon">👆</div>
            <div className="floating-icon">🛡</div>
            <div className="floating-icon">🍃</div>
          </div>
        </div>
      </div>
    </div>
  );
}
