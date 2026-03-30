import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../../services/supabase';
import { UserContext } from '../../../context/UserContext';

export function useFavorites() {
  const { session } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(true);

  // Cargar favoritos al inicio
  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchFavorites = async () => {
      setLoadingFavs(true);
      const { data, error } = await supabase
        .from('favorites')
        .select('crypto_id')
        .eq('user_id', session.user.id);
      
      if (!error && data) {
        setFavorites(data.map(f => f.crypto_id));
      }
      setLoadingFavs(false);
    };

    fetchFavorites();
  }, [session]);

  const toggleFavorite = async (cryptoId) => {
    if (!session?.user?.id) return;
    
    const isFavorite = favorites.includes(cryptoId);
    
    // Optimistic UI update
    if (isFavorite) {
      setFavorites(prev => prev.filter(id => id !== cryptoId));
      // Eliminar de Supabase
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session.user.id)
        .eq('crypto_id', cryptoId);
    } else {
      setFavorites(prev => [...prev, cryptoId]);
      // Añadir a Supabase
      await supabase
        .from('favorites')
        .insert([{ user_id: session.user.id, crypto_id: cryptoId }]);
    }
  };

  const isFavorite = (cryptoId) => favorites.includes(cryptoId);

  return { favorites, toggleFavorite, isFavorite, loadingFavs };
}
