import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import usePetition from "../../../hooks/usePetition";
import { formatCurrency } from "../../../utils/numbers";
import "./Dashboard.css";

function TrendChart() {
  const [history, loading] = usePetition("assets/bitcoin/history?interval=d1");

  if (loading) {
    return (
      <div className="dominance-card glass-panel" style={{ minHeight: '350px' }}>
        <h3>Bitcoin Trend (Market Proxy)</h3>
        <div className="loading-container">
          <div className="spinner" style={{ width: '30px', height: '30px', borderWidth: '3px' }}></div>
        </div>
      </div>
    );
  }

  if (!history || history.length === 0) return null;

  const chartData = history.slice(-30).map(item => ({
    date: new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
    price: parseFloat(item.priceUsd)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-panel">
          <p className="label">{payload[0].payload.date}</p>
          <p className="intro" style={{ color: '#F7931A' }}>{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dominance-card glass-panel" style={{ gridColumn: '1 / -1' }}>
      <h3>Tendencia del Mercado (BTC / 30 Días)</h3>
      <div className="chart-container" style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-muted)" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              minTickGap={20}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="var(--text-muted)" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#F7931A"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#F7931A', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TrendChart;
