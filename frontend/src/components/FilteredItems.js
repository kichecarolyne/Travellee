// FilteredItems.js

import React from 'react';
import { useParams } from 'react-router-dom';
import destinationsData from '../data/destinationsData'; // Import destinations data
import hotelsData from '../data/hotelsData'; // Import hotels data

const FilteredItems = () => {
  const { category } = useParams(); // Get the category from URL params

  // Filter items based on the category for both destinations and hotels
  const filteredDestinations = destinationsData.filter(item => item.category === category);
  const filteredHotels = hotelsData.filter(item => item.category === category);

  // Combine filtered destinations and hotels into a single array for rendering
  const combinedItems = [...filteredDestinations, ...filteredHotels];

  return (
    <div>
      <h2>{`Filtered Items for ${category}`}</h2>
      <div className="product-grid-container">
        {combinedItems.map(item => (
          <div key={item.id} className="grid-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredItems;
