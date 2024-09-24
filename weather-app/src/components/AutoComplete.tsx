import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { TextField, Autocomplete as MUIAutoComp } from '@mui/material';

// Define the type for city suggestion data
interface CitySuggestion {
  name: string;
  country: string;
  region:string;
}

// Define the prop type for handling city selection
interface AutocompleteProps {
  onCitySelect: (city: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onCitySelect }) => {
  
  // Query typed by the user
  const [query, setQuery] = useState<string>('');
  // List of city suggestions
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]); 

  //Error handling
  const [error, setError] = useState<string | null>(null);

  // Fetch suggestions from the backend
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      let encondedCityName = encodeURIComponent(searchQuery);

      // making sure that the response is the same type of the state
      const response = await axios.get<CitySuggestion[]>(
          `http://localhost:4000/autocomplete?q=${encondedCityName}`
        );

      setSuggestions(response.data);

      //Clear previous errors if It has one
      setError(null);
    } catch (error) {
      console.error('Error fetching suggestions', error);
    }
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    //Basic validation for empty or short input, can be improved
    if(value.trim().length < 2){
      setError('City name must have more than two characters');
      setSuggestions([]);
    }else{
      //Clear error when It's correct
      setError(null);
      fetchSuggestions(value);
    }
  };

  // Handle city selection from suggestions
  const handleSelectCity = (cityName: string) => {
    if(cityName){
      onCitySelect(cityName); // Pass selected city to the parent component
      setQuery(cityName);
      setSuggestions([]);
      setError(null);
    } else {
      setError('City name invalid, make sure to select one from the list');
    }
  };

  return (
    <div style={{ margin: '20px'}}>
      <MUIAutoComp
        freeSolo
        options={ suggestions.map((suggestion) => `${suggestion.name}, ${suggestion.country}, ${suggestion.region}`)}
        renderInput={(params) => (
          <TextField
            {...params}
            label = "Search for a city"
            variant="outlined"
            onChange={handleInputChange}
            value = {query}
            error={Boolean(error)}
            helperText={error}
          />
        )}
        onInputChange={(event, newValue) => setQuery(newValue)}
        onChange = {(event, value) => handleSelectCity(value || '')}
        />
    </div>
  );
};

export default Autocomplete;