import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { UserContext } from "../../../context/UserContext";
import { useFavorites } from "../hooks/useFavorites";
import CryptoCard from "../../crypto/components/CryptoCard";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function Profile() {
  const { session } = useContext(UserContext);
  const { favorites, loadingFavs } = useFavorites();
  const [favoriteData, setFavoriteData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteData([]);
      return;
    }

    const fetchFavoritesData = async () => {
      setLoadingData(true);
      try {
        const promises = favorites.map(id =>
          axios.get(`${API_URL}assets/${id}`, {
            headers: { Authorization: `Bearer ${API_KEY}` }
          })
        );
        const responses = await Promise.all(promises);
        const loadedData = responses.map(res => res.data.data);
        setFavoriteData(loadedData);
      } catch (error) {
        console.error("Error loading favorite cryptos", error);
      }
      setLoadingData(false);
    };

    fetchFavoritesData();
  }, [favorites]);

  const userName = session?.user?.user_metadata?.full_name || session?.user?.email || "Usuario Local";

  return (
    <div className="profile-container">

      <div className="profile-header glass-panel">
        <div className="avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{userName}</h1>
          <p className="text-muted">Miembro verificado de CriptoMarket</p>
        </div>
      </div>

      <div className="portfolio-section">
        <h2>Mis Favoritos</h2>
        
        {loadingFavs || loadingData ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando tus favoritos...</p>
          </div>
        ) : favoriteData.length > 0 ? (
          <div className="crypto-grid">
            {favoriteData.map(crypto => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        ) : (
          <div className="empty-state glass-panel">
            <Bookmark />
            <p>Aún no tienes criptomonedas favoritas.</p>
            <span>Ve al mercado y selecciona la estrella de las monedas que quieras seguir.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
