import React from 'react';
import './Carousel.css';
import CardList from './CardList';

function Carousel(props) {
  const { card } = props;
  return (
    <div>
      <div className="Carousel">
        {card.map(data => (
          <CardList data={data} key={data.postId} />
        ))}
      </div>
    </div>
  );
}
export default Carousel;
