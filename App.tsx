import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData } from './types';
import { fetchWeather } from './services/weatherService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import CompareView from './components/CompareView';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Tokyo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'single' | 'compare'>('single');

  const getWeather = useCallback(async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(location);
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

  useEffect(() => {
    getWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    getWeather(searchCity);
  };

  const getBackgroundGradient = () => {
    if (!weather && view === 'single') return 'from-gray-500 to-gray-700';
    if (view === 'compare') return 'from-gray-800 to-black';
    if (!weather) return 'from-gray-500 to-gray-700';
    
    const hour = new Date(weather.location.localtime).getHours();
    
    if (hour >= 5 && hour < 12) { // Morning
      return 'from-sky-400 to-blue-500';
    }
    if (hour >= 12 && hour < 18) { // Afternoon
      return 'from-blue-500 to-indigo-600';
    }
    if (hour >= 18 && hour < 21) { // Evening
      return 'from-indigo-600 to-purple-800';
    }
    // Night
    return 'from-gray-800 to-black';
  };

  const ToggleViewButton: React.FC = () => (
    <button
      onClick={() => setView(view === 'single' ? 'compare' : 'single')}
      className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-full border border-white/20 hover:bg-white/20 backdrop-blur-sm transition duration-300"
    >
      {view === 'single' ? 'Compare Cities' : 'Back to Single View'}
    </button>
  );

  return (
    <div className={`min-h-screen w-full font-sans transition-all duration-1000 bg-gradient-to-br ${getBackgroundGradient()}`}>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white text-shadow">Pro Weather</h1>
            <ToggleViewButton />
          </div>
          {view === 'single' && <SearchBar onSearch={handleSearch} />}
        </header>

        {view === 'single' ? (
          <>
            {loading && <Loader />}
            
            {error && (
              <div className="bg-red-500/50 text-white p-4 rounded-lg text-center backdrop-blur-sm">
                <h2 className="font-bold text-xl mb-2">Error</h2>
                <p>{error}</p>
              </div>
            )}

            {weather && !loading && !error && (
              <div className="space-y-8">
                <CurrentWeather data={weather} />
                <Forecast data={weather.forecast} />
              </div>
            )}
          </>
        ) : (
          <CompareView />
        )}
      </main>
      <footer className="text-center py-4 text-white/50 text-sm">
        <p>made by Mauricio Arredondo</p>
      </footer>
    </div>
  );
};

export default App;