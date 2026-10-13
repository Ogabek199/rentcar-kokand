import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "rentcar_favorites";
const LIKES_COUNT_KEY = "rentcar_likes_count";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [likesCounts, setLikesCounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LIKES_COUNT_KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    localStorage.setItem(LIKES_COUNT_KEY, JSON.stringify(likesCounts));
  }, [favorites, likesCounts]);

  const toggleFavorite = useCallback((carId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(carId);
      const newFavorites = isFav 
        ? prev.filter((id) => id !== carId) 
        : [...prev, carId];
      
      setLikesCounts((counts) => ({
        ...counts,
        [carId]: Math.max(0, (counts[carId] || 0) + (isFav ? -1 : 1)),
      }));

      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((carId) => favorites.includes(carId), [favorites]);
  const getLikesCount = useCallback((carId) => likesCounts[carId] || 0, [likesCounts]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, getLikesCount }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
