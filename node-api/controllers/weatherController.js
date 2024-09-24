const weatherService = require('../services/weatherService');

exports.getWeatherByCity = async (req, res) => {
    const city = req.params.city;

    if(!city || city.trim() === ''){
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const weatherData = await weatherService.fetchWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found, please check for typo' });
        }else if(error.response && error.response.status === 429) {
            return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error, please try again later' });
        }
    }
};

exports.getWeatherByLatitudeAndLongitude = async (req,res) => {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;

    if(!latitude || !longitude){
        return res.status(400).json({error: "Latitude and Longitude are required"});
    }

    try{
        const weatherData = await weatherService.fetchWeatherDataFromLatitudeAndLongitude(latitude, longitude);
        res.json(weatherData)
    }catch(error){
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found' });
        }else if(error.response && error.response.status === 429) {
            return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error, please try again later' });
        }
    }
}