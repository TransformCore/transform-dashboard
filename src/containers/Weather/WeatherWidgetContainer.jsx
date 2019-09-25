import React from 'react';
import OpenWeather from './OpenWeather';

const WeatherWidgetContainer = ({ href, city }) => {
  return <OpenWeather apiLocation={href} city={city} />;
};

export default WeatherWidgetContainer;
