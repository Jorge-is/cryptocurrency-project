import { useState } from "react";
import CryptoCard from "./CryptoCard";
import usePetition from "../../../hooks/usePetition";
import { Search, SlidersHorizontal } from "lucide-react";
import "./CryptoGrid.css";

function CryptoGrid() {
  const [cryptos, loading] = usePetition("assets");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando mercado...</p>
      </div>
    );
  }

  if (!cryptos) return <span className="error">Ocurrió un error al cargar las criptomonedas.</span>;

  let filteredCryptos = cryptos.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredCryptos = filteredCryptos.sort((a, b) => {
    if (sortBy === "rank") return parseInt(a.rank) - parseInt(b.rank);
    if (sortBy === "price_desc") return parseFloat(b.priceUsd) - parseFloat(a.priceUsd);
    if (sortBy === "price_asc") return parseFloat(a.priceUsd) - parseFloat(b.priceUsd);
    if (sortBy === "change_desc") return parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr);
    if (sortBy === "change_asc") return parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr);
    return 0;
  });

  return (
    <div className="crypto-grid-view">
      <div className="crypto-grid-header">
        <h1>Mercado Global</h1>
        <p className="subtitle">Explora las criptomonedas más importantes en tiempo real.</p>
      </div>

      <div className="crypto-filters glass-panel">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Buscar criptomoneda por nombre" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <SlidersHorizontal className="filter-icon" size={20} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
             <option value="rank">Ranking Default</option>
             <option value="price_desc">Precio: Mayor a Menor</option>
             <option value="price_asc">Precio: Menor a Mayor</option>
             <option value="change_desc">Cambio 24h: Ganancias</option>
             <option value="change_asc">Cambio 24h: Pérdidas</option>
          </select>
        </div>
      </div>

      {filteredCryptos.length > 0 ? (
        <div className="crypto-grid">
          {filteredCryptos.map(crypto => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      ) : (
        <div className="empty-search glass-panel">
          <p>No se encontraron resultados para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default CryptoGrid;
