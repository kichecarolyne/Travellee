// FavoriteBlog.js
import React from 'react';
import axios from 'axios';

function FavoriteBlog({ blogId }) {
  const handleFavorite = async () => {
    try {
      const response = await axios.post(`/api/favorite/blog/${blogId}`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error favoriting blog:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFavorite}>Favorite Blog</button>
    </div>
  );
}

export default FavoriteBlog;
