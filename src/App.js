import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherDisplay from "./components/WeatherDisplay";
import { fetchCurrentWeather, fetchForecastWeather } from "./services/weatherService";
import { debounce } from "lodash";

function App() {
  const [status, setStatus] = useState(null);
  const [apiData, setApiData] = useState({});
  const [apiDataForecast, setApiDataForecast] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = debounce(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      return;
    }

    setStatus("Locating...");
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await Promise.all([
            fetchCurrentWeather(latitude, longitude, setApiData),
            fetchForecastWeather(latitude, longitude, setApiDataForecast),
          ]);
          setStatus(null);
        } catch (error) {
          setStatus(error.message);
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setStatus("Unable to retrieve your location");
        setIsLoading(false);
      }
    );
  }, 500);

  return (
    <WeatherDisplay
      status={status}
      isLoading={isLoading}
      apiData={apiData}
      apiDataForecast={apiDataForecast}
      getLocation={getLocation}
    />
  );
}

export default App;
