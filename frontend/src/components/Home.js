import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Footer from './Footer';
import './Home.css';


const Home = () => {

  // Weather data state and loading state
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch weather data using OpenWeatherMap API
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
  
      let response;
  
      try {
        if (!apiKey) {
          throw new Error('API key not provided.');
        }
  
        const city = 'New York';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
        response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${city}. Status: ${response.status}`);
        }
  
        const data = await response.json();
        setWeatherData([data]);
        setError('');
      } catch (error) {
        console.error('Error fetching weather data:', error);
        console.error('API Response:', await response.text());
        setError('Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchWeatherData();
  }, [apiKey]);
  
  // Destinations
  const destinations = [
    {
      id: 1,
      image: 'https://i.imgur.com/RWRahAQ.png',
      title: 'The Colosseum',
      description: 'The largest ancient amphitheater ever built, and is still the largest standing amphitheater in the world, despite its age',
      location: 'Rome',
      category: 'Historical site',
    },
    {
      id: 2,
      image: 'https://i.imgur.com/aTFVie9.png',
      title: 'Zanzibar Beaches',
      description: 'Zanzibar Island is one of the top beach holiday destinations in the world raked as the number one in Africa.',
      location: 'Zanzibar',
      category: 'Beach',
    },
    {
      id: 3,
      image: 'https://i.imgur.com/f8GBuyu.png',
      title: 'Maasai Mara',
      description: 'World famous for hosting the epic Great Migration, the Masai Mara welcomes 1.5 million wildebeests onto its sprawling savannahs each July through October.',
      location: 'Kenya',
      category: 'Wildlife',
    },
  ];

// Hotels
  const hotels = [
    {
      id: 4,
      image: 'https://i.imgur.com/SGviteB.png',
      title: 'Four Seasons Hotel',
      description: 'A luxury hotel and a soothing oasis of superb interiors right in the heart of the City.',
      location: 'Mexico',
      category: 'Hotel',
    },
    {
      id: 5,
      image: 'https://i.imgur.com/86Z7TRk.png',
      title: 'Hotel Hanalei',
      description: 'Enjoy plenty of special experiences throughout your stay at no extra cost.',
      location: 'Hawaii',
      category: 'Resort',
    },
    {
      id: 6,
      image: 'https://i.imgur.com/TWB5YBN.png',
      title: 'Cottar Camp',
      description: 'The 1920s Camp provides the romance of safari under cream canvas tents.',
      location: 'Kenya',
      category: 'Camp',
    },
  ];

// Recommended
  const recommended = [
    {
      id: 7,
      image: 'https://i.imgur.com/qgIKulE.png',
      title: 'Mount Cook',
      description: 'It is alpine in the purest sense - with skyscraping peaks, glaciers and permanent snow fields, all set under a star-studded sky.',
      location: 'New Zealand',
      category: 'Camping',
    },
    {
      id: 8,
      image: 'https://i.imgur.com/0rpPz5p.png',
      title: 'Whistler',
      description: 'A pedestrian-friendly Village is nestled at the base of the Whistler Blackcomb Mountains and the allure of imminent adventure amplifies its festive atmosphere.',
      location: 'British Columbia',
      category: 'Skiing',
    },
    {
      id: 9,
      image: 'https://i.imgur.com/Z9b6dvz.png',
      title: 'Dubai',
      description: 'The city is increasingly in demand as a luxury tourist destination for travelers from all corners of the globe.',
      location: 'UAE',
      category: 'Cultural site',
    },
  ];

  return (
    <div>
      <h2 className="explore-title">Explore Top Destinations For Your Next Adventure</h2>
      <div className="product-grid-container">
        {destinations.map((destination) => (
          <div key={destination.id} className="grid-item">
            <img src={destination.image} alt={destination.title} />
            <h3>{destination.title}</h3>
            <p>{destination.description}</p>
          </div>
        ))}
      </div>

      <h2 className="explore-title">Discover Luxury Hotels</h2>
      <div className="product-grid-container">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="grid-item">
            <img src={hotel.image} alt={hotel.title} />
            <h3>{hotel.title}</h3>
            <p>{hotel.description}</p>
          </div>
        ))}
      </div>

      <h2 className="explore-title">Recommendations For You</h2>
      <div className="product-grid-container">
        {recommended.map((recommended) => (
          <div key={recommended.id} className="grid-item">
            <img src={recommended.image} alt={recommended.title} />
            <h3>{recommended.title}</h3>
            <p>{recommended.description}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Weather data={weatherData} />
      )}

      {window.location.pathname === '/' && <Footer className="footer" />}
    </div>
  );
};

export default Home;
