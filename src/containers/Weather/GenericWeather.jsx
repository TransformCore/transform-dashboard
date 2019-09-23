import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './GenericWeather.scss';

function GenericWeather({ description, temp, status }) {
  /*
  Helps select which icon to render and defaults to cloudy if the status description is not found
   */
  function selectWeatherIcon(name) {
    switch (name.toLowerCase()) {
      case 'clear sky':
        return (
          <div className="weather-icon sunny">
            <div className="sun">
              <div className="rays" />
            </div>
          </div>
        );
      case 'few clouds':
      case 'broken clouds':
      case 'scattered clouds':
        return (
          <div className="weather-icon cloudy">
            <div className="cloud" />
            <div className="cloud" />
          </div>
        );
      case 'light intensity shower rain':
      case 'shower rain':
      case 'rain':
        return (
          <div className="weather-icon rainy">
            <div className="cloud" />
            <div className="rain" />
          </div>
        );
      case 'thunderstorm':
        return (
          <div className="weather-icon thunder-storm">
            <div className="cloud" />
            <div className="lightning">
              <div className="bolt" />
              <div className="bolt" />
            </div>
          </div>
        );
      case 'snow':
        return (
          <div className="weather-icon flurries">
            <div className="cloud" />
            <div className="snow">
              <div className="flake" />
              <div className="flake" />
            </div>
          </div>
        );
      default:
        return (
          <div className="weather-icon cloudy">
            <div className="cloud" />
            <div className="cloud" />
          </div>
        );
    }
  }

  const weatherIconComponent = selectWeatherIcon(status);
  return (
    <div className="weather-card">
      {weatherIconComponent}
      <div className="weather-content">
        <h1>
          {Math.floor(temp)}
          {'º'}
        </h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

GenericWeather.propTypes = {
  temp: PropTypes.number,
  status: PropTypes.string
};

GenericWeather.defaultProps = {
  temp: 'º',
  status: 'sun'
};

export default GenericWeather;
