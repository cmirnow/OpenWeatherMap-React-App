import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import moment from "moment";
import FogComponent from "./components/FogComponent";
import ScrollToTop from "react-scroll-to-top";

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
      `//api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=9&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
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
              {moment.unix(apiData?.dt).format("MMMM Do YYYY, h:mm:ss a")}
            </caption>
            <tbody>
              <tr>
                <th scope="col">Average Weather</th>
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
        {apiData?.coord?.lat && (
          <Table
            className="align-middle text-center"
            bordered
            striped
            hover
            responsive
            variant="dark"
            size="sm"
          >
            <thead className="align-middle">
              <tr>
                <th>Date</th>
                <th>Day Temperature</th>
                <th>Night Temperature</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <th>Wind</th>
                <th>Probability of precipitation</th>
                <th>Description</th>
                <th>Icon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[1].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[1].temp?.day} </td>
                <td>{apiDataForecast?.list?.[1].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[1].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[1].humidity} %</td>
                <td>{apiDataForecast?.list?.[1].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[1].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[1].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[1].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[1].weather?.[0].main}
                    title={apiDataForecast?.list?.[1].weather?.[0].main}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[2].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[2].temp?.day} &deg;C</td>
                <td>{apiDataForecast?.list?.[2].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[2].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[2].humidity} %</td>
                <td>{apiDataForecast?.list?.[2].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[2].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[2].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[2].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[2].weather?.[0].main}
                    title={apiDataForecast?.list?.[2].weather?.[0].main}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[3].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[3].temp?.day} &deg;C</td>
                <td>{apiDataForecast?.list?.[3].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[3].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[3].humidity} %</td>
                <td>{apiDataForecast?.list?.[3].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[3].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[3].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[3].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[3].weather?.[0].main}
                    title={apiDataForecast?.list?.[3].weather?.[0].main}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[4].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[4].temp?.day} &deg;C</td>
                <td>{apiDataForecast?.list?.[4].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[4].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[4].humidity} %</td>
                <td>{apiDataForecast?.list?.[4].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[4].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[4].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[4].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[4].weather?.[0].main}
                    title={apiDataForecast?.list?.[4].weather?.[0].main}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[5].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[5].temp?.day} &deg;C</td>
                <td>{apiDataForecast?.list?.[5].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[5].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[5].humidity} %</td>
                <td>{apiDataForecast?.list?.[5].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[5].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[5].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[5].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[5].weather?.[0].main}
                    title={apiDataForecast?.list?.[5].weather?.[0].main}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[6].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[6].temp?.day} &deg;C</td>
                <td>{apiDataForecast?.list?.[6].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[6].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[6].humidity} %</td>
                <td>{apiDataForecast?.list?.[6].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[6].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[6].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[6].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[6].weather?.[0].main}
                    title={apiDataForecast?.list?.[6].weather?.[0].main}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  {moment
                    .unix(apiDataForecast?.list?.[7].dt)
                    .format("MMMM Do YYYY")}
                </td>
                <td>{apiDataForecast?.list?.[7].temp?.day} &deg;C</td>
                <td>{apiDataForecast?.list?.[7].temp?.night} &deg;C</td>
                <td>{apiDataForecast?.list?.[7].pressure} hPa</td>
                <td>{apiDataForecast?.list?.[7].humidity} %</td>
                <td>{apiDataForecast?.list?.[7].speed} meter/sec</td>
                <td>{apiDataForecast?.list?.[7].pop * 100} %</td>
                <td>{apiDataForecast?.list?.[7].weather?.[0].description}</td>
                <td>
                  <img
                    src={`//openweathermap.org/img/w/${apiDataForecast?.list?.[7].weather?.[0].icon}.png`}
                    alt={apiDataForecast?.list?.[7].weather?.[0].main}
                    title={apiDataForecast?.list?.[7].weather?.[0].main}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </FogComponent>
  );
}

export default App;
