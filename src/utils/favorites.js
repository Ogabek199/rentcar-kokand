// Favorites/Wishlist utility functions

const FAVORITES_KEY = "rentcar_favorites";
const LIKES_COUNT_KEY = "rentcar_likes_count";

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const addToFavorites = (carId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(carId)) {
      favorites.push(carId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return false;
  }
};

export const removeFromFavorites = (carId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== carId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return false;
  }
};

export const isFavorite = (carId) => {
  const favorites = getFavorites();
  return favorites.includes(carId);
};

export const toggleFavorite = (carId) => {
  if (isFavorite(carId)) {
    removeFromFavorites(carId);
    decrementLikeCount(carId);
    return false; // Now unfavorited
  } else {
    addToFavorites(carId);
    incrementLikeCount(carId);
    return true; // Now favorited
  }
};

export const getFavoritesCount = () => {
  return getFavorites().length;
};

// Like count functions for individual cars
export const getLikesCount = (carId) => {
  try {
    const likesCount = localStorage.getItem(LIKES_COUNT_KEY);
    const counts = likesCount ? JSON.parse(likesCount) : {};
    return counts[carId] || 0;
  } catch (error) {
    console.error("Error getting likes count:", error);
    return 0;
  }
};

export const incrementLikeCount = (carId) => {
  try {
    const likesCount = localStorage.getItem(LIKES_COUNT_KEY);
    const counts = likesCount ? JSON.parse(likesCount) : {};
    counts[carId] = (counts[carId] || 0) + 1;
    localStorage.setItem(LIKES_COUNT_KEY, JSON.stringify(counts));
    return counts[carId];
  } catch (error) {
    console.error("Error incrementing like count:", error);
    return 0;
  }
};

export const decrementLikeCount = (carId) => {
  try {
    const likesCount = localStorage.getItem(LIKES_COUNT_KEY);
    const counts = likesCount ? JSON.parse(likesCount) : {};
    if (counts[carId] && counts[carId] > 0) {
      counts[carId] = counts[carId] - 1;
      localStorage.setItem(LIKES_COUNT_KEY, JSON.stringify(counts));
    }
    return counts[carId] || 0;
  } catch (error) {
    console.error("Error decrementing like count:", error);
    return 0;
  }
};
