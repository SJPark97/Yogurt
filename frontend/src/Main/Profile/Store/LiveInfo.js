import React from 'react';
import dummy from '../../../db/list.json';
import './LiveInfo.css';

function LiveInfo() {
  const mylive = dummy.Live[0];
  const livepost = dummy.Goods.filter(item => item.post_status === 2);

  return (
    <div>
      <div className="liveinfo-info">
        <img src={mylive.liveroom_thumbnail} alt="라이브대표이미지" />
        <p>{mylive.liveroom_title}</p>
      </div>
      <div className="liveinfo-postinfo">
        <hr />
        <p>라이브 예정 상품</p>
        {livepost.map(wish => (
          <div key={wish.postId} className="liveinfo-post">
            <div className="liveinfo-post-img-div">
              <img
                className="liveinfo-post-img"
                src={wish.image}
                alt="이미지사진"
              />
            </div>
            <div className="liveinfo-post-info">
              <p>{wish.post_title}</p>
              <div className="liveinfo-price">
                {wish.post_price - wish.post_sale_price ? (
                  <div className="liveinfo-sale-percent">
                    {Math.floor(
                      ((wish.post_price - wish.post_sale_price) /
                        wish.post_price) *
                        100,
                    )}
                    %
                  </div>
                ) : null}
                <div className="liveinfo-post-sale-price">
                  {wish.post_sale_price.toLocaleString()}원
                </div>
                <div className="liveinfo-post-price">
                  {wish.post_price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveInfo;
