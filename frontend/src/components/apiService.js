import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiService = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  loginUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  fetchDestinations: async () => {
    try {
      const response = await axios.get(`${API_URL}/destinations`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDestinationById: async (destinationId) => {
    try {
      const response = await axios.get(`${API_URL}/destination/${destinationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchHotels: async () => {
    try {
      const response = await axios.get(`${API_URL}/hotels`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHotelById: async (hotelId) => {
    try {
      const response = await axios.get(`${API_URL}/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchBlogPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}/blogposts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBlogPostById: async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/blogpost/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchUserDetails: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCommentToDestination: async (destinationId, commentData) => {
    try {
      const response = await axios.post(`${API_URL}/destination/${destinationId}/comment`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCommentToHotel: async (hotelId, commentData) => {
    try {
      const response = await axios.post(`${API_URL}/hotel/${hotelId}/comment`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addRatingToDestination: async (destinationId, ratingData) => {
    try {
      const response = await axios.post(`${API_URL}/destination/${destinationId}/rate`, ratingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addRatingToHotel: async (hotelId, ratingData) => {
    try {
      const response = await axios.post(`${API_URL}/hotel/${hotelId}/rate`, ratingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToFavorites: async (userId, entityType, entityId) => {
    try {
      const response = await axios.post(`${API_URL}/user/${userId}/favorites`, { entityType, entityId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromFavorites: async (userId, entityType, entityId) => {
    try {
      const response = await axios.delete(`${API_URL}/user/${userId}/favorites`, { data: { entityType, entityId } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createItinerary: async (itineraryData) => {
    try {
      const response = await axios.post(`${API_URL}/itinerary`, itineraryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateItinerary: async (itineraryId, itineraryData) => {
    try {
      const response = await axios.put(`${API_URL}/itinerary/${itineraryId}`, itineraryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteItinerary: async (itineraryId) => {
    try {
      const response = await axios.delete(`${API_URL}/itinerary/${itineraryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;
