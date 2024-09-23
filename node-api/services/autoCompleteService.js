const axios = require('axios');
const GEODB_API_KEY = process.env.GEODB_API_KEY;

exports.fetchCitySuggestions = async (query) => {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&types=CITY&limit=5`;

    //adding authorization headers
    const options = {
        headers: {
            'X-RapidAPI-Key': GEODB_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    const response = await axios.get(url, options);

    //mapping a list of city suggestion
    return response.data.data.map(city => ({
        name: city.name,
        country: city.country,
        region: city.region
    }));
};