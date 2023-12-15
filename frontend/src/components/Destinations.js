// Destinations.js
import React from 'react';
import ProductGrid from './ProductGrid';
import { useAuth } from '../components/authContext';
import destinationsData from '../data/destinationsData';
import './Product.css';


const Destinations = () => {
  const { user } = useAuth();

  const handleRateDestination = (destinationId, rating) => {
    console.log(`Rated Destination ${destinationId} with ${rating} stars`);
  };

  const handleCommentDestination = (destinationId, comment) => {
    console.log(`Commented on Destination ${destinationId}: ${comment}`);
  };

  const handleAddToFavorites = (destination) => {
    if (user) {
      console.log(`Added ${destination.title} to favorites`);
    } else {
      console.log('Please log in to add to favorites');
    }
  };

  console.log('Destinations Data:', destinationsData);

  return (
    <div>
      <h1>Explore Destinations</h1>
      <ProductGrid
        products={destinationsData}
        itemsPerPage={3}
        showPagination={true}
        onAddToFavorites={handleAddToFavorites}
        onRateProduct={handleRateDestination}
        onCommentProduct={handleCommentDestination}
        className="hotels-product-grid"
      />
    </div>
  );
};

export default Destinations;