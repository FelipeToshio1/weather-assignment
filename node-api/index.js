require('dotenv').config();

const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const autocompleteRoutes = require('./routes/autocompleteRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use('/weather', weatherRoutes);
app.use('/autocomplete', autocompleteRoutes);

app.get( '/', (req,res) => {
    res.send('Weather API - please use the /weather/{searchedCityName} to get the city weather data');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});