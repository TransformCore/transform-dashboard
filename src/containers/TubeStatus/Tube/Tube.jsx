import React, { Component } from 'react';
import axios from 'axios';
import StatusCard from '../StatusCard/StatusCard';
import './Tube.scss';
import Widget from '../../../components/Widget';
import { currentTime } from '../../../helper/DateUtils';
import LoadingSpinner from '../../../components/LoadingSpinner';

const API_URL = `https://api.tfl.gov.uk/line/mode/tube/status?app_id=37b3cb3e&app_key=2e35b8e85289633355f76896fcbe68a2`;

const nearbyLines = [
  'bakerloo',
  'central',
  'northern',
  'circle',
  'hammersmith & city',
  'victoria',
  'jubilee'
];

class Tube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tubeLines: [],
      lastUpdatedTime: ''
    };

    this.getData = this.getData.bind(this);
    this.getData();
    this.setGetDataInterval();
  }

  setGetDataInterval() {
    const now = new Date();
    const tenMinutes = 60000 * 10;
    const thirtyMinutes = 60000 * 30;
    if (now.getHours() >= 16 && now.getHours() < 19) {
      this.interval = setInterval(this.getData, tenMinutes);
    } else {
      this.interval = setInterval(this.getData, thirtyMinutes);
    }
  }

  async getData() {
    axios
      .get(API_URL)
      .then(response => {
        const tubeLines = response.data.filter(item =>
          nearbyLines.includes(item.name.toLowerCase())
        );
        const lastUpdateTime = currentTime(new Date());
        if (tubeLines) {
          this.setState({
            loading: false,
            tubeLines,
            lastUpdatedTime: `TUBE STATUS @ ${lastUpdateTime}`
          });
        }
      })
      .catch(err => {
        console.error('Error fetching Tube status data', err);
      });
  }

  showStatusCard = data => {
    return data.map(item => (
      <StatusCard
        key={item.id}
        name={item.name}
        status={item.lineStatuses[0].statusSeverityDescription}
        reason={
          item.lineStatuses[0].reason ? item.lineStatuses[0].reason : null
        }
        severity={item.lineStatuses[0].statusSeverity}
      />
    ));
  };

  render() {
    const { loading, tubeLines, lastUpdatedTime } = this.state;

    const headingProps = {
      headingTitle: '',
      headingTitleColor: '#6dc5e8',
      headingBackgroundColor: 'white',
      lastUpdatedStatusTime: lastUpdatedTime
    };

    if (loading === true) {
      return (
        <Widget heading={headingProps}>
          <LoadingSpinner />
        </Widget>
      );
    }
    return (
      <Widget heading={headingProps}>
        <div className="tube-wrapper">{this.showStatusCard(tubeLines)}</div>
      </Widget>
    );
  }
}

export default Tube;
