// src/WeatherWidget.js

import React from 'react';
import PropTypes from 'prop-types';

import ApiManager from '../../network/ApiManager';
import StatusCode from '../../network/StatusCode';

import { withStyles } from '@material-ui/core/styles';
import { red, lightBlue, blueGrey, grey } from '@material-ui/core/colors';

import LocationOn from '@material-ui/icons/LocationOn';

import Moment from 'moment-timezone';

import { Textfit } from 'react-textfit';

import Grid from '@material-ui/core/Grid';

import DateUtil from '../../utils/DateUtil';

import Const from '../../constants/Const';
import WeatherIconConst from '../../constants/WeatherIconConst';

const styles = theme => ({
    root: {
        height: '100%',
        background: grey[800],
        // paddingLeft: theme.spacing.unit * 3,
        // paddingTop: theme.spacing.unit * 2,
        // paddingRight: theme.spacing.unit * 3,
        // paddingBottom: theme.spacing.unit,
    },
    weather: {
        height: '100%',
        // background: grey[800],
        color: '#FFFFFF',
        textAlign: 'center',
        margin: 'auto',
        // padding: theme.spacing.unit * 2,
        fontWeight: 700,
    },
    weatherIcon: {
        width: '40%',
        height: '70%',
        position: 'absolute',
        left: theme.spacing.unit * 2,
        top: 0,
        color: '#FFFFFF',
        textShadow: '2px 2px 30px ' + grey[600],
    },
    date: {
        width: '60%',
        height: '30%',
        position: 'absolute',
        right: theme.spacing.unit * 2,
        top: theme.spacing.unit * 2,
        textAlign: 'right',
    },
    location: {
        width: '10%',
        height: '10%',
        position: 'absolute',
        left: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 1,
        color: '#FFFFFF',
    },
    temperature: {
        width: '60%',
        height: '40%',
        position: 'absolute',
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 1,
        textAlign: 'right',
        color: '#FFFFFF',
        textShadow: '2px 2px 30px ' + grey[600],
        fontWeight: 700,
        // [theme.breakpoints.up('xs')]: {
        //     fontSize: 50,
        // },
        // [theme.breakpoints.up('sm')]: {
        //     fontSize: 60,
        // },
        // [theme.breakpoints.up('md')]: {
        //     fontSize: 70,
        // },
    },
});

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

    render () {
        const { classes, theme } = this.props;
        const { weather } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.weather}>
                    {/* Icon */}
                    <Textfit
                        mode="single"
                        min={14}
                        max={200}
                        forceSingleModeWidth={false}
                        className={classes.weatherIcon}>
                        <p>
                            <i className={weather !== undefined ? WeatherIconConst[weather.weather[0].icon] : ''}/>
                        </p>
                    </Textfit>

                    {/* Date */}
                    <Textfit
                        mode="multi"
                        min={14}
                        max={28}
                        className={classes.date}>
                        <p style={{marginBottom: 2}}>
                            {weather !== undefined ? DateUtil.convertDayToString(Moment(weather.dt * 1000).day()): ''}
                        </p>
                        <p>
                            {weather !== undefined ? Moment(weather.dt * 1000).format('YYYY/MM/DD') : '( - )'}
                        </p>
                    </Textfit>

                    {/* Location */}
                    <Textfit
                        mode="single"
                        min={14}
                        max={56}
                        forceSingleModeWidth={false}
                        className={classes.location}>
                        <LocationOn
                            height={'100%'}
                            color={'inherit'}
                            hovercolor={'#fffc00'} />
                        {weather !== undefined ? weather.name + ', ' + weather.sys.country : '-'}
                    </Textfit>

                    {/* Temperature */}
                    <Textfit
                        mode="single"
                        min={28}
                        max={200}
                        forceSingleModeWidth={false}
                        className={classes.temperature}>
                        <p>
                            {weather !== undefined ? weather.main.temp + '°C' : '-°C'}
                        </p>
                    </Textfit>
                </div>
            </div>
        )
    }
}

WeatherWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WeatherWidget);
