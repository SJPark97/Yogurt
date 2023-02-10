import { Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTop from '../AppBar/BackToTop';
import axios from 'axios';
import './WishList.css';

function WishList() {
  const navigate = useNavigate();
  const [wishlist, setWishList] = useState([]);

  const token2 =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVVlFUiIsInVzZXJJZCI6InllYXIxMjMiLCJleHAiOjE2NzYyNDk4OTV9.s9hdTB7D0ak30LFqbXfszM9DvIrFHsnAQ9Kjn7QQLDw  ';

  useEffect(() => {
    axios
      .get('https://i8b204.p.ssafy.io/be-api/wishlist', {
        headers: { Authorization: token2 },
      })
      .then(res => {
        setWishList(res.data.wishLists);
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allcheck = wishlist.map(el => el.wishListId);
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    setCheckItems(allcheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  const totalwishprice = wishlist.map(el => el.post.sale_price);
  const priceTotal = totalwishprice.reduce((a, b) => a + b, 0);

  const [totalPrice, setTotalPrice] = useState(priceTotal);

  const SingleCheck = (checked, id, price) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
      setTotalPrice(totalPrice + price);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
      setTotalPrice(totalPrice - price);
    }
  };

  const AllCheck = checked => {
    if (checked) {
      setCheckItems(allcheck);
      setTotalPrice(priceTotal);
    } else {
      setCheckItems([]);
      setTotalPrice(0);
    }
  };

  return (
    <div>
      <BackToTop />
      <div className="wish-select-all">
        <input
          type="checkbox"
          onChange={event => AllCheck(event.target.checked)}
          checked={checkItems.length === wishlist.length}
        />
        <span>
          {checkItems.length === wishlist.length ? '전체 해제' : '전체 선택'}
        </span>
      </div>
      <Divider variant="middle" sx={{ marginY: '0.75rem' }} />
      <div>
        {wishlist.map(wish => (
          <div key={wish.wishListId}>
            <div className="wish-post">
              <div className="wish-checkbox">
                <input
                  type="checkbox"
                  onChange={event =>
                    SingleCheck(
                      event.target.checked,
                      wish.wishListId,
                      wish.post.sale_price,
                    )
                  }
                  checked={checkItems.includes(wish.wishListId)}
                />
              </div>
              <div className="wish-post-img-div">
                <img
                  className="wish-post-img"
                  src={wish.post.postImages[0].url}
                  alt="이미지사진"
                />
              </div>
              <div className="wish-post-info">
                <div className="wish-post-sellername">
                  {wish.post.sellerName}
                </div>
                <div className="wish-post-title">{wish.post.title}</div>
                <div className="wish-post-price">
                  {wish.post.sale_price.toLocaleString()}원
                </div>
              </div>
            </div>
            <Divider variant="middle" sx={{ marginY: '0.75rem' }} />
          </div>
        ))}
        <div className="wish-total-price">
          결제 예상 금액
          <span>{totalPrice.toLocaleString()}</span>원
        </div>
        <Divider variant="middle" sx={{ marginY: '0.75rem' }} />
        <button
          className="wish-payment-btn"
          type="submit"
          onClick={() =>
            navigate('/payment', {
              state: { checkItems, totalPrice },
            })
          }
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

export default WishList;
