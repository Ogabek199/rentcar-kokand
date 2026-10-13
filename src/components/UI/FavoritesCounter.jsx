import React, { useState, useEffect } from "react";
import { getFavoritesCount } from "../../utils/favorites";
import "../../styles/favorites-counter.css";

const FavoritesCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setCount(getFavoritesCount());
    };

    // Initial count
    updateCount();

    // Listen for favorite changes
    window.addEventListener("favoriteChanged", updateCount);

    return () => {
      window.removeEventListener("favoriteChanged", updateCount);
    };
  }, []);

  if (count === 0) return null;

  return (
    <div className="favorites-counter">
      <i className="ri-heart-fill"></i>
      <span className="favorites-counter__count">{count}</span>
    </div>
  );
};

export default FavoritesCounter;
