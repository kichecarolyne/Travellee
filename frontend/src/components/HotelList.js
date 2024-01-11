import React, { useEffect, useState } from 'react';
import Hotel from './Hotels';
import hotelsData from '../data/hotelsData';
import 'bootstrap/dist/css/bootstrap.min.css';

const itemsPerPage = 3;

const HotelList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // You don't need to fetch data, just set it from the imported module
    setHotels(hotelsData);
  }, []); // Empty dependency array ensures the effect runs only once

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHotels = hotels.slice(startIndex, endIndex);

  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {currentHotels.length > 0 ? (
        currentHotels.map((hotel) => (
          <Hotel key={hotel.id} data={hotel} />
        ))
      ) : (
        <p>No hotels available.</p>
      )}

      {/* Bootstrap-styled pagination controls */}
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

export default HotelList;
