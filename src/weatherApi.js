const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export async function getCurrentWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message)
  }
}

export async function getFiveDayForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}