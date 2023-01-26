import React from 'react';
import './LiveCardList.css';
import dummy from '../../db/list.json';

function LiveCardList() {
  const card = dummy.Goods[0];
  console.log(card);
  return (
    <div className="LiveCard">
      <img
        className="LiveCardLiveImg"
        src="https://i0.wp.com/www.levapelier.com/wp-content/uploads/2016/08/inauguration-retransmise-en-live.png?fit=1200%2C539"
        alt="#"
      />

      <img
        className="LiveCardImg"
        src="https://img.freepik.com/free-photo/wardrobe-with-clothes-on-hangers_23-2149190378.jpg?auto=format&h=200"
        alt="#"
      />
      <div className="LiveCardStoreName">{card.post_store}</div>
      <div className="LiveCardStoreTitle">{card.post_title}</div>
      <div className="LiveCardStoreLive">현재 라이브 방송중</div>
    </div>
  );
}
export default LiveCardList;
