import React, { useEffect, useState } from 'react';
import Autocomplete from './components/AutoComplete';
import WeatherDisplay from './components/WeatherDisplay';

import './App.css';
import { Login } from '@mui/icons-material';
import { getWeatherByLocation } from './services/WeatherService';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    if(!latitude && !longitude) return;
    
    try{
      let city = await getWeatherByLocation(latitude, longitude);
      setSelectedCity(city);
      setError(null);
    }catch (err){
      setError('Could not fetch weather data. Please try again.');
    }
  };
  
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          switch(err.code){
            case err.PERMISSION_DENIED:
              setError('User denied the request for Geolocation.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('Location information is unavailable.');
              break;
            case err.TIMEOUT:
              setError('The request to get user location timed out.');
              break;
            default:
              setError('An unknown error occurred.');
              break;
          }
        }
      )
    }else{
      setError('Geolocation is not supported by this browser.');
    }
  });

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>City Weather</h1>
      <Autocomplete onCitySelect={setSelectedCity} />
      {selectedCity && <WeatherDisplay city={selectedCity} />}
    </div>
  );
};

export default App;
