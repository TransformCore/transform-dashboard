import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDateState: 0,
      weekday: '',
      dateWithFullMonthName: ''
    };

    this.getCurrentFullDate = this.getCurrentFullDate.bind(this);
  }

  componentDidMount() {
    this.getCurrentFullDate().then(() => {
      this.interval = setInterval(this.getCurrentFullDate, 1000);
    });
  }

  async getCurrentFullDate() {
    const currentDate = new Date();

    const pad = n => {
      return n < 10 ? `0${n}` : n;
    };
    const currentTime = `${currentDate.getHours()}:${pad(
      currentDate.getMinutes()
    )}`;

    const date = currentDate.getDate();
    const month = currentDate.getMonth();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];
    const dateWithFullMonthName = `${monthNames[month]} ${pad(date)}`;
    const weekday = currentDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    this.setState({
      currentDateState: currentTime,
      weekday,
      dateWithFullMonthName
    });
  }

  render() {
    const { currentDateState, weekday, dateWithFullMonthName } = this.state;

    const currentFullDate = (
      <div className="date">
        {weekday}
        {', '}
        {dateWithFullMonthName}
      </div>
    );

    return (
      <footer className="footer">
        <div className="dateTime">
          {currentFullDate}
          {'.'}
          {currentDateState}
        </div>
      </footer>
    );
  }
}

export default Footer;
