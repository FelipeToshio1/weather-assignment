import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

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

  // Fetch suggestions from the backend
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length > 2) {
      try {

        let encondedCityName = encodeURIComponent(searchQuery);

        // making sure that the response is the same type of the state
        const response = await axios.get<CitySuggestion[]>(
            `http://localhost:4000/autocomplete?q=${encondedCityName}`
          );

        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  // Handle city selection from suggestions
  const handleSelectCity = (cityName: string) => {
    setQuery(cityName);
    setSuggestions([]);
    onCitySelect(cityName); // Pass selected city to the parent component
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 2 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectCity(suggestion.name)}>
              {suggestion.name}, {suggestion.country}, {suggestion.region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;