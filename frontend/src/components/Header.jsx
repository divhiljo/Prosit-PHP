import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ background: '#f7f7f8' }}>
      <div className="div-style-ac0c68ef">
        <div className="div-style-a829a1b5">
          <img src="../public/img.png" className="img-style-ee9086c9" alt="Logo" />
          <nav className={`div-style-26ad796c ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" className={isActive('/')}>Accueil</Link></li>
              <li><Link to="/cer" className={isActive('/cer')}>CERs</Link></li>
              <li><Link to="/favoris" className={isActive('/favoris')}>Mes CER Favoris</Link></li>
              <li><Link to="/all-cer" className={isActive('/all-cer')}>Gestion de CER</Link></li>
            </ul>
          </nav>
          <button 
            className="hamburger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </button>
        </div>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>
              Bonjour, <strong>{user.prenom} {user.nom}</strong>
            </span>
            <button 
              className="button-style-887f98ed" 
              onClick={handleLogout}
              style={{ background: '#dc3545' }}
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="button-style-887f98ed">Connexion</button>
          </Link>
        )}
      </div>
    </header>
  );
}
