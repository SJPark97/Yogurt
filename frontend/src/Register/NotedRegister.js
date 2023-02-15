// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import BackToTop from '../AppBar/BackToTop';
import './NotedRegister.css';
import axios from 'axios';

function PostRegister() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const token = loginUser.token;
  const sellerId = loginUser.loginUserpk;

  const submitHandler = event => {
    event.preventDefault();
    navigate(`/profile/seller/${sellerId}?tab=2`);
    const data = {
      title,
      content,
    };

    axios
      .post(`https://i8b204.p.ssafy.io/be-api/notice`, data, {
        headers: { Authorization: token },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return false;
  };

  return (
    <div className="postregister">
      <BackToTop />
      <form onSubmit={submitHandler}>
        <div className="noted_reg_title">
          <p>공지 제목</p>
          <input
            type="text"
            id="noted_reg_title"
            name="title"
            placeholder="공지 제목을 입력해주세요"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="noted_reg_detail">
          <p>공지 내용</p>
          <textarea
            id="noted_reg_detail"
            name="size"
            placeholder="공지사항을 적어주세요&#13;&#10;알아둬야 될 사항을 적어주세요"
            onChange={event => setContent(event.target.value)}
          />
        </div>
        <div className="submit_btn">
          <button
            type="submit"
            style={{
              backgroundColor: '#deb887',
              border: 'none',
              width: '20vw',
              height: '10vw',
              borderRadius: '8px',
              color: 'white',
            }}
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostRegister;
