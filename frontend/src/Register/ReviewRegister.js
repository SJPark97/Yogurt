import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import BackToTop from '../AppBar/BackToTop';
import './ReviewRegister.css';

import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ReviewRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state;
  const loginUser = useSelector(state => state.user.value);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(5);

  const buyerId = loginUser.loginUserPk;
  const token = loginUser.token;

  const submitHandler = event => {
    event.preventDefault();
    navigate(`/profile/buyer/${buyerId}?tab=3`);

    const data = {
      title,
      content,
      rate,
    };

    axios
      .post(`https://i8b204.p.ssafy.io/be-api/review/${postId}`, data, {
        headers: { Authorization: token },
      })
    // .then(res => console.log(res))
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
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">별점</InputLabel>
            <Select
              name="rate"
              onChange={event => setRate(event.target.value)}
              value={rate}
              label="별점"
              className="review_reg_num"
            >
              <MenuItem value={1}>1점</MenuItem>
              <MenuItem value={2}>2점</MenuItem>
              <MenuItem value={3}>3점</MenuItem>
              <MenuItem value={4}>4점</MenuItem>
              <MenuItem value={5}>5점</MenuItem>
            </Select>
          </FormControl>
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
          <button
            type="submit"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewRegister;
