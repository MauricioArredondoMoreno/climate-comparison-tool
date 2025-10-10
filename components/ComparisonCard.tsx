import React from 'react';
import { WeatherData } from '../types';
import Loader from './Loader';
import WeatherIcon from './WeatherIcon';
import WeatherInfo from './WeatherInfo';

interface ComparisonCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  defaultText: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ weatherData, loading, error, defaultText }) => {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-2xl w-full flex justify-center items-center h-full min-h-[300px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/50 backdrop-blur-sm rounded-2xl p-6 text-white shadow-2xl w-full flex flex-col justify-center items-center text-center h-full min-h-[300px]">
        <h3 className="font-bold text-lg">Error</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white/50 shadow-2xl w-full flex justify-center items-center text-center h-full min-h-[300px]">
        <p>{defaultText}</p>
      </div>
    );
  }

  const { location, current } = weatherData;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-2xl w-full h-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-shadow">{location.name}</h2>
        <p className="text-white/80 text-shadow-sm">{location.country}</p>
      </div>

      <div className="flex justify-center items-center my-4">
        <div className="w-24 h-24">
          <WeatherIcon code={current.condition.code} className="w-full h-full" />
        </div>
        <p className="text-6xl font-bold text-shadow ml-4">{Math.round(current.temp_c)}°C</p>
      </div>

      <div className="text-center text-lg text-white/90 text-shadow-sm mb-6">
        <p>{current.condition.text}</p>
        <p>Feels like {Math.round(current.feelslike_c)}°C</p>
      </div>

      <div className="space-y-4">
        <WeatherInfo label="Humidity" value={`${current.humidity}%`} icon="humidity" />
        <WeatherInfo label="Wind Speed" value={`${current.wind_kph} kph`} icon="wind" />
      </div>
    </div>
  );
};

export default ComparisonCard;