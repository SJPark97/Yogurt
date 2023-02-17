import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackToTop from '../AppBar/BackToTop';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const loginUser = useSelector(state => state.user.value);
  const { checkItems, totalPrice } = location.state;
  const [post, setPost] = useState([]);
  const [postIdList, setPostIdList] = useState([]);
  const [address, setAddress] = useState('');
  const token = loginUser.token;

  const data = {
    totalAmount: String(totalPrice),
    address,
    postIdList,
  };

  const handleClick = () => {
    axios
      .post('https://i8b204.p.ssafy.io/be-api/kakaoPay', data)
      .then(res => window.open(res.data));
  };

  useEffect(() => {
    axios
      .get('https://i8b204.p.ssafy.io/be-api/wishlist', {
        headers: { Authorization: token },
      })
      .then(res => {
        const wishpost = res.data.wishLists.filter(wish =>
          checkItems.includes(wish.wishListId),
        );
        const postData = wishpost.map(item => item.post);
        setPost(postData);
        const postIdData = postData.map(item => ({ id: item.id }));
        setPostIdList(postIdData);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="payment-wrap">
      <BackToTop />
      <div className="pay-total">
        <p>주문 상품 총 {checkItems.length}개</p>
        <Divider sx={{ marginY: '1rem' }} />
        {checkItems.length > 0 &&
          post.map(pay => (
            <div key={pay.id}>
              <div className="pay-post">
                <div className="pay-post-img-div">
                  <img
                    className="pay-post-img"
                    src={pay.postImages[0].url}
                    alt="이미지사진"
                  />
                </div>
                <div className="pay-post-info">
                  <div className="pay-post-sellername">{pay.nickName}</div>
                  <div className="pay-post-title">{pay.title}</div>
                  <div className="pay-post-price">
                    {pay.sale_price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Divider sx={{ marginY: '1rem' }} />
      <div className="pay-deliver">
        <p>배송지 정보</p>
        <textarea
          name="배송지정보"
          id="deilver"
          placeholder="주소를 입력하세요"
          onChange={event => setAddress(event.target.value)}
        />
      </div>
      <Divider sx={{ marginY: '1rem' }} />
      <div className="pay-total-price">
        <div>결제하기</div>
        <div className="pay-price">{totalPrice.toLocaleString()} 원</div>
      </div>
      <Divider sx={{ marginY: '1rem' }} />
      <div className="pay-kakao">
        <p>카카오페이로 결제하기</p>
        <img
          src="https://img.etoday.co.kr/pto_db/2020/10/600/20201023101423_1528745_1200_738.jpg"
          alt="카카오페이로 결제하기"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  );
}

export default Payment;
