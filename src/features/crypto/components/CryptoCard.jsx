import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useFavorites } from "../../profile/hooks/useFavorites";
import "./CryptoCard.css";

function CryptoCard({ crypto }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const price = parseFloat(crypto.priceUsd).toFixed(2);
  const change = parseFloat(crypto.changePercent24Hr).toFixed(2);
  const isPositive = crypto.changePercent24Hr > 0;
  
  const favState = isFavorite(crypto.id);

  return (
    <div className="crypto-card glass-panel">
      <div className="crypto-card-header">
        <div className="crypto-identifier">
          <img 
            src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`} 
            alt={crypto.name} 
            className="crypto-logo" 
            onError={(e) => { e.target.src = 'https://coincap.io/static/logo_mark.png' }}
          />
          <div>
            <h2>{crypto.name}</h2>
            <span className="crypto-symbol">{crypto.symbol}</span>
          </div>
        </div>
        <button 
          className="btn-favorite" 
          onClick={() => toggleFavorite(crypto.id)}
          title={favState ? "Quitar de Favoritos" : "Agregar a Favoritos"}
        >
          <Star 
            color={favState ? "#FCD34D" : "var(--text-muted)"} 
            fill={favState ? "#FCD34D" : "none"} 
            size={22} 
            strokeWidth={favState ? 0 : 2}
          />
        </button>
      </div>
      
      <div className="crypto-card-body">
        <div className="crypto-price">
          <span className="label">Precio</span>
          <h3>${price} USD</h3>
        </div>
        
        <div className="crypto-change">
          <span className="label">24h</span>
          <span className={`badge ${isPositive ? 'badge-success' : 'badge-danger'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
      </div>

      <Link to={`/criptomonedas/${crypto.id}`} className="btn-details">
        Ver Detalles
      </Link>
    </div>
  );
}

export default CryptoCard;
