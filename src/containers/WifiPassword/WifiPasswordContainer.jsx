import React, { Component } from 'react';
import axios from 'axios';
import Widget from '../../components/Widget';
import './WifiPassword.scss';
import WifiLogo from '../../components/WifiLogo';

class WifiPasswordContainer extends Component {
  constructor() {
    super();

    this.state = {
      wifiPassword: ''
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    this.getData().then(_ => {
      this.interval = setInterval(this.getData, 60000);
    });
  }

  shouldComponentUpdate(_, nextState) {
    const { wifiPassword } = this.state;
    return wifiPassword !== nextState.wifiPassword;
  }

  async getData() {
    const now = new Date();

    if (now.getHours() > 9 && now.getHours() < 18) {
      const { href } = this.props;
      const resp = await axios.get(href);
      this.setState({
        wifiPassword: resp.data[0].wifiPassword
      });
    }
  }

  render() {
    const { wifiPassword } = this.state;

    const headingProps = {
      headingTitle: 'WIFI GUEST PASSWORD',
      headingTitleColor: '#f89633',
      headingBackgroundColor: 'white'
    };

    return (
      <Widget heading={headingProps}>
        <div className="wifi-password">
          <p className="wifi-password-text"> Tr0p1calSun </p>
          <WifiLogo />
        </div>
      </Widget>
    );
  }
}

export default WifiPasswordContainer;
