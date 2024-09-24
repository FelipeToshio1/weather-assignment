import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardContent, Typography, Grid2, Alert} from '@mui/material';

//@ts-ignore
import { WiDaySunny, WiCloud, WiRain, WiStrongWind, WiHumidity, WiDaySnow, WiFog, WiDayThunderstorm, WiDayShowers, WiAlien } from 'weather-icons-react';

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
    if (!city) return;
    
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get<WeatherData>(
          `${apiUrl}/weather/${encodeURIComponent(city)}`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError('Error trying to get weather data. Please Try Again later');
        setWeatherData(null);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <Alert severity='error'>{error}</Alert>;

  const weatherIconHandler = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear sky': 
        return <WiDaySunny size= {64} color= "#f39c12"/>
      
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <WiCloud size={64} color="#95a5a6"/>

      case 'shower rain':
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'freezing rain':
      case 'light intensity shower rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
        return <WiRain size={64} color="#3498db" />;
      
      case 'snow':
      case 'light snow':
      case 'heavy snow':
      case 'sleet':
      case 'light shower sleet':
      case 'shower sleet':
      case 'light rain and snow':
      case 'rain and snow':
      case 'light shower snow':
      case 'shower snow':
      case 'heavy shower snow':
        return <WiDaySnow size={64} color= "#99CCFF" />
      
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'fog':
      case 'volcanic ash':
        return <WiFog size= {64} color ="#BB99FF"/>
      
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
      case 'light thunderstorm':
      case 'thunderstorm':
      case 'heavy thunderstorm':
      case 'ragged thunderstorm':
      case 'thunderstorm with light drizzle':
      case 'thunderstorm with drizzle':
      case 'thunderstorm with heavy drizzle':
        return <WiDayThunderstorm size= {64} color="#00004D" />
      
      case 'light intensity drizzle':
      case 'drizzle':
      case 'heavy intensity drizzle':
      case 'light intensity drizzle rain':
      case 'drizzle rain':
      case 'heavy intensity drizzle rain':
      case 'shower rain and drizzle':
      case 'heavy shower rain and drizzle':
      case 'shower drizzle':
        return <WiDayShowers size={64} color="#7733FF" />
      
      default:
        return <WiAlien size={64} color="#0D4D00" />;
    }
  }

  return (
    weatherData ? 
      (<Card style= {{maxWidth: '400px', margin: '20px auto'}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {weatherData?.city}
          </Typography>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2>{weatherIconHandler(weatherData?.weather || 'sunny')}</Grid2>
            <Grid2>
              <Typography variant="h2">{weatherData?.temperature}ºC</Typography>
            </Grid2>
          </Grid2>
          <Typography variant='body2'>
            Humidity: {weatherData?.humidity}% <WiHumidity size={24} />
          </Typography>
          <Typography variant='body2'>
            Wind Speed: {weatherData?.windSpeed} m/s <WiStrongWind size={24} />
          </Typography>
        </CardContent>
      </Card>) : null
  );
};

export default WeatherDisplay;
