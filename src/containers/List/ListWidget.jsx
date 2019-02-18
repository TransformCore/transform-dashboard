import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListDisplay from './ListDisplay';
import ListItem from './ListItem';
import './ListWidget.css';

class ListWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNewsItem: 0
    };

    this.rotateNewsItem = this.rotateNewsItem.bind(this);
  }

  componentWillMount() {
    this.rotateNewsItem();
  }

  componentDidMount() {
    this.rotateNewsItem().then(_ => {
      this.interval = setInterval(this.rotateNewsItem, 30000);
    });
  }

  sortListItems() {
    const { listItems } = this.props;
    const sortedItems = listItems.slice();
    return sortedItems;
  }

  async rotateNewsItem() {
    const { currentNewsItem } = this.state;
    const { listItems } = this.props;

    let newNewsItem = currentNewsItem;

    if (currentNewsItem < listItems.length - 1) {
      newNewsItem += 1;
    } else {
      newNewsItem = 0;
    }

    this.setState({
      currentNewsItem: newNewsItem
    });
  }

  showWidget() {
    const { currentNewsItem } = this.state;
    const { listItems } = this.props;

    const sortedItems = this.sortListItems();

    if (listItems.length === 0) {
      return null;
    }

    const min = 0;
    const max = sortedItems[0].value;

    const item = listItems[currentNewsItem];

    return (
      <ListDisplay>
        <ListItem
          key={item.label}
          label={item.label}
          value={item.value}
          min={min}
          max={max}
          imageUrl={item.imageUrl}
        />
      </ListDisplay>
    );
  }

  render() {
    const { bkColor } = this.props;
    const colors = () => {
      if (bkColor === 'pink') {
        return classNames({
          ListWidget: true,
          Widget: true,
          pinkBackground: true
        });
      }
      return classNames({
        ListWidget: true
      });
    };
    return <div className={colors()}>{this.showWidget()}</div>;
  }
}

ListWidget.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object)
};

ListWidget.defaultProps = {
  listItems: {}
};

export default ListWidget;
