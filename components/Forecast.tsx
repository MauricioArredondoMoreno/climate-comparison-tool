import React from 'react';
import { ForecastDay } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: {
    forecastday: ForecastDay[];
  };
}

const ForecastDayCard: React.FC<{ day: ForecastDay }> = ({ day }) => {
  const date = new Date(day.date);
  // Adding timezone offset to prevent day-before issue
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-white/10 rounded-xl space-y-2 text-center text-white text-shadow-sm flex-shrink-0 w-28 sm:w-32">
      <p className="font-bold text-lg">{dayName}</p>
      <div className="w-12 h-12 sm:w-16 sm:h-16 my-2">
        <WeatherIcon code={day.day.condition.code} className="w-full h-full" />
      </div>
      <div className="flex gap-2 text-sm sm:text-base">
        <span className="font-semibold">{Math.round(day.day.maxtemp_c)}°</span>
        <span className="text-white/70">{Math.round(day.day.mintemp_c)}°</span>
      </div>
    </div>
  );
};

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
      <h3 className="text-xl font-bold mb-4 text-shadow">5-Day Forecast</h3>
      <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 -mb-4">
        {data.forecastday.map((day) => (
          <ForecastDayCard key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
