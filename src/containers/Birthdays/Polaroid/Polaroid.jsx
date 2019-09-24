import React from 'react';
import './Polaroid.scss';
import defaultPhoto from '../assets/avatar.png';

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Polaroid = ({ data }) => {
  const rotation = randomIntBetween(5, -5);
  if (data.photoUrl !== null) {
    // has a photo
    return (
      <div className="polaroid-container">
        <div
          className="polaroid"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img className="photo" src={data.photoUrl} alt="Lucky fellow" />
          <h4>{data.name}</h4>
        </div>
      </div>
    );
  }
  return (
    <div className="polaroid-container">
      <div className="polaroid" style={{ transform: `rotate(${rotation}deg)` }}>
        <img className="photo" src={defaultPhoto} alt="Lucky fellow" />
        <h4>{data.name}</h4>
      </div>
    </div>
  );
};

export default Polaroid;
