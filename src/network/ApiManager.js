// src/ApiManager.js

var request = require('request')

const OPEN_WEATHER_MAP_API_KEY = '3dae235cf1b980a7814ab71411ea9d3b';

// OpenWeatherMap API URL
const OPEN_WEATHER_MAP_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OPEN_WEATHER_MAP_FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const ApiManager = {
    getWeather: (lat, lon, callback) => {
        var params = {
            appid: OPEN_WEATHER_MAP_API_KEY,
            units: 'metric',
            lat: lat,
            lon: lon,
        };

        var option = {url: OPEN_WEATHER_MAP_API_URL, qs: params};

        request.get(option, function (error, response, body) {
            if (error) {
                console.log(error);
                return
            }

            callback(response.statusCode, JSON.parse(response.body));
        });
    },

    getWeatherForecast: (lat, lon, callback) => {
        var params = {
            appid: OPEN_WEATHER_MAP_API_KEY,
            units: 'metric',
            lat: lat,
            lon: lon,
        };

        var option = {url: OPEN_WEATHER_MAP_FORECAST_API_URL, qs: params};

        request.get(option, function (error, response, body) {
            if (error) {
                console.log(error);
                return
            }

            callback(response.statusCode, JSON.parse(response.body));
        });
    },
}

export default ApiManager;
