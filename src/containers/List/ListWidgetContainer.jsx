import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ListWidget from './ListWidget';
import './ListWidget.scss';
import Widget from '../../components/Widget';

class ListWidgetContainer extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      values: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    this.getData().then(_ => {
      this.interval = setInterval(this.getData, 60000);
    });
  }

  async getData() {
    this.setState({ loading: true });
    const { href } = this.props;

    const now = new Date();

    if (now.getHours() >= 8 && now.getHours() < 19) {
      try {
        const response = await axios.get(href);
        if (response.data.length === 0) {
          this.setState({
            loading: false,
            values: [{ content: 'No Team News at the moment' }]
          });
        } else {
          this.setState({ loading: false, values: response.data });
        }
      } catch (error) {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { heading, colspan, rowspan } = this.props;
    const { values, loading } = this.state;

    const headingProps = {
      headingTitle: heading,
      headingTitleColor: '#43ab9b',
      headingBackgroundColor: 'white'
    };

    return (
      <Widget heading={headingProps}>
        <ListWidget
          colspan={colspan}
          rowspan={rowspan}
          listItems={values}
          loading={loading}
        />
      </Widget>
    );
  }
}

ListWidgetContainer.propTypes = {
  heading: PropTypes.string,
  colspan: PropTypes.number,
  rowspan: PropTypes.number,
  href: PropTypes.string.isRequired
};

ListWidgetContainer.defaultProps = {
  heading: 'Unnamed Widget',
  colspan: 1,
  rowspan: 1
};

export default ListWidgetContainer;
