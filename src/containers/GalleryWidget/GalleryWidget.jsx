import React, { Component } from 'react';
import axios from 'axios';
import './GalleryWidget.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import { tenMinutes, tenSeconds } from '../../helper/DateUtils';

class GalleryWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      images: [],
      currentImage: ''
    };

    this.getData = this.getData.bind(this);
    this.rotateCurrentImage = this.rotateCurrentImage.bind(this);
  }

  componentDidMount() {
    this.getData();

    this.interval = setInterval(this.getData, tenMinutes());
    this.timer = setInterval(this.rotateCurrentImage, tenSeconds());
  }

  getData() {
    axios.get(this.props.api).then(images => {
      this.setState({ loading: false, images: images.data });
      // Force Rotate
      this.rotateCurrentImage();
    });
  }

  rotateCurrentImage() {
    const { images, currentImage } = this.state;

    if (images.length) {
      const currentIndex = images.indexOf(currentImage);

      if (currentIndex !== images.length - 1) {
        this.setState({ currentImage: images[currentIndex + 1].thumbnailLink });
      }
      // Reset to the first image
      this.setState({ currentImage: images[0].thumbnailLink });
    }
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
        <img src={currentImage} alt="Gallery" />
      </div>
    );
  }
}

export default GalleryWidget;
