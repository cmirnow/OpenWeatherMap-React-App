const cache = {};

export const fetchWeatherData = async (url, setData) => {
  if (cache[url]) {
    setData(cache[url]);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    cache[url] = data; // Кэшируем данные
    setData(data);
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentWeather = (lat, lon, setApiData) => {
  const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  return fetchWeatherData(url, setApiData);
};

export const fetchForecastWeather = (lat, lon, setApiDataForecast) => {
  const url = `//api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
  return fetchWeatherData(url, setApiDataForecast);
};
