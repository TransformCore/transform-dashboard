import React, { Component } from 'react';
import axios from 'axios';
import './GalleryWidget.scss';

class GalleryWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      urls: [],
      currentImage: 0
    };

    this.getData = this.getData.bind(this);
    this.getRandomImageIndex = this.getRandomImageIndex.bind(this);

    this.getData();
  }

  componentDidMount() {
    this.interval = setInterval(this.getRandomImageIndex, 30000);
    this.interval = setInterval(this.getData, 1000 * 60 * 10);
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

    if(url !== undefined)
      url = url.concat('?key=', process.env.REACT_APP_GOOGLE_DRIVE_API_KEY);

    return(
      <div className="image-gallery">
        <img src={ url } alt="Gallery"/> { /* TODO: add Alexs' loader widget whenever img fires onError */ }
      </div>
    );
  }
}

export default GalleryWidget;