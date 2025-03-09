const cache = {
  current: { data: null, timestamp: 0 },
  forecast: { data: null, timestamp: 0 },
};

const CACHE_TTL = 60 * 60 * 1000; // 1 hour milliseconds

export const fetchWeatherData = async (url, setData, cacheKey) => {
  const now = Date.now();

  // If there is data in the cache and it is not older than 1 hour, we use it
  if (cache[cacheKey].data && now - cache[cacheKey].timestamp < CACHE_TTL) {
    setData(cache[cacheKey].data);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    // Save data to cache with the current timestamp
    cache[cacheKey].data = data;
    cache[cacheKey].timestamp = now;
    setData(data);
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentWeather = (lat, lon, setApiData) => {
  const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  return fetchWeatherData(url, setApiData, "current");
};

export const fetchForecastWeather = (lat, lon, setApiDataForecast) => {
  const url = `//api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  return fetchWeatherData(url, setApiDataForecast, "forecast");
};
