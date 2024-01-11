import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory }) => {
  const categoryItems = (categories || []).map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ));

  return (
    <select onChange={(e) => onSelectCategory(e.target.value)}>
      <option value="all">All Categories</option>
      {categoryItems}
    </select>
  );
};

export default CategoryFilter;
