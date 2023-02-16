import { Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackToTop from '../AppBar/BackToTop';
import axios from 'axios';
import './WishList.css';

function WishList() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const [wishlist, setWishList] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = loginUser.token;

  useEffect(() => {
    if (token) {
      axios
        .get('https://i8b204.p.ssafy.io/be-api/wishlist', {
          headers: { Authorization: token },
        })
        .then(res => {
          setWishList(res.data.wishLists);
        })
    }
  }, [setWishList, token]);

  const allcheck = wishlist.map(el => el.wishListId);

  const totalwishprice = wishlist.map(el => el.post.sale_price);
  const priceTotal = totalwishprice.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setCheckItems(allcheck);
    setTotalPrice(priceTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

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
    <div className="wish">
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
              <img
                className="wish-post-img"
                src={wish.post.postImages[0].url}
                alt="이미지사진"
              />
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
          style={{
            backgroundColor: '#deb887',
            border: 'none',
            width: '20vw',
            height: '10vw',
            borderRadius: '8px',
            color: 'white',
          }}
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
