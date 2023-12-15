import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';

const ProductList = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      {/* CategoryFilter component */}
      <CategoryFilter
        categories={['all', 'Wildlife', 'Beaches']}
        onSelectCategory={handleSelectCategory}
      />

      {/* Display Selected Category */}
      <p>Selected Category: {selectedCategory}</p>

      {/* Display Filtered Products */}
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
