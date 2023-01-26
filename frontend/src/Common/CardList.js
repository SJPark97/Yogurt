import React from 'react';
import './CardList.css';

function CardList() {
  return (
    <div className="Card">
      <img
        className="CardImg"
        src="https://img.freepik.com/free-photo/wardrobe-with-clothes-on-hangers_23-2149190378.jpg?auto=format&h=200"
        alt="#"
      />
      <div className="CardBrand">브랜드드드드드드드</div>
      <div className="CardName">상품명</div>
      <div className="CardDiscount">30%</div>
      <div className="CardPrice">106,000원</div>
    </div>
  );
}
export default CardList;
