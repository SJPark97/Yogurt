import React from 'react';
import LiveCardList from './LiveCardList';
import './LiveCarousel.css';

function LiveCarousel({ lives }) {
  return (
    <div>
      <div className="Carousel">
        {lives.map(live => (
          <LiveCardList live={live} key={live.liveroomId} />
        ))}
      </div>
    </div>
  );
}
export default LiveCarousel;
