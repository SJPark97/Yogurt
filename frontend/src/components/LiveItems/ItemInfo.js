import * as React from 'react';
import './ItemInfo.css';

export default function ItemInfo(props) {
  const { item, num, owner } = props;
  const percent = Math.floor(
    ((item.item_price - item.item_sale_price) / item.item_price) * 100,
  );
  return (
    <div>
      <h2 id="item-number">상품 {num + 1}</h2>
      <div id="live-item-info">
        <img id="item-thumbnail" src={item.item_thumbnail} alt="#" />
        <div id="item-infomations">
          <p id="item-title">{item.item_title}</p>
          <div id="item-price-info">
            <p id="item-percent">{percent}%</p>
            <p id="item-sale-price">{item.item_sale_price}</p>
            <p id="item-price">{item.item_price}</p>
          </div>
        </div>
      </div>
      {owner && item.item_state === 0 ? <button id="button-sell-start">판매시작</button> : null}
      {owner && item.item_state === 1 ? <button id="button-sell-ing">판매중</button> : null}
      {item.item_state === 2 ? <button id="button-sell-end">판매완료</button> : null}
      {!owner && item.item_state === 0 ? <button id="button-sell-waitting">라이브 대기중</button> : null}
      {!owner && item.item_state === 1 ? <button id="button-sell-buy">구매하기</button> : null}
      {!owner && item.item_state === 1 ? <button id="button-sell-basket">장바구니</button> : null}
    </div>
  );
}
