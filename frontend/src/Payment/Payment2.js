import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackToTop from '../AppBar/BackToTop';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import './Payment.css';

function Payment2() {
  const location = useLocation();
  const { checkItems, totalPrice, post } = location.state;
  const [address, setAddress] = useState('');
  const [postIdList, setPostIdList] = useState([]);

  useEffect(() => {
    setPostIdList([{ id: post.id }]);
  }, [post]);

  const data = {
    totalAmount: String(totalPrice),
    address,
    postIdList,
  };

  const handleClick = () => {
    axios
      .post('https://i8b204.p.ssafy.io/be-api/kakaoPay', data)
      .then(res => {
        // console.log(res)
        window.open(res.data, "_self")
      })
  };
  return (
    <div className="payment-wrap">
      <BackToTop />
      <div className="pay-total">
        <p>주문 상품 총 {checkItems.length}개</p>
        <Divider sx={{ marginY: '1rem' }} />
        <div key={post.id}>
          <div className="pay-post">
            <div className="pay-post-img-div">
              <img
                className="pay-post-img"
                src={post.postImages[0].url}
                alt="이미지사진"
              />
            </div>
            <div className="pay-post-info">
              <div className="pay-post-sellername">{post.nickName}</div>
              <div className="pay-post-title">{post.title}</div>
              <div className="pay-post-price">
                {post.sale_price.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
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
          height="100px"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  );
}

export default Payment2;
