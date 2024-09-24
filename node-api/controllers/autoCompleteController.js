const autocompleteService = require('../services/autoCompleteService');

exports.getCityAutocomplete = async (req, res) => {
    const query = req.query.q;

    // check null parameter
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const suggestions = await autocompleteService.fetchCitySuggestions(query);
        res.json(suggestions);
    } catch (error) {
        if(error.response && error.response.status === 404){
            res.status(404).json({ message: 'City not found, please check for typo' });
        }else{
            res.status(500).json({ message: 'Error fetching city suggestions' });
        }
    }
};