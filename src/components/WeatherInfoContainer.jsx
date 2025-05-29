import "./WeatherInfoContainer.css";
import { useState } from "react";
import { kelvinToCelsius, kelvinToFahrenheit, metersToMiles } from "../convert";

export default function WeatherInfoContainer(props) {
  const [unit, setUnit] = useState("F");

  function convertTemp(kelvin) {
    return unit === "F" ? kelvinToFahrenheit(kelvin) : kelvinToCelsius(kelvin);
  }

  const fiveDayForecast = Object.entries(props.forcasted).map(([key, day]) => (
    <div key={key} className="day">
      <p>{day.date.slice(0, 10)}</p>
      <p>
        Max Temp: {convertTemp(day.max)}°{unit}
      </p>
      <p>
        Min Temp: {convertTemp(day.min)}°{unit}
      </p>
    </div>
  ));

  return (
    <section className="weather-info-container">
      <div className="unit-toggle">
        <div className="unit-buttons">
          <button onClick={() => setUnit("F")} disabled={unit === "F"}>
            Imperial
          </button>
          <button onClick={() => setUnit("C")} disabled={unit === "C"}>
            Metric
          </button>
        </div>
        {/* <div className="theme-button">
          <button onClick={props.toggleTheme}>
            {props.isDarkMode ? "Light" : "Dark"}
          </button>
        </div> */}
      </div>
      <div className="today-stuff">
        <div className="todays-temp">
          <img src="temp.png" alt="temp" />
          Temp: {convertTemp(props.today.temp)}°{unit}
        </div>
        <div className="today-high">
          <img src="highTemp.png" alt="temp" />
          High: {convertTemp(props.today.max)}°{unit}
        </div>
        <div className="today-low">
          <img src="lowTemp.png" alt="temp" />
          Low: {convertTemp(props.today.min)}°{unit}
        </div>
        <div className="todays-humidity">
          <img src="humidity.png" alt="temp" />
          Humidity: {props.today.humidity}%
        </div>
        <div className="today-wind-speed">
          <img src="wind.png" alt="temp" />
          Wind Speed:
          {unit === "F"
            ? metersToMiles(props.today.windSpeed)
            : props.today.windSpeed}{" "}
          {unit === "F" ? "mph" : "m/s"}
        </div>
        <div className="today-description">
          <img src="description.png" alt="temp" />
          Description: {props.today.description}
        </div>
      </div>
      <div className="forcasted-stuff">{fiveDayForecast}</div>
    </section>
  );
}
