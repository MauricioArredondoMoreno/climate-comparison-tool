import { WeatherData, WeatherConditionCode, ForecastDay } from './types';

// OWM API response types (simplified for our use case)
interface OWMCurrentWeather {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number; // m/s
  };
  dt: number;
  sys: {
    country: string;
  };
  name: string;
  timezone: number;
}

interface OWMForecastListItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

interface OWMForecast {
  list: OWMForecastListItem[];
}

const mapIconToConditionCode = (icon: string): WeatherConditionCode => {
  const code = icon.substring(0, 2);
  switch (code) {
    case '01':
      return 'sunny';
    case '02':
      return 'partly-cloudy';
    case '03':
    case '04':
      return 'cloudy';
    case '09':
    case '10':
      return 'rain';
    case '11':
      return 'storm';
    case '13':
      return 'snow';
    case '50':
      return 'fog';
    default:
      return 'cloudy';
  }
};


export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const apiKey = '80b9d185ee701a87aed150244cd0f706';

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentWeatherRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentWeatherRes.ok) {
        if (currentWeatherRes.status === 404) {
            throw new Error(`City not found: ${city}`);
        }
        const errorData = await currentWeatherRes.json();
        throw new Error(`Failed to fetch current weather: ${errorData.message || currentWeatherRes.statusText}`);
    }
     if (!forecastRes.ok) {
        const errorData = await forecastRes.json();
        throw new Error(`Failed to fetch forecast: ${errorData.message || forecastRes.statusText}`);
    }

    const currentData: OWMCurrentWeather = await currentWeatherRes.json();
    const forecastData: OWMForecast = await forecastRes.json();
    
    // Process forecast data to get one entry per day
    const dailyForecasts: { [key: string]: { temps: number[], conditions: OWMForecastListItem[] } } = {};

    forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = { temps: [], conditions: [] };
        }
        dailyForecasts[date].temps.push(item.main.temp_min, item.main.temp_max);
        dailyForecasts[date].conditions.push(item);
    });

    const processedForecast: ForecastDay[] = Object.keys(dailyForecasts).slice(0, 5).map(date => {
        const dayData = dailyForecasts[date];
        const minTemp = Math.min(...dayData.temps);
        const maxTemp = Math.max(...dayData.temps);
        
        // Use the condition from midday if available, otherwise first available
        const middayCondition = dayData.conditions.find(c => c.dt_txt.includes("12:00:00")) || dayData.conditions[0];

        return {
            date: date,
            day: {
                maxtemp_c: maxTemp,
                mintemp_c: minTemp,
                condition: {
                    text: middayCondition.weather[0].description,
                    code: mapIconToConditionCode(middayCondition.weather[0].icon),
                },
            },
        };
    });

    const localTime = new Date((currentData.dt + currentData.timezone) * 1000).toISOString();

    const transformedData: WeatherData = {
      location: {
        name: currentData.name,
        country: currentData.sys.country,
        localtime: localTime,
      },
      current: {
        temp_c: currentData.main.temp,
        feelslike_c: currentData.main.feels_like,
        condition: {
          text: currentData.weather[0].description.replace(/\b\w/g, l => l.toUpperCase()),
          code: mapIconToConditionCode(currentData.weather[0].icon),
        },
        wind_kph: Math.round(currentData.wind.speed * 3.6),
        humidity: currentData.main.humidity,
        uv: 0, // Not available in this API tier
      },
      forecast: {
        forecastday: processedForecast,
      },
    };
    return transformedData;
  } catch (error) {
    if (error instanceof Error) {
        console.error("Weather service error:", error.message);
        throw error;
    }
    throw new Error('An unknown network error occurred.');
  }
};