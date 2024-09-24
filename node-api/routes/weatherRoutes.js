const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route for getting weather data by city
router.get('/:city', weatherController.getWeatherByCity);

// Route for getting weather data by latitude and longitude
router.get('/:latitude/:longitude', weatherController.getWeatherByLatitudeAndLongitude)

module.exports = router;