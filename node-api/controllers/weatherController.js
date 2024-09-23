const weatherService = require('../services/weatherService');

exports.getWeatherByCity = async (req, res) => {
    const city = req.params.city;

    try {
        const weatherData = await weatherService.fetchWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found, please check for typo' });
        } else {
            res.status(500).json({ message: 'Internal Server Error, please try again later' });
        }
    }
};