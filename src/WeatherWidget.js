// src/WeatherWidget.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment-timezone';
import { Textfit } from 'react-textfit';

import ApiManager from './network/ApiManager';

import LocationOn from '@material-ui/icons/LocationOn';

import DateUtil from '../../utils/DateUtil';

import WeatherIconConst from './WeatherIconConst';

const Root = styled.div`
    height: 100%;
    background: rgb(115, 115, 115);
`;

const Weather = styled.div`
    height: '100%';
    color: '#FFFFFF';
    text-align: 'center';
    margin: 'auto';
    font-weight: 700;
`;

const WeatherIconTextfit = styled(TextFit)`
    width: 40%;
    height: 70%;
    position: 'absolute';
    left: 16px;
    top: 0;
    color: '#FFFFFF';
    text-shadow: '2px 2px 30px #808080';
`;

const DateTextfit = styled(TextFit)`
    width: 60%;
    height: 30%;
    position: 'absolute';
    right: 16px;
    top: 16px;
    text-align: 'right';
`;

const LocationTextFit = styled(TextFit)`
    width: '10%';
    height: '10%';
    position: 'absolute';
    left: 16px;
    bottom: 8px;
    color: '#FFFFFF';
`;

const TemperatureTextFit = styled(TextFit)`
    width: '60%';
    height: '40%';
    position: 'absolute';
    right: 16px;
    bottom: 8px;
    text-align: 'right';
    color: '#FFFFFF';
    text-shadow: '2px 2px 30px #909090';
    font-weight: 700;
`;

class WeatherWidget extends React.Component {
    constructor (props) {
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
                <Weather>
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
                            {weather !== undefined ? DateUtil.convertDayToString(Moment(weather.dt * 1000).day()): ''}
                        </p>
                        <p>
                            {weather !== undefined ? Moment(weather.dt * 1000).format('YYYY/MM/DD') : '( - )'}
                        </p>
                    </DateTextfit>

                    {/* Location */}
                    <LocationTextFit
                        mode="single"
                        min={14}
                        max={56}
                        forceSingleModeWidth={false}>
                        <LocationOn
                            height={'100%'}
                            color={'inherit'}
                            hovercolor={'#fffc00'} />
                        {weather !== undefined ? weather.name + ', ' + weather.sys.country : '-'}
                    </LocationTextFit>

                    {/* Temperature */}
                    <TemperatureTextFit
                        mode="single"
                        min={28}
                        max={200}
                        forceSingleModeWidth={false}>
                        <p>
                            {weather !== undefined ? weather.main.temp + '°C' : '-°C'}
                        </p>
                    </TemperatureTextFit>
                </Weather>
            </Root>
        )
    }
}

WeatherWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default WeatherWidget;
