import React from 'react';

function SearchCard({ result }) {
  const discount = Math.floor(
    ((result.post_price - result.post_sale_price) / result.post_price) * 100,
  );

  return (
    <div className="searchCard">
      <img className="searchCardImg" src={result.image} alt="#" />
      <div className="searchCardStore">{result.post_store}</div>
      <div className="searchCardName">[브랜드]{result.post_title}</div>
      <div className="searchCardTag">
        {discount ? (
          <div className="searchCardDiscount">{discount}%</div>
        ) : null}
        <div className="searchCardPrice">
          {result.post_sale_price.toLocaleString()}
        </div>
        <div className="searchCardBeforePrice">
          {result.post_price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
export default SearchCard;
