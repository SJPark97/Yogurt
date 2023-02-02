import React from 'react';
import { useLocation } from 'react-router-dom';
import dummy from '../db/list.json';

function Payment() {
  const location = useLocation();
  const checkItemList = location.state;
  const wishlist = dummy.WishLists.filter(el =>
    console.log(el.wishListId in checkItemList),
  );

  return (
    <div>
      <div>결제는 밥먹고와서하자,,,, props랑 넘길려면</div>;
      <div>일단 넘어온 list에서 추리기</div>
      <div>
        {wishlist.map(wish => (
          <div>
            <div className="wish-post">
              <div className="wish-post-img-div">
                <img
                  className="wish-post-img"
                  src={wish.post.postimage_url}
                  alt="이미지사진"
                />
              </div>
              <div className="wish-post-info">
                <div className="wish-post-sellername">
                  {wish.post.sellerName}
                </div>
                <div className="wish-post-title">{wish.post.post_title}</div>
                <div className="wish-post-price">
                  {wish.post.post_sale_price.toLocaleString()}원
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payment;
