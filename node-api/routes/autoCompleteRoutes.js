const express = require('express');
const router = express.Router();
const autocompleteController = require('../controllers/autocompleteController');

// Route to get city autocomplete suggestions
router.get('/', autocompleteController.getCityAutocomplete);

module.exports = router;
