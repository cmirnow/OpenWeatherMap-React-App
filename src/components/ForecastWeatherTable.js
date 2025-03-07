import React from "react";
import Table from "react-bootstrap/Table";

const ForecastWeatherTable = ({ forecastRows }) => (
  <Table className="align-middle text-center" bordered striped hover responsive variant="dark" size="sm">
    <thead className="align-middle">
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Day Temperature (°C)</th>
        <th scope="col">Night Temperature (°C)</th>
        <th scope="col">Pressure (hPa)</th>
        <th scope="col">Humidity (%)</th>
        <th scope="col">Wind (meter/sec)</th>
        <th scope="col">Probability of precipitation</th>
        <th scope="col">Description</th>
        <th scope="col">Weather conditions</th>
      </tr>
    </thead>
    <tbody>
      {forecastRows.map((list) => (
        <tr key={list.dt}>
          <td>{list.formattedDate}</td>
          <td>{list.temp.day}</td>
          <td>{list.temp.night}</td>
          <td>{list.pressure}</td>
          <td>{list.humidity}</td>
          <td>{list.speed}</td>
          <td>{list.pop}</td>
          <td>{list.weather[0].description}</td>
          <td>
            <img
              src={`//openweathermap.org/img/w/${list.weather[0].icon}.png`}
              alt={list.weather[0].main}
              title={list.weather[0].main}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ForecastWeatherTable;
