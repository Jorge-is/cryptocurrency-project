import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "../../../utils/numbers";
import "./Dashboard.css";

function MarketDominance({ cryptos }) {
  if (!cryptos || cryptos.length === 0) return null;

  const topCount = 3;
  const sortedCryptos = [...cryptos].sort((a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd));
  
  const topCryptos = sortedCryptos.slice(0, topCount).map(c => ({
    name: c.symbol,
    value: parseFloat(c.marketCapUsd),
    color: getBrandColor(c.symbol)
  }));

  const othersSum = sortedCryptos.slice(topCount).reduce((acc, c) => acc + parseFloat(c.marketCapUsd), 0);
  
  const chartData = [
    ...topCryptos,
    { name: "Others", value: othersSum, color: "#64748B" }
  ];

  function getBrandColor(symbol) {
    if (symbol === 'BTC') return '#F7931A';
    if (symbol === 'ETH') return '#627EEA';
    if (symbol === 'USDT') return '#26A17B';
    if (symbol === 'BNB') return '#F3BA2F';
    return '#3B82F6';
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-panel">
          <p className="label">{`${payload[0].name} Dominance`}</p>
          <p className="intro">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dominance-card glass-panel">
      <h3>Dominio del Mercado</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MarketDominance;
