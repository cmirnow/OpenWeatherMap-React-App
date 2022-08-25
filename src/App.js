import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Footer from "./footer";

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [apiData, setApiData] = useState({});

  async function fetchData(lat, lng) {
    await fetch(
      `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
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
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          fetchData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const cssStyle = {
    backgroundImage: "url('/background.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={cssStyle}>
      <button onClick={getLocation}>
        Get Current Weather for Your Geo-Targeting
      </button>
      <p>{status}</p>
      {lat && (
        <Table bordered striped hover variant="dark" size="sm">
          <tbody>
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
              <td>{[lat, "  ", lng]}</td>
            </tr>
            <tr>
              <th scope="col">Description</th>
              <td>{apiData?.weather?.[0].description}</td>
            </tr>
            <tr>
              <th scope="col">Temperature</th>
              <td>{apiData?.main?.temp} °C</td>
            </tr>
            <tr>
              <th scope="col">Temperature (the human perception of weather)</th>
              <td>{apiData?.main?.feels_like} °C</td>
            </tr>
            <tr>
              <th scope="col">Maximum Temperature</th>
              <td>{apiData?.main?.temp_max} °C</td>
            </tr>
            <tr>
              <th scope="col">Minimal Temperature</th>
              <td>{apiData?.main?.temp_min} °C</td>
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
              <th scope="col">Sunrise</th>
              <td>{moment.unix(apiData?.sys?.sunrise).format("hh:mm a")}</td>
            </tr>
            <tr>
              <th scope="col">Sunset</th>
              <td>{moment.unix(apiData?.sys?.sunset).format("hh:mm a")}</td>
            </tr>
          </tbody>
        </Table>
      )}
      <Footer />
    </div>
  );
};

export default App;
