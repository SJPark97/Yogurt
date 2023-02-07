import React from 'react';
import './LiveCardList.css';

function LiveCardList(props) {
  const { data } = props;
  return (
    <div className="LiveCard">
      <div className="LiveCardLiveTag">
        <div>LIVE</div>
      </div>

      <img className="LiveCardImg" src={data.liveroom_thumbnail} alt="#" />
      <div className="LiveCardStoreName">{data.liveroom_shop_name}</div>
      <div className="LiveCardStoreTitle">{data.liveroom_title}</div>
    </div>
  );
}
export default LiveCardList;
