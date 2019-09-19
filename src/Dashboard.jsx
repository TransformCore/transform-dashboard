import React from 'react';
import Widget from './components/Widget';
import ListWidgetContainer from './containers/List/ListWidgetContainer';

import './styles/App.css';
import WeatherWidgetContainer from './containers/Weather/WeatherWidgetContainer';
import Header from './containers/Header';
import Footer from './containers/Footer';
import GalleryWidgetContainer from './containers/GalleryWidget/GalleryWidgetContainer';
import Tube from './containers/TubeStatus/Tube/Tube';
import OverheardWidgetContainer from './containers/Overheard';
import RemindersWidgetContainer from './containers/Reminders';
import WifiPasswordContainer from './containers/WifiPassword';

const Dashboard = () => {
  const BASE_API_URL =
    'http://etdash-env.stujddpjmb.eu-west-2.elasticbeanstalk.com';
  return (
    <div>
      <Header />
      <div className="App">
        <Widget>
          <GalleryWidgetContainer href={`${BASE_API_URL}/gallery/latest`} />
        </Widget>
        <Widget heading="">
          <ListWidgetContainer
            href={`${BASE_API_URL}/team-news/all`}
            heading="Team news"
            rowspan={3}
          />
        </Widget>
        <Widget>
          <Tube />
        </Widget>
        <Widget heading="">
          <RemindersWidgetContainer href={`${BASE_API_URL}/reminders/all`} />
        </Widget>
        <Widget>
          <WeatherWidgetContainer href={`${BASE_API_URL}/weather/current`} />
          <Widget>
            <WifiPasswordContainer
              href={`${BASE_API_URL}/wifi-passwords/latest`}
            />
          </Widget>
        </Widget>
        <Widget>
          <OverheardWidgetContainer
            href={`${BASE_API_URL}/overheard/current`}
          />
        </Widget>
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;
