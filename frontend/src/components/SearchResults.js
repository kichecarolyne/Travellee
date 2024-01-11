import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results-container">
      {/* Display Blogs */}
      {results.blogpost && (
        <div className="result-section">
          <h2>BlogPost</h2>
          <ul>
            {results.blogpost.map((blogpost, index) => (
              <li key={blogpost.id || index}>
                <h3>{blogpost.title}</h3>
                <p>{blogpost.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Hotels */}
      {results.hotels && (
        <div className="result-section">
          <h2>Hotels</h2>
          <ul>
            {results.hotels.map((hotel, index) => (
              <li key={hotel.id || index}>
                <h3>{hotel.title}</h3>
                <p>{hotel.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Destinations */}
      {results.destinations && (
        <div className="result-section">
          <h2>Destinations</h2>
          <ul>
            {results.destinations.map((destination, index) => (
              <li key={destination.id || index}>
                <h3>{destination.title}</h3>
                <p>{destination.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
