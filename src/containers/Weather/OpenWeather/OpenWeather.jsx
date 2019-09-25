import React from 'react';
import axios from 'axios';
import GenericWeather from '../GenericWeather';

class OpenWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      temp: null,
      humidity: null,
      windSpeed: null
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const interval = 60 * 100 * 60;

    // eslint-disable-next-line no-unused-vars
    this.getData().then(_ => {
      this.interval = setInterval(this.getData, interval);
    });
  }

  async getData() {
    const { apiLocation, city } = this.props;
    if (city) {
      axios.get(`${apiLocation}/${city}`).then(response => {
        const { data } = response;
        this.setState({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          status: data.weather[0].main
        });
      });
    }
  }

  render() {
    const { name, temp, description, status, humidity, windSpeed } = this.state;

    return (
      <GenericWeather
        city={name}
        temp={temp}
        description={description}
        status={status}
        humidity={humidity}
        windSpeed={windSpeed}
      />
    );
  }
}

export default OpenWeather;
