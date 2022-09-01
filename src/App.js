import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Footer from "./footer";
import FogComponent from "./components/FogComponent";

function App() {
  const [status, setStatus] = useState(null);
  const [apiData, setApiData] = useState({});

  async function fetchData(lat, lon) {
    await fetch(
      `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setApiData(data));
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
        <button
          onClick={getLocation}
          type="button"
          className="btn btn-light m-2"
        >
          Get Current Weather for Your Geo-Targeting
        </button>
        <p>{status}</p>
        {apiData?.coord?.lat && (
          <Table className="align-middle" bordered striped hover variant="dark" size="sm">
            <caption className="badge bg-secondary text-wrap">
              {moment.unix(apiData?.dt).format("MMMM Do YYYY, h:mm:ss a")}
            </caption>
            <tbody>
              <tr>
                <th scope="col">
                  Average Weather
                </th>
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
                  {apiData?.main?.temp_min} &deg;C, {apiData?.main?.temp_max} &deg;C
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
        <Footer />
      </div>
    </FogComponent>
  );
};

export default App;
