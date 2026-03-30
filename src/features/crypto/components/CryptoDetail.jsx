import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import usePetition from "../../../hooks/usePetition";
import { useFavorites } from "../../profile/hooks/useFavorites";
import { formatCurrency, parseFloatNumber } from "../../../utils/numbers";
import "./CryptoDetail.css";

function CryptoDetail() {
  const params = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [crypto, loadingCrypto] = usePetition(`assets/${params.id}`);
  const [history, loadingHistory] = usePetition(`assets/${params.id}/history?interval=d1`);

  if (loadingCrypto || loadingHistory) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando detalles de {params.id}...</p>
      </div>
    );
  }

  if (!crypto) return <div className="error-message">Moneda no encontrada.</div>;

  const isPositive = crypto.changePercent24Hr > 0;
  const favState = isFavorite(crypto.id);

  return (
    <div className="crypto-detail-view">
      <Link to="/criptomonedas" className="back-link">
        &larr; Volver al Mercado
      </Link>
      
      <div className="crypto-header-card glass-panel">
        <div className="main-title-area">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="rank-badge">Rank #{crypto.rank}</span>
            <button 
              className="btn-favorite" 
              onClick={() => toggleFavorite(crypto.id)}
              title={favState ? "Quitar de Favoritos" : "Agregar a Favoritos"}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <Star 
                color={favState ? "#FCD34D" : "var(--text-muted)"} 
                fill={favState ? "#FCD34D" : "none"} 
                size={24} 
              />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <img 
              src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`} 
              alt={crypto.name} 
              style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              onError={(e) => { e.target.src = 'https://coincap.io/static/logo_mark.png' }}
            />
            <h1 className="crypto-detail-title">{crypto.name}</h1>
          </div>
          <span className="crypto-detail-symbol">{crypto.symbol}</span>
        </div>
        <div className="main-price-area">
          <h2>{formatCurrency(crypto.priceUsd)}</h2>
          <span className={`badge ${isPositive ? 'badge-success' : 'badge-danger'}`}>
             {isPositive ? '+' : ''}{parseFloatNumber(crypto.changePercent24Hr)}% (24h)
          </span>
        </div>
      </div>

      <div className="crypto-content-grid">
        <div className="stats-card glass-panel">
          <h3>Estadísticas del Mercado</h3>
          <ul className="stats-list">
            <li>
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">{formatCurrency(crypto.marketCapUsd)}</span>
            </li>
            <li>
              <span className="stat-label">Volumen (24h)</span>
              <span className="stat-value">{formatCurrency(crypto.volumeUsd24Hr)}</span>
            </li>
            <li>
              <span className="stat-label">Max Supply</span>
              <span className="stat-value">{crypto.maxSupply ? formatCurrency(crypto.maxSupply) : "Ilimitado"}</span>
            </li>
            <li>
              <span className="stat-label">VWAP (24h)</span>
              <span className="stat-value">{formatCurrency(crypto.vwap24Hr)}</span>
            </li>
          </ul>
        </div>

        <div className="history-card glass-panel">
          <h3>Historial de Precios (30 días)</h3>
          {history && history.length > 0 ? (
            <div className="table-responsive">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(-10).reverse().map(({ date, priceUsd, time }) => (
                    <tr key={time}>
                      <td>{new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td className="table-price">{formatCurrency(priceUsd)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="history-note">*Mostrando los últimos 10 días disponibles en la API.</p>
            </div>
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CryptoDetail;
