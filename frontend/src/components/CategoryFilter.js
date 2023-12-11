// CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory }) => {
  return (
    <div>
      <label htmlFor="category">Select Category:</label>
      <select id="category" onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
