import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import FogComponent from "./components/FogComponent";
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";
import urid from "urid";

function App() {
  const [status, setStatus] = useState(null);
  const [apiData, setApiData] = useState({});
  const [apiDataForecast, setApiDataForecast] = useState({});

  async function fetchData(lat, lon) {
    await fetch(
      `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }

  async function fetchData1(lat, lon) {
    await fetch(
      `//api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setApiDataForecast(data));
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          fetchData(position.coords.latitude, position.coords.longitude);
          fetchData1(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <FogComponent>
      <div className="App">
        <ScrollToTop smooth color="#6666cc" />
        <span className="fixed-bottom badge bg-secondary link-action">
          <a
            alt="Masterpro Project"
            title="Masterpro Project"
            href="https://masterpro.ws/api-openweathermap-w3c-geolocation-api-reactjs"
            target="_blank"
            rel="noreferrer"
          >
            Masterpro Project
          </a>
        </span>
        <button
          onClick={getLocation}
          type="button"
          className="btn btn-light m-2"
        >
          Get Current Weather for Your Geo-Targeting
        </button>
        <p>{status}</p>
        {apiData?.coord?.lat && (
          <Table
            className="align-middle"
            bordered
            striped
            hover
            responsive
            variant="dark"
            size="sm"
          >
            <caption className="badge bg-secondary text-wrap">
              Calling OpenWeather APIs:{" "}
              {moment.unix(apiData?.dt).format("MMMM Do YYYY, h:mm:ss a")}
            </caption>
            <tbody>
              <tr>
                <th scope="col"> Current Weather Conditions</th>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiData?.weather?.[0].icon}.png`}
                    alt={apiData?.weather?.[0].main}
                    title={apiData?.weather?.[0].main}
                  />
                </td>
              </tr>
              <tr>
                <th scope="col">Area</th>
                <td>{apiData?.name}</td>
              </tr>
              <tr>
                <th scope="col">Country</th>
                <td>{apiData?.sys?.country}</td>
              </tr>
              <tr>
                <th scope="col">
                  Geographical coordinates (latitude, longitude)
                </th>
                <td>{[apiData?.coord?.lat, ",  ", apiData?.coord?.lon]}</td>
              </tr>
              <tr>
                <th scope="col">Description</th>
                <td>{apiData?.weather?.[0].description}</td>
              </tr>
              <tr>
                <th scope="col">Temperature</th>
                <td>{apiData?.main?.temp} &deg;C</td>
              </tr>
              <tr>
                <th scope="col">
                  Temperature (the human perception of weather)
                </th>
                <td>{apiData?.main?.feels_like} &deg;C</td>
              </tr>
              <tr>
                <th scope="col">Min, Max Temperature</th>
                <td>
                  {apiData?.main?.temp_min} &deg;C, {apiData?.main?.temp_max}{" "}
                  &deg;C
                </td>
              </tr>
              <tr>
                <th scope="col">Pressure</th>
                <td>{apiData?.main?.pressure} hPa</td>
              </tr>
              <tr>
                <th scope="col">Humidity</th>
                <td>{apiData?.main?.humidity} %</td>
              </tr>
              <tr>
                <th scope="col">Visibility</th>
                <td>{apiData?.visibility} meters</td>
              </tr>
              <tr>
                <th scope="col">Wind</th>
                <td>{apiData?.wind?.speed} meter/sec</td>
              </tr>
              <tr>
                <th scope="col">Clouds</th>
                <td>{apiData?.clouds?.all} %</td>
              </tr>
              <tr>
                <th scope="col">Sunrise, Sunset</th>
                <td>
                  {moment.unix(apiData?.sys?.sunrise).format("hh:mm a")},{" "}
                  {moment.unix(apiData?.sys?.sunset).format("hh:mm a")}
                </td>
              </tr>
            </tbody>
          </Table>
        )}

        {apiData?.coord?.lat &&
          [apiDataForecast].map((dataIn) => {
            return (
              <Table
                key={urid()}
                className="align-middle text-center"
                bordered
                striped
                hover
                responsive
                variant="dark"
                size="sm"
              >
                <thead className="align-middle" key={urid()}>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Day Temperature (&deg;C)</th>
                    <th scope="col">Night Temperature &deg;C</th>
                    <th scope="col">Pressure (hPa)</th>
                    <th scope="col">Humidity (%)</th>
                    <th scope="col">Wind (meter/sec)</th>
                    <th scope="col">Probability of precipitation</th>
                    <th scope="col">Description</th>
                    <th scope="col">Weather conditions</th>
                  </tr>
                </thead>
                <tbody key={urid()}>
                  {dataIn?.list?.map((list) => (
                    <tr key={urid()}>
                      <td>{moment.unix(list?.dt).format("MMMM Do YYYY")}</td>
                      <td>{list?.temp?.day}</td>
                      <td>{list?.temp?.night}</td>
                      <td>{list?.pressure}</td>
                      <td>{list?.humidity}</td>
                      <td>{list?.speed}</td>
                      <td>{list?.pop}</td>
                      <td>{list?.weather?.[0].description}</td>
                      <td>
                        <img
                          src={`//openweathermap.org/img/w/${list?.weather?.[0].icon}.png`}
                          alt={list?.weather?.[0].main}
                          title={list?.weather?.[0].main}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            );
          })}
      </div>
    </FogComponent>
  );
}

export default App;
