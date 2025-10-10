import React from 'react';
import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';
import WeatherInfo from './WeatherInfo';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { location, current } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left side: Location & Temp */}
        <div className="flex-grow">
          <h2 className="text-3xl sm:text-4xl font-bold text-shadow">{location.name}, {location.country}</h2>
          <p className="text-white/80 text-shadow-sm">{formatDate(location.localtime)}</p>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-6xl sm:text-8xl font-bold text-shadow">{Math.round(current.temp_c)}°C</p>
            <div className="text-lg text-white/90 text-shadow-sm">
              <p>{current.condition.text}</p>
              <p>Feels like {Math.round(current.feelslike_c)}°C</p>
            </div>
          </div>
        </div>

        {/* Middle: Weather Icon */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 self-center md:self-start">
          <WeatherIcon code={current.condition.code} className="w-full h-full" />
        </div>

        {/* Right side: Details */}
        <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-col gap-4 bg-white/10 p-4 rounded-lg">
          <WeatherInfo label="Humidity" value={`${current.humidity}%`} icon="humidity" />
          <WeatherInfo label="Wind Speed" value={`${current.wind_kph} kph`} icon="wind" />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
