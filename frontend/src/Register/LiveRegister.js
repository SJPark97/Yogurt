import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import BackToTop from '../AppBar/BackToTop';
import Divider from '@mui/material/Divider';
import FormData from 'form-data';
import './LiveRegister.css';
import axios from 'axios';

function LiveRegister() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [time, setTime] = useState(Date());
  const [postIds, setPostIds] = useState([]);
  const [imageUpload, setImageUpload] = useState('');

  const handleDeleteIamge = () => {
    URL.revokeObjectURL(image);
    setImage(null);
  };

  const token = loginUser.token;
  const sellerId = loginUser.loginUserPk;

  const handleFormData = event => {
    const formData = new FormData();
    formData.append('images', event);
    setImageUpload(formData);
  };

  useEffect(() => {
    axios
      .get(`https://i8b204.p.ssafy.io/be-api/post/user/${sellerId}`)
      .then(res => {
        const posts = res.data[0].posts.filter(
          post => post.status === 'STATUS_LIVE_SOON',
        );
        const livePost = posts.map(post => post.id);
        setPostIds(livePost);
      });
  }, [sellerId]);

  const submitHandler = event => {
    event.preventDefault();
    navigate(`/profile/seller/${sellerId}`);

    axios
      .post('https://i8b204.p.ssafy.io/be-api/upload', imageUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => {
        const data = {
          title,
          thumbnail: res.data[0],
          time,
          postIds
        };

        console.log(data)
        axios
          .post(`https://i8b204.p.ssafy.io/be-api/live`, data, {
            headers: { Authorization: token },
          })
          .catch(err => console.log(err))
          .then(res => {
            axios
              .post(
                'https://i8b204.p.ssafy.io/be-api/buyer_alarm',
                {},
                {
                  headers: { Authorization: token },
                },
              )
              .catch(err => console.log(err));
          });
      })
      .catch(err => console.log(err));

    return false;
  };

  return (
    <div className="live-register">
      <BackToTop />
      <form onSubmit={submitHandler}>
        <div className="live_reg_title">
          <p>라이브 룸 제목</p>
          <input
            type="text"
            id="live_reg_title"
            name="title"
            placeholder="라이브 제목을 입력해주세요"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="live_reg_file">
          <p>라이브 대표 사진 등록</p>
          <input
            type="file"
            id="live_reg_file"
            accept="image/*"
            onChange={event => {
              handleFormData(event.target.files[0]);
              setImage(URL.createObjectURL(event.target.files[0]));
            }}
          />
          {!image && <label htmlFor="live_reg_file">+</label>}
          <div>
            {image && (
              <div>
                <img src={image} alt="메인사진" />
                <button type="button" onClick={() => handleDeleteIamge()}>
                  X
                </button>
              </div>
            )}
          </div>
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="live_reg_time">
          <p>라이브 예정 시간</p>
          <input
            type="datetime-local"
            id="live_reg_time"
            name="time"
            onChange={event => setTime(event.target.value)}
          />
        </div>
        <div className="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default LiveRegister;
