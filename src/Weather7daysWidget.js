// src/Weather7daysWidget.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment-timezone';
import { Textfit } from 'react-textfit';

import { LineChart } from '@stickyboard/recharts';

import ApiManager from './network/ApiManager';
import StatusCode from './network/StatusCode';
import WeatherIconConst from './WeatherIconConst';

// import SimpleDateAxisTick from '../ui/SimpleDateAxisTick';
// import DateUtil from '../../utils/DateUtil';


const Root = styled.div`
    height: 100%;
    padding: 16px 8px;
`;

const TitleTextfit = styled(Textfit)`
    margin: 'auto';
    text-align: 'center';
`;

class Weather7daysWidget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            weatherForecastList: [],
        }
    }

    componentDidMount() {
        const { latitude, longitude } = this.props;
        this.getWeatherData(latitude, longitude);
    }

    getWeatherData = (latitude, longitude) => {
        ApiManager.getWeatherForecast(latitude, longitude, this.getWeatherForecastDataCallback);
    }

    getWeatherForecastDataCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                // console.log(response);
                var weatherForecastList = [];

                response.list.forEach((forecast) => {
                    const date = new Date(forecast.dt * 1000);

                    weatherForecastList.push({
                        date: forecast.dt * 1000,
                        icon: forecast.weather[0].icon,
                        temp: forecast.main.temp,
                        temp_min: forecast.main.temp_min,
                        temp_max: forecast.main.temp_max,
                    });
                });

                this.setState({
                    weatherForecastList: weatherForecastList,
                });
                break;
            default:
                break;
        }
    }

    render() {
        const { weatherForecastList } = this.state;

        return (
            <Root>
                <TitleTextfit
                    mode="single"
                    min={16}
                    max={28}
                    forceSingleModeWidth={false}>
                    {'5 day / 3 hour forecast'}
                </TitleTextfit>

                <LineChart
                    data={weatherForecastList}
                    xAxisDataKey={'date'}
                    lineType={'natural'}
                    lineDataKey={'temp'}
                    lineName={'Temperature'}
                    lineColor={'#ff4242'} />

                {
                // <ResponsiveContainer>
                    // <LineChart
                    //     data={weatherForecastList}
                    //     margin={{top: 20, right: 30, left: -10, bottom: 50}}>
                    //     <XAxis
                    //         dataKey='date'
                    //         tickCount={10}
                    //         tick={<SimpleDateAxisTick />}/>
                    //     <YAxis/>
                    //     <CartesianGrid strokeDasharray="3 3"/>
                    //     <Tooltip
                    //         labelFormatter={(label) => { return DateUtil.formatCustom(label, 'MM-DD HH:mm') }}
                    //         formatter={(value) => {return value.toFixed(0)}}/>
                    //     <Legend />
                    //     <ReferenceLine y={0} stroke='#000'/>
                    //     <Line
                    //         type="natural"
                    //         dataKey="temp"
                    //         name={'Temperature'}
                    //         unit={'°C'}
                    //         stroke={red['A200']}
                    //         strokeWidth={2}
                    //         dot={true}
                    //         activeDot={{r: 6}} />
                    // </LineChart>
                // </ResponsiveContainer>
                }
            </Root>
        )
    }
}

export default Weather7daysWidget;
