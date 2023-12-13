// Hotels.js
import React from 'react';
import ProductGrid from './ProductGrid';
import { useAuth } from '../components/authContext';
import hotelsData from '../data/hotelsData';
import './Product.css';
import './Page.css';

const Hotels = () => {
  const { user } = useAuth();

  const handleRateHotel = (hotelId, rating) => {
    console.log(`Rated Hotel ${hotelId} with ${rating} stars`);
  };

  const handleCommentHotel = (hotelId, comment) => {
    console.log(`Commented on Hotel ${hotelId}: ${comment}`);
  };

  const handleAddToFavorites = (hotel) => {
    if (user) {
      console.log(`Added ${hotel.title} to favorites`);
    } else {
      console.log('Please log in to add to favorites');
    }
  };

  console.log('Hotels Data:', hotelsData);

  return (
    <div>
      <h1>Explore Hotels</h1>
      <ProductGrid
        products={hotelsData}
        itemsPerPage={3}
        showPagination={true}
        onAddToFavorites={handleAddToFavorites}
        onRateProduct={handleRateHotel}
        onCommentProduct={handleCommentHotel}
        className="hotels-product-grid"
      />
    </div>
  );
};

export default Hotels;