import React from 'react';
import './Carousel.css';
import CardList from './CardList';

function Carousel({ list }) {
  return (
    <div>
      <div className="Carousel">
        {list.map(data => (
          <CardList data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}
export default Carousel;
