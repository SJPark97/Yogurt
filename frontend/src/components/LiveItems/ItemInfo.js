import * as React from 'react';
import axios from 'axios';
import './ItemInfo.css';

export default function ItemInfo(props) {
  const { item, num, owner } = props;
  const percent = Math.floor(
    ((item.item_price - item.item_sale_price) / item.item_price) * 100,
  );
  const token =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVVlFUiIsInVzZXJJZCI6InllYXIxMjMiLCJleHAiOjE2NzYyNDk4OTV9.s9hdTB7D0ak30LFqbXfszM9DvIrFHsnAQ9Kjn7QQLDw  ';

  const wishPost = () => {
    axios
      .post(`https://i8b204.p.ssafy.io/be-api/wishlist/${item.post_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => alert('상품이 장바구니에 담겼습니다.'))
      .catch(err => alert('상품이 이미 장바구니에 있습니다.'));
  };

  return (
    <div>
      <h2 id="item-number">상품 {num + 1}</h2>
      <div id="live-item-info">
        <img id="item-thumbnail" src={item.item_thumbnail} alt="#" />
        <div id="item-infomations">
          <p id="item-title">{item.item_title}</p>
          <div id="item-price-info">
            <p id="item-percent">{percent}%</p>
            <p id="item-sale-price">{item.item_sale_price.toLocaleString()}원</p>
            <p id="item-price">{item.item_price.toLocaleString()}원</p>
          </div>
        </div>
      </div>
      {owner && item.item_state === 0 ? <button id="button-sell-start">판매시작</button> : null}
      {owner && item.item_state === 1 ? <button id="button-sell-ing">판매중</button> : null}
      {item.item_state === 2 ? <button id="button-sell-end">판매완료</button> : null}
      {!owner && item.item_state === 0 ? <button id="button-sell-waitting">라이브 대기중</button> : null}
      {!owner && item.item_state === 1 ? <button id="button-sell-buy">구매하기</button> : null}
      {!owner && item.item_state === 1 ? <button id="button-sell-basket" onClick={wishPost}>장바구니</button> : null}
      <hr id="live-hr-tag"/>
    </div>
  );
}
