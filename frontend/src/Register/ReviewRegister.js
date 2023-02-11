import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import BackToTop from '../AppBar/BackToTop';
import './ReviewRegister.css';
import axios from 'axios';

function ReviewRegister() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(5);

  const submitHandler = event => {
    event.preventDefault();
    navigate('/profile/buyer?tab=3');

    const token1 =
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9TRUxMRVIiLCJ1c2VySWQiOiJtb29uMTIzIiwiZXhwIjoxNjc2MzYyNDU2fQ.xgiO48lLc2LPWxiXnSWKrJVeFRvfERhahIdKnN266m4';

    const data = {
      title,
      content,
      rate,
    };

    axios
      .post(`https://i8b204.p.ssafy.io/be-api/review`, data, {
        headers: { Authorization: token1 },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="reviewregister">
      <BackToTop />
      <form onSubmit={submitHandler}>
        <div className="review_reg_title">
          <p>리뷰 제목</p>
          <input
            type="text"
            id="review_reg_title"
            name="title"
            placeholder="리뷰 제목을 입력해주세요"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <Divider variant="middle" />
        <div className="review_reg_star">
          <p> 별점</p>
          <select
            name="rate"
            onChange={event => setRate(event.target.value)}
            value={rate}
            className="review_reg_num"
          >
            <option value="1">1 </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <Divider variant="middle" />
        <div className="review_reg_detail">
          <p>리뷰 내용</p>
          <textarea
            id="review_reg_detail"
            name="size"
            placeholder="리뷰 내용을 적어주세요&#13;&#10;배송의 상태, 판매자의 응대 등에 대해 적어주세요"
            onChange={event => setContent(event.target.value)}
          />
        </div>
        <div id="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewRegister;
