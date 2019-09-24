import React, { Component } from 'react';
import axios from 'axios';
import './GalleryWidget.scss';

class NewGalleryWidget extends Component {

  constructor() {
    super();

    this.state = {
      urls: [],
      currentImage: 0
    };

    this.getData = this.getData.bind(this);
    this.getRandomImageIndex = this.getRandomImageIndex.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    this.interval = setInterval(this.getRandomImageIndex, 30000);
    this.interval = setInterval(this.getData, 100000);
  }

  getData() {
    axios.get(this.props.api).then((urls) => this.setState({ urls : urls.data }));
  }

  getRandomImageIndex() {
    let index = Math.floor(Math.random() * this.state.urls.length);
    this.setState({ currentImage: index });
  }

  render() {
    let url = this.state.urls[this.state.currentImage];

    return(
      <div className="image-gallery">
        <img src={ url } alt="Gallery" />
      </div>
    );
  }
}

export default NewGalleryWidget;