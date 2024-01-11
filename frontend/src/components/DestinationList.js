import React, { useEffect, useState } from 'react';
import Destination from './Destinations';
import destinationsData from '../data/destinationsData'; // Adjust the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const itemsPerPage = 3;

const DestinationsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // You don't need to fetch data, just set it from the imported module
    setDestinations(destinationsData);
  }, []); // Empty dependency array ensures the effect runs only once

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDestinations = destinations.slice(startIndex, endIndex);

  const totalPages = Math.ceil(destinations.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {currentDestinations.length > 0 ? (
        currentDestinations.map((destination) => (
          <Destination key={destination.id} data={destination} />
        ))
      ) : (
        <p>No destinations available.</p>
      )}

      {totalPages > 1 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationsList;
