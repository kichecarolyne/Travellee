// Hotels.js
import React from 'react';
import ProductGrid from './ProductGrid';
import { useAuth } from '../components/authContext';
import hotelsData from '../data/hotelsData';
import './Product.css';
import './Page.css';


const Hotels = () => {
  const { user } = useAuth(); // Get the user from the AuthContext

  const handleAddToFavorites = (hotel) => {
    if (user) {
      // Add logic to save hotel to user's favorites
      console.log(`Added ${hotel.title} to favorites`);
    } else {
      // Redirect or show a message that login is required
      console.log('Please log in to add to favorites');
    }
  };

  return (
    <div>
      <h1>Explore Hotels</h1>
      <ProductGrid products={hotelsData} itemsPerPage={3} showPagination={true} onAddToFavorites={handleAddToFavorites} className="hotels-product-grid"  />
    </div>
  );
};

export default Hotels;
