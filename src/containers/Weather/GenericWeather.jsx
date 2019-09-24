import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './GenericWeather.scss';

function GenericWeather({ description, temp, status }) {
  const cls = cx('weather-icon', status.toLowerCase());
  return (
    <div className="weather-card">
      <div className={cls} />
      <div className="weather-content">
        <h1> {Math.floor(temp)}
º
{' '}
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
