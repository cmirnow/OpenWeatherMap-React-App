import React, { memo, useMemo, Suspense } from "react";
import FogComponent from "./FogComponent";
import Footer from "../Footer";
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";

const CurrentWeatherTable = React.lazy(() => import("./CurrentWeatherTable"));
const ForecastWeatherTable = React.lazy(() => import("./ForecastWeatherTable"));

const WeatherDisplay = memo(({ status, isLoading, apiData, apiDataForecast, getLocation }) => {
  const formattedCurrentDate = useMemo(
    () => (apiData.dt ? moment.unix(apiData.dt).format("MMMM Do YYYY, h:mm:ss a") : ""),
    [apiData.dt]
  );

  const formattedSunrise = useMemo(
    () => (apiData.sys?.sunrise ? moment.unix(apiData.sys.sunrise).format("hh:mm a") : ""),
    [apiData.sys?.sunrise]
  );

  const formattedSunset = useMemo(
    () => (apiData.sys?.sunset ? moment.unix(apiData.sys.sunset).format("hh:mm a") : ""),
    [apiData.sys?.sunset]
  );

  const forecastRows = useMemo(
    () =>
      apiDataForecast.list?.map((list) => ({
        ...list,
        formattedDate: moment.unix(list.dt).format("MMMM Do YYYY"),
      })) || [],
    [apiDataForecast.list]
  );

  return (
    <FogComponent>
      <div className="App">
        <button
          onClick={getLocation}
          type="button"
          className="btn btn-light m-2"
          disabled={isLoading}
        >
          Get Current Weather for Your Geo-Targeting
        </button>
        {isLoading ? (
          <p>Loading weather data...</p>
        ) : (
          <>
            {status && <p>{status}</p>}
            <Suspense fallback={<p>Loading weather tables...</p>}>
              {apiData.coord?.lat && (
                <CurrentWeatherTable
                  apiData={apiData}
                  formattedCurrentDate={formattedCurrentDate}
                  formattedSunrise={formattedSunrise}
                  formattedSunset={formattedSunset}
                />
              )}
              {apiData.coord?.lat && <ForecastWeatherTable forecastRows={forecastRows} />}
            </Suspense>
          </>
        )}
        <Footer />
        <ScrollToTop smooth color="#6666cc" />
      </div>
    </FogComponent>
  );
});

export default WeatherDisplay;
