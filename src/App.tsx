import React, { useState } from 'react';
import { SearchableDropdown } from './components/SearchableDropdown';
import './components/SearchableDropdown.css';

interface Option {
  value: string;
  label: string;
}

const sampleOptions: Option[] = [
  { value: '1', label: 'React' },
  { value: '2', label: 'Vue' },
  { value: '3', label: 'Angular' },
  { value: '4', label: 'Svelte' },
  { value: '5', label: 'Next.js' },
  { value: '6', label: 'Nuxt.js' },
  { value: '7', label: 'Gatsby' },
  { value: '8', label: 'Remix' },
];

function App() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const selectedOption = sampleOptions.find(option => option.value === selectedValue);

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Searchable Dropdown Demo</h1>
        
        <div className="demo-card">
          <label className="form-label">
            Select Framework
          </label>
          
          <SearchableDropdown
            options={sampleOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Choose a framework..."
          />

          {selectedOption && (
            <p className="selected-info">
              Selected: <span className="selected-value">{selectedOption.label}</span> (Value: {selectedValue})
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;