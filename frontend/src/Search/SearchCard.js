import React from 'react';
import './SearchCard.css';

function SearchCard({ result, navigate }) {
  const discount = Math.floor(
    ((result.price - result.sale_price) / result.price) * 100,
  );

  const handleClick = () => {
    navigate(`/post/${result.id}`);
  };

  return (
    <div className="searchCard" role="presentation" onClick={handleClick}>
      <img className="searchCardImg" src={result.postImages[0].url} alt="#" />
      <div className="searchCardStore">{result.sellerName}</div>
      <div className="searchCardName">
        [{result.brCateName}]{result.title}
      </div>
      <div className="searchCardTag">
        {discount ? (
          <div className="searchCardDiscount">{discount}%</div>
        ) : null}
        <div className="searchCardPrice">
          {result.sale_price.toLocaleString()}
        </div>
        <div className="searchCardBeforePrice">
          {result.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
export default SearchCard;
