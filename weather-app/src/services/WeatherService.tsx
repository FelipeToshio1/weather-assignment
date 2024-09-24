import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
}

export const getWeatherByLocation = async (lat: number, lng: number): Promise<string> => {

  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.get<WeatherData>(`${apiUrl}/weather/${lat}/${lng}`);

    return response.data.city;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
