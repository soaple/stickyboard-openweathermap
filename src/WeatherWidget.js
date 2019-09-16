// src/WeatherWidget.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment-timezone';
import { Textfit } from 'react-textfit';

import ApiManager from './network/ApiManager';
import StatusCode from './network/StatusCode';
import WeatherIconConst from './WeatherIconConst';

require('../static/css/weather-icons.min.css');

const Root = styled.div`
    height: 100%;
    background: #424242;
    border-radius: 16px;
`;

const WeatherIconTextfit = styled(Textfit)`
    width: 40%;
    height: 70%;
    position: absolute;
    left: 16px;
    top: 0;
    color: #FFFFFF;
    text-shadow: 2px 2px 30px #757575;
`;

const DateTextfit = styled(Textfit)`
    width: 60%;
    height: 30%;
    position: absolute;
    right: 16px;
    top: 16px;
    color: #FFFFFF;
    font-weight: 700;
    text-align: right;
`;

const LocationTextfit = styled(Textfit)`
    width: 10%;
    height: 10%;
    position: absolute;
    left: 16px;
    bottom: 8px;
    color: #FFFFFF;
    font-weight: 700;
`;

const TemperatureTextfit = styled(Textfit)`
    width: 60%;
    height: 40%;
    position: absolute;
    right: 16px;
    bottom: 8px;
    text-align: right;
    color: #FFFFFF;
    font-weight: 700;
    text-shadow: 2px 2px 30px #757575;
`;

class WeatherWidget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            weather: undefined,
        }
    }

    componentDidMount () {
        this.getWeatherData(37.504296, 127.024792);
    }

    getWeatherData = (latitude, longitude) => {
        ApiManager.getWeather(latitude, longitude, this.getWeatherCallback);
    }

    getWeatherCallback = (statusCode, response) => {
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

    render() {
        const { weather } = this.state;

        return (
            <Root>
                {/* Icon */}
                <WeatherIconTextfit
                    mode="single"
                    min={14}
                    max={200}
                    forceSingleModeWidth={false}>
                    <p>
                        <i className={weather !== undefined ? WeatherIconConst[weather.weather[0].icon] : ''}/>
                    </p>
                </WeatherIconTextfit>

                {/* Date */}
                <DateTextfit
                    mode="multi"
                    min={14}
                    max={28}>
                    <p style={{marginBottom: 2}}>
                        {weather !== undefined ? Moment(weather.dt * 1000).format('ddd'): ''}
                    </p>
                    <p>
                        {weather !== undefined ? Moment(weather.dt * 1000).format('YYYY/MM/DD') : '( - )'}
                    </p>
                </DateTextfit>

                {/* Location */}
                <LocationTextfit
                    mode="single"
                    min={14}
                    max={56}
                    forceSingleModeWidth={false}>
                    <img src={require('../static/image/location_pin.svg')} />
                    {weather !== undefined ? weather.name + ', ' + weather.sys.country : '-'}
                </LocationTextfit>

                {/* Temperature */}
                <TemperatureTextfit
                    mode="single"
                    min={28}
                    max={200}
                    forceSingleModeWidth={false}>
                    <p>
                        {weather !== undefined ? weather.main.temp + '°C' : '-°C'}
                    </p>
                </TemperatureTextfit>
            </Root>
        )
    }
}

export default WeatherWidget;
