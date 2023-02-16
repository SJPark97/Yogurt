import React from 'react';
import './Carousel.css';
import CardList from './CardList';

function Carousel({ list }) {
  return (
    <div>
      <div className="Carousel">
        {list.map(data => (
          <div style={{marginRight: '4vw'}} key={data.id}>
          <CardList data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Carousel;
