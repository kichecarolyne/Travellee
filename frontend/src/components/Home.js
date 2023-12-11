// Home.js
import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      // Assuming you have an array of cities for which you want weather data
      const cities = ['Peru', 'New York', 'Kenya'];
      
      const promises = cities.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${city}`);
          }
          
          const data = await response.json();
          return {
            id: data.id,
            title: city,
            image: 'path/to/weather-image.jpg', // Replace with the actual image path
            description: `Temperature: ${data.main.temp}°C, Description: ${data.weather[0].description}`,
          };
        } catch (error) {
          console.error(`Error fetching weather data for ${city}:`, error);
          return null;
        }
      });
  
      try {
        const weatherResults = await Promise.all(promises);
        setWeatherData(weatherResults.filter(Boolean)); // Filter out null results
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    fetchWeatherData();
  }, [apiKey]);
  

  // ... (unchanged)
  
  
  
  const destinations = [
    {
      id: 1,
      title: 'Destination 1',
      image: 'path/to/destination1.jpg',
      description: 'Description for Destination 1',
      category: 'Destinations',
    },
    {
      id: 2,
      title: 'Destination 2',
      image: 'path/to/destination2.jpg',
      description: 'Description for Destination 2',
      category: 'Destinations',
    },
    {
      id: 3,
      title: 'Destination 3',
      image: 'path/to/destination3.jpg',
      description: 'Description for Destination 3',
      category: 'Destinations',
    },
    // Add more destinations as needed
  ];

  const hotels = [
    {
      id: 4,
      title: 'Hotel 1',
      image: 'path/to/hotel1.jpg',
      description: 'Description for Hotel 1',
      category: 'Hotels',
    },
    {
      id: 5,
      title: 'Hotel 2',
      image: 'path/to/hotel2.jpg',
      description: 'Description for Hotel 2',
      category: 'Hotels',
    },
    {
      id: 6,
      title: 'Hotel 3',
      image: 'path/to/hotel3.jpg',
      description: 'Description for Hotel 3',
      category: 'Hotels',
    },
    // Add more hotels as needed
  ];

  const recommended = [
    {
      id: 7,
      title: 'Recommended 1',
      image: 'path/to/recommended1.jpg',
      description: 'Description for Recommended 1',
      category: 'Recommended',
    },
    {
      id: 8,
      title: 'Recommended 2',
      image: 'path/to/recommended2.jpg',
      description: 'Description for Recommended 2',
      category: 'Recommended',
    },
    {
      id: 9,
      title: 'Recommended 3',
      image: 'path/to/recommended3.jpg',
      description: 'Description for Recommended 3',
      category: 'Recommended',
    },
    // Add more recommended products as needed
  ];

  return (
      <div>
        <h2>Explore Amazing Destinations</h2>
        <div className="product-grid-container">
          <ProductGrid products={destinations} itemsPerPage={3} showPagination={false} />
        </div>
  
        <h2>Explore Luxury Hotels</h2>
        <div className="product-grid-container">
          <ProductGrid products={hotels} itemsPerPage={3} showPagination={false} />
        </div>
  
        <h2>Recommended</h2>
        <div className="product-grid-container">
          <ProductGrid products={recommended} itemsPerPage={3} showPagination={false} />
        </div>
  
        <h2>Weather Update</h2>
        <div className="product-grid-container">
          <ProductGrid products={weatherData} itemsPerPage={3} showPagination={false} />
        </div>
      </div>
    );
  };
  
  export default Home;