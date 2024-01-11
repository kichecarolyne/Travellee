// FavoriteDestination.js
import React from 'react';
import axios from 'axios';

function FavoriteDestination({ destinationId }) {
  const handleFavorite = async () => {
    try {
      const response = await axios.post(`/api/favorite/destination/${destinationId}`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error favoriting destination:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFavorite}>Favorite Destination</button>
    </div>
  );
}

export default FavoriteDestination;
