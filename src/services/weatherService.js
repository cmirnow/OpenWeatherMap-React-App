const cache = {
  current: {}, // Cache for current weather: key - string “lat, lon”, value - { data, timestamp }
  forecast: {}, // Forecast cache: key - string “lat, lon”, value - { data, timestamp }
};

const CACHE_TTL = 60 * 60 * 1000; // 1 hour milliseconds

export const fetchWeatherData = async (url, setData, cacheType, lat, lon) => {
  const cacheKey = `${lat},${lon}`; // Unique key for each coordinate pair
  const now = Date.now();

  // If there is data in the cache and it is not older than 1 hour, we use it
  if (
    cache[cacheType][cacheKey] &&
    cache[cacheType][cacheKey].data &&
    now - cache[cacheType][cacheKey].timestamp < CACHE_TTL
  ) {
    setData(cache[cacheType][cacheKey].data);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    // Save data to cache with the current timestamp
    cache[cacheType][cacheKey] = {
      data,
      timestamp: now,
    };
    setData(data);
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentWeather = (lat, lon, setApiData) => {
  const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  return fetchWeatherData(url, setApiData, "current", lat, lon);
};

export const fetchForecastWeather = (lat, lon, setApiDataForecast) => {
  const url = `//api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  return fetchWeatherData(url, setApiDataForecast, "forecast", lat, lon);
};
