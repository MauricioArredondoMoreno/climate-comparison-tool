
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full pl-4 pr-12 py-2.5 text-white bg-white/10 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm transition duration-300 placeholder-white/60"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-white/80 hover:text-white transition duration-300"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
