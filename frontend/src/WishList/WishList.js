import React, { useState } from 'react';
import dummy from '../db/list.json';
import './WishList.css';

function WishList() {
  const wishlist = dummy.WishLists.filter(wish => wish.post);

  const [checkItems, setCheckItems] = useState([]);

  const SingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const AllCheck = checked => {
    if (checked) {
      const idArray = [];
      wishlist.forEach(el => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        name="select-all"
        onChange={event => AllCheck(event.target.checked)}
        checked={checkItems.length === wishlist.length}
      />
      <hr />
      {wishlist.map(wish => (
        <div>
          <div className="wish-post">
            <div className="wish-checkbox">
              <input
                type="checkbox"
                name={`select-${wish.post.id}`}
                onChange={event =>
                  SingleCheck(event.target.checked, wish.post.id)
                }
                checked={checkItems.includes(wish.post.id)}
              />
            </div>
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
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishList;
