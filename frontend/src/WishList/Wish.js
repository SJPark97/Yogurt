import React from 'react';
import dummy from '../db/list.json';
import './Wish.css';

function Wish() {
  const wishlist = dummy.WishLists.filter(wish => wish.post);

  return (
    <div>
      <hr />
      {wishlist.map(wish => (
        <div>
          <div className="wish-post">
            <div className="wish-checkbox">체크박스</div>
            <img
              className="wish-post-img"
              src={wish.post.postimage_url}
              alt="이미지사진"
            />
            <div className="wish-post-info">
              <div className="wish-post-sellername">{wish.post.sellerName}</div>
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
  );
}

export default Wish;
