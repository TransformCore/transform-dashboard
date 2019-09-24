import React, { Component } from 'react';
import LastUpdatedStatus from './LastUpdatedStatus';
import './Heading.scss';

const displayHeading = (
  headingText,
  headingTitleColor,
  lastUpdatedStatusTime
) => {
  if (headingText && lastUpdatedStatusTime) {
    return (
      <div>
        <LastUpdatedStatus lastUpdatedStatusTime={lastUpdatedStatusTime} />
        <h2 style={{ color: headingTitleColor }}>{headingText}</h2>
      </div>
    );
  }
  if (lastUpdatedStatusTime) {
    return <LastUpdatedStatus lastUpdatedStatusTime={lastUpdatedStatusTime} />;
  }
  if (!lastUpdatedStatusTime) {
    return <h2 className="heading-title">{headingText}</h2>;
  }
  return <div />;
};

class Heading extends Component {
  shouldComponentUpdate(prevProps) {
    const { lastUpdatedStatusTime } = this.props;
    if (lastUpdatedStatusTime !== prevProps.lastUpdatedStatusTime) {
      return true;
    }
    return false;
  }

  render() {
    const {
      headingTitle,
      headingTitleColor,
      backgroundColor,
      lastUpdatedStatusTime
    } = this.props;
    return (
      <div
        className="widget-heading"
        style={{ width: '100%', backgroundColor, color: headingTitleColor }}
      >
        {displayHeading(headingTitle, headingTitleColor, lastUpdatedStatusTime)}
      </div>
    );
  }
}

export default Heading;
