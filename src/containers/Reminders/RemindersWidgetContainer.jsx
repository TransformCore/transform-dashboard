import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

import 'react-toastify/dist/ReactToastify.css';
import './Reminders.css';

export class RemindersWidgetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData().then(_ => {
      this.interval = setInterval(this.getData, 4000);
    });
  }

  async getData() {
    const { href } = this.props;
    const { reminders } = this.state;

    try {
      const response = await axios.get(href);

      if (JSON.stringify(response.data) !== JSON.stringify(reminders)) {
        toast.dismiss();
        this.setState({ reminders: response.data });
      }
    } catch (error) {
      console.log('failed to get  reminder');
    }
  }

  getDuration = (startDate, startTime, endDate, endTime) => {
    /* eslint-disable prefer-template */
    const nowDateTime = new Date();
    const endDateTime = moment(endDate + ' ' + endTime, 'DD/MM/YYYY HH:mm');

    const diff = endDateTime.toDate() - nowDateTime;
    return diff;
  };

  displayToast = () => {
    const { reminders } = this.state;

    return reminders.forEach(element => {
      toast(
        () => (
          <div>
            <h4>{element.heading}</h4>
            <p>{element.content}</p>
          </div>
        ),
        {
          autoClose: this.getDuration(
            element.startDate,
            element.startTime,
            element.endDate,
            element.endTime
          )
        }
      );
    });
  };

  render() {
    const { reminders } = this.state;
    if (reminders) {
      return (
        <div>
          <ToastContainer autoClose={false}>{this.displayToast()}</ToastContainer>
        </div>
      );
    }
    return (
      <div>
        <h1>No Reminders</h1>
      </div>
    );
  }
}

export default RemindersWidgetContainer;
