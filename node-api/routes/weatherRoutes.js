const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route for getting weather data by city
router.get('/:city', weatherController.getWeatherByCity);

module.exports = router;