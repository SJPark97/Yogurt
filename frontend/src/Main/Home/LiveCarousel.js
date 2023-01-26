import React from 'react';
import LiveCardList from './LiveCardList';
import './LiveCarousel.css';

function LiveCarousel() {
  return (
    <div>
      <div className="Carousel">
        <LiveCardList />
        <LiveCardList />
        <LiveCardList />
        <LiveCardList />
        <LiveCardList />
        <LiveCardList />
      </div>
    </div>
  );
}
export default LiveCarousel;
