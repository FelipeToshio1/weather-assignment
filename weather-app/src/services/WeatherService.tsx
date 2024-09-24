import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
}

export const getWeatherByLocation = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await axios.get<WeatherData>(`http://localhost:4000/weather/${lat}/${lng}`);

    return response.data.city;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
