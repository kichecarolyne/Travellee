// FavoriteHotel.js
import React from 'react';
import axios from 'axios';

function FavoriteHotel({ hotelId }) {
  const handleFavorite = async () => {
    try {
      const response = await axios.post(`/api/favorite/hotel/${hotelId}`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error favoriting hotel:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFavorite}>Favorite Hotel</button>
    </div>
  );
}

export default FavoriteHotel;
