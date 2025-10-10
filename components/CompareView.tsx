import React, { useState, useCallback } from 'react';
import { WeatherData } from '../types';
import { fetchWeather } from '../services/weatherService';
import SearchBar from './SearchBar';
import ComparisonCard from './ComparisonCard';

const CompareView: React.FC = () => {
  const [weather1, setWeather1] = useState<WeatherData | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [error1, setError1] = useState<string | null>(null);

  const [weather2, setWeather2] = useState<WeatherData | null>(null);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState<string | null>(null);

  const getWeather = useCallback(async (
    city: string, 
    setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch1 = (city: string) => {
    getWeather(city, setWeather1, setLoading1, setError1);
  };

  const handleSearch2 = (city: string) => {
    getWeather(city, setWeather2, setLoading2, setError2);
  };

  return (
    <div className="space-y-8">
      {/* Search Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-xl font-bold text-white text-shadow mb-2 text-center md:text-left">City 1</h2>
          <SearchBar onSearch={handleSearch1} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white text-shadow mb-2 text-center md:text-left">City 2</h2>
          <SearchBar onSearch={handleSearch2} />
        </div>
      </div>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <ComparisonCard 
          weatherData={weather1} 
          loading={loading1} 
          error={error1} 
          defaultText="Search for the first city to compare." 
        />
        <ComparisonCard 
          weatherData={weather2} 
          loading={loading2} 
          error={error2} 
          defaultText="Search for the second city to compare." 
        />
      </div>
    </div>
  );
};

export default CompareView;