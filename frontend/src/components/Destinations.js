import React, { useState, useEffect } from 'react';
import './Destinations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './AuthService';
import apiService from './apiService';
import FavoriteDestination from './FavoriteDestination';



const Destinations = ({ data }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedRating, setSubmittedRating] = useState(null);
  const [submittedComment, setSubmittedComment] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("Is user logged in:", AuthService.isLoggedIn());
    if (AuthService.isLoggedIn()) {
      const userId = AuthService.getUserId();
      const isFav = apiService.isDestinationFavorite(data.id, userId);
      console.log("Is destination favorite:", isFav);
      setIsFavorite(isFav);
    }
  }, [data.id]); 

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFavoriteToggle = async () => {
    try {
      const authToken = AuthService.getAuthToken();
      const response = await apiService.toggleFavorite(data.id, authToken);

      // Update the state based on the API response
      setIsFavorite(response.isFavorite);
    } catch (error) {
      console.error(error.message);
      setError('Failed to update favorite status. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Submit button clicked!');

    if (!AuthService.isLoggedIn()) {
      // If not logged in, display a message or redirect to the login page
      console.log('Please log in to rate and comment.');
      return;
    }

    try {
      const authToken = AuthService.getAuthToken();
      const responseData = await apiService.submitRatingAndComment(rating, comment, authToken);

      // Set the submitted values
      setSubmittedRating(responseData.rating);
      setSubmittedComment(responseData.comment);
      console.log('Rating and comment submitted successfully.');
    } catch (error) {
      console.error(error.message);
      setError('Failed to submit rating and comment. Please try again.');
    }
  };

  return (
    <div className="destination-item">
      <div className="row">
        {/* Display destination image covering half of the wider screen */}
        <div className="col-lg-6">
          <img src={data.image} alt={data.title} className="img-fluid" />
        </div>

        {/* Display destination details to the right of the image */}
        <div className="col-lg-6">
          <h3 className="destination-detail">{data.title}</h3>
          <p className="destination-detail">{data.description}</p>
          <p className="destination-detail">Location: {data.location}</p>
          <p className="destination-detail">Category: {data.category}</p>
          <div>
            <strong className="destination-detail">Ratings:</strong>{' '}
            {submittedRating !== null ? submittedRating : rating}
          </div>
          <div>
            <strong className="destination-detail">Comments:</strong>
            <ul>
              {data.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>

          {/* Button to toggle favorite status */}
          {AuthService.isLoggedIn() && (
            <button type='submit'
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-primary'} mr-2`}
              onClick={handleFavoriteToggle}  // <-- Corrected the handler here
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}

          {/* Form for rating and comment */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Rate this destination:
                <select
                  className="form-select"
                  value={rating}
                  onChange={handleRatingChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Comment:
                <textarea
                  className="form-control"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {/* Display confirmation messages or error */}
          {submittedRating !== null && (
            <p>Thank you for submitting your rating: {submittedRating}</p>
          )}
          {submittedComment !== null && (
            <p>Thank you for submitting your comment: {submittedComment}</p>
          )}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
