import React from 'react';
import { useLocation } from 'react-router-dom';
import dummy from '../db/list.json';

function Payment() {
  const location = useLocation();
  const checkItemList = location.state;
  console.log(checkItemList, 'check');
  const wishlist = dummy.WishLists;
  const myresult = wishlist.filter(
    item => checkItemList.filter(wish => console.log(wish, item)).post,
  );

  console.log(myresult, 'wish');

  // {
  //     if (el.wishListId === checkItemList.map(event => event)) {
  //       return el.post;
  //     }
  //   });
  // [3,4]

  return (
    <div>
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
