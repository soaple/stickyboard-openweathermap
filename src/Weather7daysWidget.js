// src/Weather7daysWidget.js

import React from 'react';
import PropTypes from 'prop-types';

import ApiManager from '../../network/ApiManager';
import StatusCode from '../../network/StatusCode';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { red, lightBlue, amber, grey } from '@material-ui/core/colors';

import Moment from 'moment-timezone';

import { Textfit } from 'react-textfit';

import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    Line, LineChart, Legend, ResponsiveContainer, PieChart, Pie, Bar,
    BarChart, Sector, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, ComposedChart, RadialBarChart, RadialBar,
    ScatterChart, Scatter, Treemap, ReferenceLine } from 'recharts'

import SimpleDateAxisTick from '../ui/SimpleDateAxisTick';

import DateUtil from '../../utils/DateUtil';

import Const from '../../constants/Const';
import WeatherIconConst from '../../constants/WeatherIconConst';

const styles = theme => ({
    root: {
        // background: '#FFFFFF',
        height: '100%',
        paddingLeft: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 3,
        // paddingBottom: theme.spacing.unit,
    },
    title: {
        margin: 'auto',
        textAlign: 'center',
    },
    weather: {
        color: 'rgb(74, 91, 126)',
        textAlign: 'center',
        margin: 'auto',
        padding: theme.spacing.unit * 2,
        fontWeight: 700,
        [theme.breakpoints.up('xs')]: {
            fontSize: 16,
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 18,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 22,
        },
    },
    weatherIcon: {
        color: grey[800],
        [theme.breakpoints.up('xs')]: {
            fontSize: 50,
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 50,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 60,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 70,
        },
    },
    tempMax: {
        fontWeight: 700,
        // [theme.breakpoints.up('xs')]: {
        //     fontSize: 16,
        // },
        // [theme.breakpoints.up('sm')]: {
        //     fontSize: 18,
        // },
        // [theme.breakpoints.up('md')]: {
        //     fontSize: 22,
        // },
        color: red['A400'],
    },
    tempMin: {
        fontWeight: 700,
        // [theme.breakpoints.up('xs')]: {
        //     fontSize: 16,
        // },
        // [theme.breakpoints.up('sm')]: {
        //     fontSize: 18,
        // },
        // [theme.breakpoints.up('md')]: {
        //     fontSize: 22,
        // },
        color: lightBlue['A700'],
    },
});

class Weather7daysWidget extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            weatherForecastList: [],
        }
    }

    componentDidMount () {
        this.getWeatherData(37.504296, 127.024792);
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

    render () {
        const { classes, theme } = this.props;
        const { weatherForecastList } = this.state;

        return (
            <div className={classes.root}>
                <Textfit
                    mode="single"
                    min={16}
                    max={28}
                    forceSingleModeWidth={false}
                    className={classes.title}>
                    {'5 day / 3 hour forecast'}
                </Textfit>

                <ResponsiveContainer>
                    <LineChart
                        data={weatherForecastList}
                        margin={{top: 20, right: 30, left: -10, bottom: 50}}>
                        <XAxis
                            dataKey='date'
                            tickCount={10}
                            tick={<SimpleDateAxisTick />}/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip
                            labelFormatter={(label) => { return DateUtil.formatCustom(label, 'MM-DD HH:mm') }}
                            formatter={(value) => {return value.toFixed(0)}}/>
                        <Legend />
                        <ReferenceLine y={0} stroke='#000'/>
                        <Line
                            type="natural"
                            dataKey="temp"
                            name={'Temperature'}
                            unit={'°C'}
                            stroke={red['A200']}
                            strokeWidth={2}
                            dot={true}
                            activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

Weather7daysWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Weather7daysWidget);
