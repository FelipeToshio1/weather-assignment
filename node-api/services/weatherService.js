const axios = require('axios');
const API_KEY = process.env.OPENWEATHER_API_KEY;

exports.fetchWeatherData = async (cityName) => {

    // In the Url the variable q is for the cityName
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    // Retrieve data from api
    const response = await axios.get(url, {timeout: 5000});

    const weatherData = response.data;
    
    // Extract the relevant weather information for front-end usage
    return {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        weather: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
    };
};

exports.fetchWeatherDataFromLatitudeAndLongitude = async (latitude, longitude) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    // Retrieve data from api
    const response = await axios.get(url, {timeout: 5000});

    const weatherData = response.data;

    // Extract the relevant weather information for front-end usage
    return {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        weather: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
    };
};