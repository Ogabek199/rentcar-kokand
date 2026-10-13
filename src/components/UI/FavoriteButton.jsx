import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import "../../styles/favorite-button.css";

const FavoriteButton = React.memo(({ carId, size = "medium", onToggle }) => {
  const { isFavorite, toggleFavorite, getLikesCount } = useFavorites();
  
  const favorited = isFavorite(carId);
  const likesCount = getLikesCount(carId);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(carId);
    if (onToggle) {
      onToggle(!favorited);
    }
  };

  return (
    <div className="favorite-btn-wrapper">
      <button
        className={`favorite-btn favorite-btn--${size} ${favorited ? "favorited" : ""}`}
        onClick={handleToggle}
        aria-label={favorited ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        title={favorited ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
      >
        <i className={favorited ? "ri-heart-fill" : "ri-heart-line"}></i>
        {likesCount > 0 && (
          <span className="favorite-btn__count">{likesCount}</span>
        )}
      </button>
    </div>
  );
});

FavoriteButton.displayName = "FavoriteButton";

export default FavoriteButton;
