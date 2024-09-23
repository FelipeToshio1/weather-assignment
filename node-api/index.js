require('dotenv').config();

const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/weather', weatherRoutes);
app.use('/api/autocomplete', autocompleteRoutes);

app.get( '/', (req,res) => {
    res.send('Weather API - please use the /weather/{searchedCityName} to get the city weather data');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});