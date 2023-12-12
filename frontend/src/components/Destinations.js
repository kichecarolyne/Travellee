// Destinations.js
import React from 'react';
import ProductGrid from './ProductGrid';
import { useAuth } from '../components/authContext';
import destinationsData from '../data/destinationsData';
import './Product.css';
import './Page.css';


const Destinations = () => {
  const { user } = useAuth(); // Get the user from the AuthContext

  const handleAddToFavorites = (destination) => {
    if (user) {
      // Add logic to save destination to user's favorites
      console.log(`Added ${destination.title} to favorites`);
    } else {
      // Redirect or show a message that login is required
      console.log('Please log in to add to favorites');
    }
  };

  return (
    <div>
      <h1>Explore Destinations</h1>
      <ProductGrid products={destinationsData} itemsPerPage={3} showPagination={true} onAddToFavorites={handleAddToFavorites} className="hotels-product-grid"  />
    </div>
  );
};

export default Destinations;
