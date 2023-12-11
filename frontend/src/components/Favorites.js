// Favorites.js
import React from 'react';
import { useFavorites } from './FavoritesContext';
import ProductCard from './ProductCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>Your Favorites</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <ProductCard key={item.id} data={item} isFavorite={true} />
          ))
        ) : (
          <p>No favorites yet. Explore and add some!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
