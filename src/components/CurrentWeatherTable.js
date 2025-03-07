import React from "react";
import Table from "react-bootstrap/Table";

const CurrentWeatherTable = ({ apiData, formattedCurrentDate, formattedSunrise, formattedSunset }) => (
  <Table className="align-middle" bordered striped hover responsive variant="dark" size="sm">
    <caption className="badge bg-secondary text-wrap">
      Calling OpenWeather APIs: {formattedCurrentDate}
    </caption>
    <tbody>
      <tr>
        <th scope="col">Current Weather Conditions</th>
        <td>
          <img
            src={`//openweathermap.org/img/w/${apiData?.weather?.[0]?.icon}.png`}
            alt={apiData.weather?.[0]?.main}
            title={apiData.weather?.[0]?.main}
          />
        </td>
      </tr>
      <tr>
        <th scope="col">Area</th>
        <td>{apiData.name}</td>
      </tr>
      <tr>
        <th scope="col">Country</th>
        <td>{apiData.sys?.country}</td>
      </tr>
      <tr>
        <th scope="col">Geographical coordinates (latitude, longitude)</th>
        <td>{[apiData.coord?.lat, ", ", apiData.coord?.lon]}</td>
      </tr>
      <tr>
        <th scope="col">Description</th>
        <td>{apiData.weather?.[0]?.description}</td>
      </tr>
      <tr>
        <th scope="col">Temperature</th>
        <td>{apiData.main?.temp} °C</td>
      </tr>
      <tr>
        <th scope="col">Temperature (the human perception of weather)</th>
        <td>{apiData.main?.feels_like} °C</td>
      </tr>
      <tr>
        <th scope="col">Min, Max Temperature</th>
        <td>{apiData.main?.temp_min} °C, {apiData.main?.temp_max} °C</td>
      </tr>
      <tr>
        <th scope="col">Pressure</th>
        <td>{apiData.main?.pressure} hPa</td>
      </tr>
      <tr>
        <th scope="col">Humidity</th>
        <td>{apiData.main?.humidity} %</td>
      </tr>
      <tr>
        <th scope="col">Visibility</th>
        <td>{apiData.visibility} meters</td>
      </tr>
      <tr>
        <th scope="col">Wind</th>
        <td>{apiData.wind?.speed} meter/sec</td>
      </tr>
      <tr>
        <th scope="col">Clouds</th>
        <td>{apiData.clouds?.all} %</td>
      </tr>
      <tr>
        <th scope="col">Sunrise, Sunset</th>
        <td>{`${formattedSunrise}, ${formattedSunset}`}</td>
      </tr>
    </tbody>
  </Table>
);

export default CurrentWeatherTable;
