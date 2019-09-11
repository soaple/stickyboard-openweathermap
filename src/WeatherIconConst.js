// src/WeatherIconConst.js

/**
 * Mapping OpenWeatherMap icon code to WeatherIcon code
 */
var WeatherIconConst = {

    // Clear sky
    '01d': 'wi wi-day-sunny',      // Day
    '01n': 'wi wi-day-sunny',      // Night

    // Few clouds
    '02d': 'wi wi-day-cloudy',      // Day
    '02n': 'wi wi-night-alt-cloudy',      // Night

    // Scattered clouds
    '03d': 'wi wi-cloud',      // Day
    '03n': 'wi wi-cloud',      // Night

    // Broken clouds
    '04d': 'wi wi-cloudy',      // Day
    '04n': 'wi wi-cloudy',      // Night

    // Shower rain
    '09d': 'wi wi-showers',      // Day
    '09n': 'wi wi-showers',      // Night

    // Rain
    '10d': 'wi wi-day-rain',      // Day
    '10n': 'wi wi-night-alt-rain',      // Night

    // Thunderstorm
    '11d': 'wi wi-thunderstorm',      // Day
    '11n': 'wi wi-thunderstorm',      // Night

    // Snow
    '13d': 'wi wi-day-snow',      // Day
    '13n': 'wi wi-night-snow',      // Night

    // Mist
    '50d': 'wi wi-day-fog',      // Day
    '50n': 'wi wi-night-fog',      //  Night
}

module.exports = WeatherIconConst
