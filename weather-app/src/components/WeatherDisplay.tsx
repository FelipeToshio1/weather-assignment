import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for weather data
interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
}

// Define the props for the component
interface WeatherDisplayProps {
  city: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Store weather data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        setLoading(true);
        try {
          const response = await axios.get<WeatherData>(
            `http://localhost:4000/weather/${encodeURIComponent(city)}`
          );
          setWeatherData(response.data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch weather data');
          setWeatherData(null);
        }
        setLoading(false);
      };

      fetchWeather();
    }
  }, [city]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {weatherData ? (
        <div className="weather-info">
          <h2>Weather in {weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature} °C</p>
          <p>Weather: {weatherData.weather}</p>
          <p>Humidity: {weatherData.humidity} %</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
