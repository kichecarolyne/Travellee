// ProductCard.js
import React from 'react';

const ProductCard = ({ data }) => {
  // Extract relevant details from the data object
  const { id, image, title, description, location, category } = data;

  return (
    <div className="product-card" key={id}>
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
      </div>
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
    </div>
  );
};

export default ProductCard;
