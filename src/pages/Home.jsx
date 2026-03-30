import { Link } from "react-router-dom";
import { Rocket, ShieldCheck, SquareKanban } from "lucide-react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section glass-panel">
        <h1 className="hero-title">
          Bienvenidos a <br/>
          <span className="text-accent gradient-text">CriptoMarket</span>
        </h1>
        <p className="hero-subtitle">
          El portal para visualizar y analizar el mercado de criptomonedas en tiempo real.
        </p>
        
        <div className="hero-actions">
          <Link to="/criptomonedas" className="btn-primary hero-btn">
            Explorar Mercado
          </Link>
          <Link to="/perfil" className="btn-secondary hero-btn">
            Mi Perfil
          </Link>
        </div>
      </div>
      
      <div className="features-grid">
        <div className="feature-card glass-panel">
          <h3><Rocket /> Datos en Tiempo Real</h3>
          <p>Obtén el precio preciso y la fluctuación de las top 100 criptomonedas del mercado.</p>
        </div>
        <div className="feature-card glass-panel">
          <h3><SquareKanban /> Historial Interactivo</h3>
          <p>Visualiza el detalle completo y el historial de precios de los últimos días.</p>
        </div>
        <div className="feature-card glass-panel">
          <h3><ShieldCheck /> Seguro y Rápido</h3>
          <p>Tu sesión está protegida y la plataforma está optimizada para cargar al instante.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
