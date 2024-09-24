import React, { useState } from 'react';
import Autocomplete from './components/AutoComplete';
import WeatherDisplay from './components/WeatherDisplay';

import './App.css';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  return (
    <div className="app">
      <h1>City Weather</h1>
      <Autocomplete onCitySelect={setSelectedCity} />
      {selectedCity && <WeatherDisplay city={selectedCity} />}
    </div>
  );
};

export default App;
