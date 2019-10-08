import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './GalleryWidget.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import { tenMinutes, tenSeconds } from '../../helper/DateUtils';

class GalleryWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      images: [],
      currentImage: {}
    };

    this.getData = this.getData.bind(this);
    this.getRandomImage = this.getRandomImage.bind(this);
  }

  componentDidMount() {
    this.getData();

    this.interval = setInterval(this.getData, tenMinutes());
    this.timer = setInterval(this.getRandomImage, tenSeconds());
  }

  getData() {
    axios.get(this.props.api).then(images => {
      this.setState({ loading: false, images: images.data });
      // Force Rotate
      this.getRandomImage();
    });
  }

  async getRandomImage() {
    const { images } = this.state;

    let image = _.shuffle(images)[0];

    if (images.length) {
      return this.setState({ currentImage: image });
    }

    return this.setState({
      loading: true
    })
  }

  render() {
    const { loading, currentImage } = this.state;

    if (loading === true) {
      return (
        <div className="image-gallery">
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div className="image-gallery">
        <img src={currentImage.thumbnailLink} alt="Gallery" />
      </div>
    );
  }
}

export default GalleryWidget;
