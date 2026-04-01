import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { formatCurrency, parseFloatNumber } from "../../../utils/numbers";
import "./Dashboard.css";

function DashboardStats({ cryptos }) {
  if (!cryptos) return null;

  const totalMarketCap = cryptos.reduce((acc, curr) => acc + parseFloat(curr.marketCapUsd), 0);
  const totalVolume = cryptos.reduce((acc, curr) => acc + parseFloat(curr.volumeUsd24Hr), 0);
  const avgChange = cryptos.reduce((acc, curr) => acc + parseFloat(curr.changePercent24Hr), 0) / cryptos.length;

  const isMarketUp = avgChange >= 0;

  return (
    <div className="stats-grid">
      <div className="stat-card glass-panel">
        <div className="stat-icon-wrapper blue-glow">
          <DollarSign size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Market Cap (Top 100)</span>
          <h3 className="stat-value">{formatCurrency(totalMarketCap)}</h3>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon-wrapper purple-glow">
          <Activity size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Volumen 24h (Top 100)</span>
          <h3 className="stat-value">{formatCurrency(totalVolume)}</h3>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className={`stat-icon-wrapper ${isMarketUp ? 'green-glow' : 'red-glow'}`}>
          {isMarketUp ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
        </div>
        <div className="stat-info">
          <span className="stat-label">Rendimiento Promedio</span>
          <h3 className={`stat-value ${isMarketUp ? 'text-success' : 'text-danger'}`}>
            {isMarketUp ? '+' : ''}{parseFloatNumber(avgChange)}%
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
