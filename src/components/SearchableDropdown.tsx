import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import './SearchableDropdown.css';

interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  className?: string;
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  className = '',
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value) || null;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm('');
  };

  return (
    <div className={`searchable-dropdown ${className}`} ref={dropdownRef}>
      <div
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="dropdown-content">
          {isOpen ? (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dropdown-search"
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <span className={selectedOption ? 'dropdown-selected' : 'dropdown-placeholder'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
        </div>
        <div className="dropdown-actions">
          {selectedOption && !isOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="clear-button"
            >
              <X size={16} className="dropdown-icon" />
            </button>
          )}
          {isOpen ? (
            <Search size={20} className="dropdown-icon" />
          ) : (
            <ChevronDown size={20} className="dropdown-icon" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="dropdown-option"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="dropdown-no-options">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}