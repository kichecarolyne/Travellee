// ProductCard.js
import React, { useState } from 'react';

const ProductCard = ({ product, onAddToFavorites, onRate, onComment, data }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleAddToFavorites = () => {
    onAddToFavorites(product);
  };

  const handleRate = () => {
    onRate(product.id, rating);
  };

  const handleComment = () => {
    onComment(product.id, comment);
    setComment('');
  };

  const { id, image, title, description, location, category, } = data;

  return (
    <div className="product-card" key={id}>
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
      </div>
      <div>
        <p>Rating: {product.ratings.length > 0 ? product.ratings.reduce((a, b) => a + b) / product.ratings.length : 'N/A'}</p>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        <button onClick={handleRate}>Rate</button>
      </div>
      <div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleComment}>Comment</button>
      </div>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default ProductCard;
