import React from 'react';
import { Link } from 'react-router-dom';
import './CardList.css';

function CardList(props) {
  const { data } = props;
  const discount = Math.floor(
    ((data.post_price - data.post_sale_price) / data.post_price) * 100,
  );

  return (
    <div className="Card">
      <Link to={'/video'}>
        <img className="CardImg" src={data.postimage_url} alt="#" />
        <div className="CardBrand">{data.br_cateName}</div>
        <div className="CardName">{data.post_title}</div>
        {discount ? <div className="CardDiscount">{discount}%</div> : null}
        <div className="CardPrice">
          {data.post_sale_price.toLocaleString()}원
        </div>
      </Link>
    </div>
  );
}
export default CardList;
