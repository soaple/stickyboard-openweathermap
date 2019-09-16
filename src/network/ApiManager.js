// src/ApiManager.js

const OPEN_WEATHER_MAP_API_KEY = '3dae235cf1b980a7814ab71411ea9d3b';

// OpenWeatherMap API URL
const OPEN_WEATHER_MAP_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OPEN_WEATHER_MAP_FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const ApiManager = {
    getWeather: (lat, lon) => {
        var params = {
            appid: OPEN_WEATHER_MAP_API_KEY,
            units: 'metric',
            lat: lat,
            lon: lon,
        };

        var url = new URL(OPEN_WEATHER_MAP_API_URL);
        url.search = new URLSearchParams(params);

        return fetch(url).then(response => response.json());
    },

    getWeatherForecast: (lat, lon) => {
        var params = {
            appid: OPEN_WEATHER_MAP_API_KEY,
            units: 'metric',
            lat: lat,
            lon: lon,
        };

        var url = new URL(OPEN_WEATHER_MAP_FORECAST_API_URL);
        url.search = new URLSearchParams(params);

        return fetch(url).then(response => response.json());
    },
}

export default ApiManager;
