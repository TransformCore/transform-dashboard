import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loading from '../elements/Loading';
import Heading from './Heading';

import '../styles/Widget.scss';

class Widget extends Component {
  constructor(props) {
    super(props);

    this.spanStyles = {};

    if (props.colspan !== 1) {
      this.spanStyles.gridColumn = `span ${props.colspan}`;
    }
    if (props.rowspan !== 1) {
      this.spanStyles.gridRow = `span ${props.rowspan}`;
    }
  }

  render() {
    const { loading, children, heightSize, bkColor, heading } = this.props;

    const colors = () => {
      if (bkColor === 'black') {
        return classNames({
          Widget,
          blackBackground: true
        });
      }
      if (bkColor === 'white') {
        return classNames({
          Widget,
          whiteBackground: true
        });
      }
      if (bkColor === 'blue') {
        return classNames({
          Widget,
          blueBackground: true
        });
      }
      return classNames({
        Widget
      });
    };

    const getHeight = () => {
      if (heightSize === 'half') {
        return '8em';
      }
      if (heightSize === 'full') {
        return '21em';
      }
      return '';
    };

    const styles = {
      height: getHeight()
    };

    if (!heading) {
      return <div className="content">{children}</div>;
    }
    const {
      headingTitle,
      headingTitleColor,
      headingBackgroundColor,
      lastUpdatedStatusTime
    } = heading;

    return (
      <div style={Object.assign({}, styles)} className={colors()}>
        <div className="header">
          <Heading
            headingTitle={headingTitle}
            headingTitleColor={headingTitleColor}
            backgroundColor={headingBackgroundColor}
            lastUpdatedStatusTime={lastUpdatedStatusTime}
          />
          {loading ? <Loading /> : ''}
        </div>
        <div className="content">{children}</div>
      </div>
    );
  }
}

Widget.defaultProps = {
  colspan: 1,
  rowspan: 1
};

Widget.propTypes = {
  colspan: PropTypes.number,
  rowspan: PropTypes.number
};

export default Widget;
