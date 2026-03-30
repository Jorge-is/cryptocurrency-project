import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const navigation = useNavigate();
  const { session } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation("/login");
  };

  const userName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || "Perfil";

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/">
            Cripto<span className="text-accent">Market</span>
          </NavLink>
        </div>
        
        {/* Toggle Button for Mobile */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-group ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} onClick={() => setIsMenuOpen(false)}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/criptomonedas" className={({ isActive }) => isActive ? "active-link" : ""} onClick={() => setIsMenuOpen(false)}>
                Mercado
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil" className={({ isActive }) => isActive ? "active-link" : ""} onClick={() => setIsMenuOpen(false)}>
                {userName}
              </NavLink>
            </li>
          </ul>

          <div className="navbar-actions">
            <button className="btn-logout" onClick={handleLogout}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
