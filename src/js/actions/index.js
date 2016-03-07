import axios from 'axios';

const API_KEY = 'bfc29bb5b012c67fad20171177d23fcd';
const API_FORECAST_ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const API_WEATHER_ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city, location = null, singleView = false) {
  const baseUrl = singleView ? `${API_WEATHER_ROOT_URL}&units=metric` : `${API_FORECAST_ROOT_URL}&units=metric`;
  let url;

  // Regular search
  if (location === null) {
    url = `${baseUrl}&q=${city}`;
  }
  // Geolocation coordinates
  else {
    url = `${baseUrl}&lat=${location.lat}&lon=${location.lon}`;
  }

  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
