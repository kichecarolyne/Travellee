// src/components/Weather.js

import React, { useState } from 'react';

const Weather = () => {
  const [latitude, setLatitude] = useState('42.98');
  const [longitude, setLongitude] = useState('-81.23');

  const fetchWeather = () => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Weather data:', data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(2));
        setLongitude(position.coords.longitude.toFixed(2));
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  };

  return (
    <div>
      <h2>Weather Update</h2>
      <div className="container">
        <div className="row align-items-center py-2">
          <div className="input-group col-sm">
            <span className="input-group-text" id="basic-addon1">
              Lat
            </span>
            <input
              type="text"
              className="form-control"
              inputMode="numeric"
              placeholder="latitude"
              aria-label="latitude"
              aria-describedby="basic-addon1"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-group col-sm">
            <span className="input-group-text" id="basic-addon1">
              Lon
            </span>
            <input
              type="text"
              className="form-control"
              inputMode="numeric"
              placeholder="longitude"
              aria-label="longitude"
              aria-describedby="basic-addon1"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <div className="row align-items-center py-2">
          <div className="col-auto me-auto">
            <button
              id="btnGet"
              type="button"
              className="btn btn-primary mb-3"
              onClick={fetchWeather}
            >
              Get Weather
            </button>
            <button
              id="btnCurrent"
              type="button"
              className="btn btn-primary mb-3"
              onClick={getLocation}
            >
              Use Current Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
