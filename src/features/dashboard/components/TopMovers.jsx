import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, parseFloatNumber } from "../../../utils/numbers";
import "./Dashboard.css";

function TopMovers({ cryptos, type = "gainers" }) {
  if (!cryptos) return null;

  const title = type === "gainers" ? "Top 5 Ganadoras" : "Top 5 Perdedoras";
  const isGainers = type === "gainers";

  const sortedList = [...cryptos].sort((a, b) => {
    return isGainers 
      ? parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
      : parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr);
  }).slice(0, 5);

  return (
    <div className="movers-card glass-panel">
      <div className="movers-header">
        <div className="movers-title">
          {isGainers ? <TrendingUp className="text-success" size={20} /> : <TrendingDown className="text-danger" size={20} />}
          <h3>{title}</h3>
        </div>
      </div>
      <div className="movers-list">
        {sortedList.map((crypto, index) => (
          <Link key={crypto.id} to={`/criptomonedas/${crypto.id}`} className="mover-item">
            <span className="mover-rank">{index + 1}</span>
            <div className="mover-info">
              <img 
                src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`} 
                alt={crypto.name} 
                className="mover-logo"
                onError={(e) => { e.target.src = 'https://coincap.io/static/logo_mark.png' }}
              />
              <div className="mover-names">
                <span className="mover-symbol">{crypto.symbol}</span>
                <span className="mover-name text-muted">{crypto.name}</span>
              </div>
            </div>
            <div className="mover-data">
              <span className="mover-price">{formatCurrency(crypto.priceUsd)}</span>
              <span className={`mover-change ${isGainers ? 'text-success' : 'text-danger'}`}>
                {isGainers ? '+' : ''}{parseFloatNumber(crypto.changePercent24Hr)}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopMovers;
