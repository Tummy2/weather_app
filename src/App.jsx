import { useState, useEffect } from "react";
import "./App.css";
import { getCurrentWeather, getFiveDayForecast } from "./weatherApi";
import WeatherInfoContainer from "./components/WeatherInfoContainer";

export default function App() {
  const [city, setCity] = useState(() => {
    return localStorage.getItem("lastSearchedCity") || "";
  });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  async function handleNewCity(formData) {
    const newCity = formData.get("city");
    if (!newCity || newCity == city) {
      console.error("City is required / Enter new city");
      return;
    }
    setCity(newCity);
    localStorage.setItem("lastSearchedCity", newCity);
    setIsLoading(true);

    try {
      const currentWeatherInfo = await getCurrentWeather(newCity);
      const currentForecastInfo = await getFiveDayForecast(newCity);

      if (currentWeatherInfo.cod === "404") {
        alert("Please enter a proper city");
        setIsLoading(false);
        return;
      }

      setTimeout(() => {
        setCurrentWeather(currentWeatherInfo);
        setCurrentForecast(currentForecastInfo);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    if (city) {
      const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          const currentWeatherInfo = await getCurrentWeather(city);
          const currentForecastInfo = await getFiveDayForecast(city);

          setCurrentWeather(currentWeatherInfo);
          setCurrentForecast(currentForecastInfo);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchInitialData();
    }
  }, [city]);

  return (
    <main className={isDarkMode ? "dark-mode" : "light-mode"}>
      <div className={`search-bar-container ${isDarkMode ? "dark" : "light"}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleNewCity(formData);
          }}
          className="city-search-bar"
        >
          <input
            type="text"
            placeholder="Enter a city"
            aria-label="View forecast"
            name="city"
            defaultValue={city}
          />
          <button>View</button>
        </form>
        <button
          className="theme-toggle-button"
          onClick={toggleTheme}
          aria-label={
            isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          <img
            src={isDarkMode ? "/sun.svg" : "/moon.svg"}
            alt={isDarkMode ? "Light Mode" : "Dark Mode"}
            className="theme-icon"
          />
        </button>
      </div>

      {isLoading ? (
        <>
          {console.log("Loading indicator is visible")}
          <div className="loading-indicator">Loading...</div>
        </>
      ) : (
        currentWeather !== null &&
        currentForecast !== null && (
          <WeatherInfoContainer
            today={{
              temp: currentWeather.main.temp,
              max: currentWeather.main.temp_max,
              min: currentWeather.main.temp_min,
              humidity: currentWeather.main.humidity,
              windSpeed: currentWeather.wind.speed,
              description: currentWeather.weather[0].description,
            }}
            forcasted={{
              day1: {
                date: currentForecast.list[0].dt_txt,
                max: currentForecast.list[0].main.temp_max,
                min: currentForecast.list[0].main.temp_min,
              },
              day2: {
                date: currentForecast.list[8].dt_txt,
                max: currentForecast.list[8].main.temp_max,
                min: currentForecast.list[8].main.temp_min,
              },
              day3: {
                date: currentForecast.list[16].dt_txt,
                max: currentForecast.list[16].main.temp_max,
                min: currentForecast.list[16].main.temp_min,
              },
              day4: {
                date: currentForecast.list[24].dt_txt,
                max: currentForecast.list[24].main.temp_max,
                min: currentForecast.list[24].main.temp_min,
              },
              day5: {
                date: currentForecast.list[32].dt_txt,
                max: currentForecast.list[32].main.temp_max,
                min: currentForecast.list[32].main.temp_min,
              },
            }}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        )
      )}
    </main>
  );
}
