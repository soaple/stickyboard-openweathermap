// src/Weather3daysWidget.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Textfit } from 'react-textfit';
import Moment from 'moment-timezone';

import ApiManager from '../../network/ApiManager';
import StatusCode from '../../network/StatusCode';

import WeatherIconConst from './WeatherIconConst';

const TIME_MILLIS_DAY = Moment.duration(1, 'days').asMilliseconds();

const Root = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 16px 8px;
`;

const Weather = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const DateTextFit = styled(TextFit)`
    flex: 3;
`;

const WeatherIconTextFit = styled(TextFit)`
    flex: 4;
    color: rgb(81, 88, 94);
`;

const TemperatureTextFit = styled(TextFit)`
    flex: 3;
`;

const TempMax = styled.p`
    margin-bottom: 2;
    font-weight: 700;
    color: rgb(255, 69, 69);
`;

const TempMin = styled.p`
    margin-bottom: 2;
    font-weight: 700;
    color: rgb(69, 182, 255);
`;

class Weather3daysWidget extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            weather: undefined,
            weatherForecast: undefined,
        }
    }

    componentDidMount () {
        this.getWeatherData(37.504296, 127.024792);
    }

    getWeatherData = (latitude, longitude) => {
        ApiManager.getWeather(latitude, longitude, this.getWeatherDataCallback);
        ApiManager.getWeatherForecast(latitude, longitude, this.getWeatherForecastDataCallback);
    }

    getWeatherDataCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                this.setState({
                    weather: response,
                });
                break;
            default:
                break;
        }
    }

    getWeatherForecastDataCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                var weatherForecast = [];
                response.list.forEach((forecast) => {
                    var todayMidnight = new Date();
                    todayMidnight.setHours(24,0,0,0);

                    const date = new Date(forecast.dt * 1000);
                    if (date.getTime() >= todayMidnight.getTime()) {
                        // elapsedDay 0 means tomorrow, 1 means next tomorrow, and so on...
                        var elapsedDay = Math.floor((date.getTime() - todayMidnight.getTime()) / TIME_MILLIS_DAY);

                        // Get minimum, maximum temperature of the day
                        if (weatherForecast[elapsedDay] === undefined) {
                            weatherForecast[elapsedDay] = {
                                date: date,
                                icon: forecast.weather[0].icon,
                                temp_min: forecast.main.temp_min,
                                temp_max: forecast.main.temp_max,
                            };
                        } else {
                            var curTempMin = weatherForecast[elapsedDay].temp_min;
                            if (curTempMin !== undefined) {
                                weatherForecast[elapsedDay].temp_min = Math.min(curTempMin, forecast.main.temp_min);
                            } else {
                                weatherForecast[elapsedDay].temp_min = forecast.main.temp_min;
                            }

                            var curTempMax = weatherForecast[elapsedDay].temp_max;
                            if (curTempMax !== undefined) {
                                weatherForecast[elapsedDay].temp_max = Math.max(curTempMax, forecast.main.temp_min);
                            } else {
                                weatherForecast[elapsedDay].temp_max = forecast.main.temp_max;
                            }
                        }
                    }
                });

                this.setState({
                    weatherForecast: weatherForecast,
                });
                break;
            default:
                break;
        }
    }

    render() {
        const { weather, weatherForecast } = this.state;

        return (
            <Root>
                <Weather>
                    <DateTextFit
                        mode="multi"
                        min={14}
                        max={28}>
                        <p style={{marginBottom: 2}}>{weather ? Moment(weather.dt * 1000).day(): '요일'}</p>
                        <p>{weather ? Moment(weather.dt * 1000).format('(MM.DD)') : '( - )'}</p>
                    </DateTextFit>

                    <WeatherIconTextFit
                        mode="single"
                        min={50}
                        max={200}
                        forceSingleModeWidth={false}>
                        <i className={weather ? WeatherIconConst[weather.weather[0].icon] : ''}/>
                    </WeatherIconTextFit>

                    <TemperatureTextFit
                        mode="multi"
                        min={14}
                        max={28}>
                        <TempMax>
                            {`${weather ? weather.main.temp_max : '-'} °C`}
                        </TempMax>
                        <TempMin>
                            {`${weather ? weather.main.temp_min : '-'} °C`}
                        </TempMin>
                    </TemperatureTextFit>
                </Weather>

                <Weather>
                    <DateTextFit
                        mode="multi"
                        min={14}
                        max={28}>
                        <p style={{marginBottom: 2}}>{weatherForecast ? Moment(weatherForecast[0].date).day(): '요일'}</p>
                        <p>{weatherForecast ? Moment(weatherForecast[0].date).format('(MM.DD)') : '( - )'}</p>
                    </DateTextFit>

                    <WeatherIconTextFit
                        mode="single"
                        min={50}
                        max={200}
                        forceSingleModeWidth={false}>
                        <i className={weatherForecast ? WeatherIconConst[weatherForecast[0].icon] : ''}/>
                    </WeatherIconTextFit>

                    <Textfit
                        mode="multi"
                        min={14}
                        max={28}>
                        <TempMax>
                            {`${weatherForecast ? weatherForecast[0].temp_max : '-'} °C`}
                        </TempMax>
                        <TempMin>
                            {`${weatherForecast ? weatherForecast[0].temp_min : '-'} °C`}
                        </TempMin>
                    </Textfit>
                </Weather>

                <Weather>
                    <DateTextFit
                        mode="multi"
                        min={14}
                        max={28}>
                        <p style={{marginBottom: 2}}>{weatherForecast ? Moment(weatherForecast[1].date).day(): '요일'}</p>
                        <p>{weatherForecast ? Moment(weatherForecast[1].date).format('(MM.DD)') : '( - )'}</p>
                    </DateTextFit>

                    <WeatherIconTextFit
                        mode="single"
                        min={50}
                        max={200}
                        forceSingleModeWidth={false}>
                        <i className={weatherForecast ? WeatherIconConst[weatherForecast[1].icon] : ''}/>
                    </WeatherIconTextFit>

                    <TemperatureTextFit
                        mode="multi"
                        min={14}
                        max={28}>
                        <TempMax>
                            {`${weatherForecast ? weatherForecast[1].temp_max : '-'} °C`}
                        </TempMax>
                        <TempMin>
                            {`${weatherForecast ? weatherForecast[1].temp_min : '-'} °C`}
                        </TempMin>
                    </TemperatureTextFit>
                </Weather>
            </Root>
        )
    }
}

export default Weather3daysWidget;