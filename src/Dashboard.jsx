import React, { Component } from 'react';

import './styles/App.scss';
import axios from 'axios';
import Tube from './containers/TubeStatus/Tube/Tube';
import Tram from './containers/ManchesterTramStatus/Tram/Tram';
import GalleryWidgetContainer from './containers/GalleryWidget/GalleryWidgetContainer';
import Widget from './components/Widget';
import Header from './containers/Header';
import ListWidgetContainer from './containers/List/ListWidgetContainer';
import Footer from './containers/Footer';
import OverheardWidgetContainer from './containers/Overheard';
import WifiPasswordContainer from './containers/WifiPassword';
import Birthdays from './containers/Birthdays';
import WeatherWidgetContainer from './containers/Weather/WeatherWidgetContainer';
import RemindersWidgetContainer from './containers/Reminders';

const BASE_API_URL =
  'http://etdash-env.stujddpjmb.eu-west-2.elasticbeanstalk.com';

async function determineLocationFromCoordinates(coordinates) {
  if (coordinates.latitude && coordinates.longitude) {
    const response = await axios.get('https://locationiq.org/v1/reverse.php', {
      params: {
        key: process.env.REACT_APP_LOCATIONIQ_TOKEN,
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        format: 'json'
      }
    });
    return response.data.address.city;
  }
  return undefined;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { location: '' };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(position => {
      determineLocationFromCoordinates(position.coords).then(city => {
        this.setState({ location: city });
      });
    });
  }

  render() {
    let locationBasedComponent;
    switch (this.state.location) {
      case 'London':
        locationBasedComponent = <Tube />;
        break;
      case 'Manchester':
        locationBasedComponent = (
          <Tram href={`${BASE_API_URL}/transport-manchester/status`} />
        );
        break;
      default:
        locationBasedComponent = null;
    }
    return (
      <div>
        <Header />
        <div className="App">
          <div className="content-wrapper">
            <Widget>
              <GalleryWidgetContainer href={`${BASE_API_URL}/gallery/latest`} />
            </Widget>
            <Widget>
              <ListWidgetContainer
                href={`${BASE_API_URL}/team-news/all`}
                heading="Team news"
                rowspan={3}
              />
            </Widget>
            <Widget>
              <OverheardWidgetContainer
                href={`${BASE_API_URL}/overheard/current`}
              />
            </Widget>
            <Widget heading="">
              <RemindersWidgetContainer
                href={`${BASE_API_URL}/reminders/all`}
              />
            </Widget>
            <Widget>
              <WeatherWidgetContainer
                href={`${BASE_API_URL}/weather/current`}
              />
              <Birthdays href={`${BASE_API_URL}/birthdays/current`} />
            </Widget>
            <Widget>
              <WifiPasswordContainer
                href={`${BASE_API_URL}/wifi-passwords/latest`}
              />
            </Widget>
          </div>
          <div className="side">
            <Widget>{locationBasedComponent}</Widget>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Dashboard;
