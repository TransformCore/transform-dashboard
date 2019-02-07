import React, { Component } from 'react';

import OpenWeather from './OpenWeather';

class WeatherWidgetContainer extends Component {
  render() {
    const { href } = this.props;
    return <OpenWeather apiLocation={href} />;
  }
}

export default WeatherWidgetContainer;
