import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardList.css';

function CardList({ data }) {
  const discount = Math.floor(
    ((data.price - data.sale_price) / data.price) * 100,
  );

  const navigate = useNavigate();

  return (
    <div
      className="Card"
      role="presentation"
      onClick={() => {
        navigate(`/post/${data.id}`);
      }}
    >
      <img className="CardImg" src={data.postImages[0].url} alt="#" />
      <div className="CardBrand">{data.sellerName}</div>
      <div className="CardName">
        [{data.brCateName}] {data.title}
      </div>
      {discount ? <div className="CardDiscount">{discount}%</div> : null}
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div className="CardPrice">{data.sale_price.toLocaleString()}</div>
        <div className="CardSalePrice">{data.price.toLocaleString()}</div>
      </div>
    </div>
  );
}
export default CardList;
