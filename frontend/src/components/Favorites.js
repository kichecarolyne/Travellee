import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteDestination from './FavoriteDestination';
import FavoriteHotel from './FavoriteHotel';
import FavoriteBlog from './FavoriteBlog';



const Favorite = ({ itemType, itemId, authToken }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // You might want to fetch the initial favorite status when the component mounts
    // For example, you can have an API endpoint like `/api/favorite/${itemType}/${itemId}/status`
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/favorite/${itemType}/${itemId}/status`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorited(data.isFavorited);
        } else {
          console.error('Failed to fetch favorite status:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error.message);
      }
    };

    fetchFavoriteStatus();
  }, [itemType, itemId, authToken]);

  const handleFavorite = async () => {
    try {
      const response = await fetch(`/api/favorite/${itemType}/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setIsFavorited(true);
        setMessage('Item favorited successfully!');
      } else {
        console.error('Failed to favorite item:', response.statusText);
        setMessage('Failed to favorite item. Please try again.');
      }
    } catch (error) {
      console.error('Error favoriting item:', error.message);
      setMessage('Error favoriting item. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/itinerary" className="btn btn-primary mb-4">
        Go to Itinerary
      </Link>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <FavoriteDestination destinationId="destination-id" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <FavoriteHotel hotelId="hotel-id" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <FavoriteBlog blogId="blog-id" />
            </div>
          </div>
        </div>
      </div>

      {isFavorited && (
        <div className="alert alert-success mt-4" role="alert">
          Item is favorited!
        </div>
      )}
    </div>
  );
};

export default Favorite;