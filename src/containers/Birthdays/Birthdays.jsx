import React, { Component } from 'react';
import axios from 'axios';
import { tenSeconds, twelveHours } from '../../helper/DateUtils';
import Widget from '../../components/Widget';
import Polaroid from './Polaroid/Polaroid';
import './Birthdays.scss';
import LoadingSpinner from '../../components/LoadingSpinner';

class Birthdays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      birthdays: [],
      currentPerson: {}
    };

    this.getData = this.getData.bind(this);
    this.rotateCurrentPerson = this.rotateCurrentPerson.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.setGetDataInterval();
    this.setRotatorInterval();
  }

  async getData() {
    const { href } = this.props;

    await axios.get(href).then(response => {
      this.setState({
        loading: false,
        birthdays: response.data.birthdays
      });
    });
  }

  setGetDataInterval() {
    this.interval = setInterval(this.getData, twelveHours());
  }

  setRotatorInterval() {
    this.timer = setInterval(this.rotateCurrentPerson, tenSeconds());
  }

  showCard = personData => {
    if (personData.name) {
      return <Polaroid data={personData} />;
    }
    return <p>No cake today, move along nothing to see here</p>;
  };

  async rotateCurrentPerson() {
    const { birthdays, currentPerson } = this.state;

    const found = birthdays.find(bday => bday.name === currentPerson.name);

    const currentIndex = birthdays.indexOf(found);
    if (currentIndex === birthdays.length - 1) {
      return this.setState({
        currentPerson: {
          name: birthdays[0].name,
          date: birthdays[0].date,
          photoUrl: birthdays[0].photoUrl
        }
      });
    }
    const data = birthdays[currentIndex + 1];
    return this.setState({
      currentPerson: {
        name: data.name,
        date: data.date,
        photoUrl: data.photoUrl
      }
    });
  }

  render() {
    const { loading, currentPerson } = this.state;
    const headingProps = {
      headingTitle: "This Weeks's Birthdays",
      headingTitleColor: '#6dc5e8',
      headingBackgroundColor: 'white'
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
        <div className="birthday-wrapper">{this.showCard(currentPerson)}</div>
      </Widget>
    );
  }
}

export default Birthdays;
