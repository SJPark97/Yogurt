import React from 'react';
import './LiveCardList.css';

function LiveCardList(props) {
  const { data } = props;
  return (
    <div className="LiveCard">
      <img
        className="LiveCardLiveImg"
        src="https://i0.wp.com/www.levapelier.com/wp-content/uploads/2016/08/inauguration-retransmise-en-live.png?fit=1200%2C539"
        alt="#"
      />

      <img className="LiveCardImg" src={data.liveroom_thumbnail} alt="#" />
      <div className="LiveCardStoreName">{data.liveroom_shop_name}</div>
      <div className="LiveCardStoreTitle">{data.liveroom_title}</div>
      <div className="LiveCardStoreLive">현재 라이브 방송중</div>
    </div>
  );
}
export default LiveCardList;
