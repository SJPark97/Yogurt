import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import FormData from 'form-data';
import axios from 'axios';

import BackToTop from '../AppBar/BackToTop';
import CardList from '../Common/CardList';
import './LiveRegister.css';

import Divider from '@mui/material/Divider';

function LiveRegister() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [time, setTime] = useState(Date());
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const [imageUpload, setImageUpload] = useState('');

  const token = loginUser.token;
  const sellerId = loginUser.loginUserPk;

  const handleDeleteIamge = () => {
    URL.revokeObjectURL(image);
    setImage(null);
  };

  const handleFormData = event => {
    const formData = new FormData();
    formData.append('images', event);
    setImageUpload(formData);
  };

  // 라이브 할 상품 선택하기
  useEffect(() => {
    axios
      .get(`https://i8b204.p.ssafy.io/be-api/post/user/${sellerId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        setPosts(res.data[0].posts);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerId]);

  const allcheck = posts.map(el => el.id);

  useEffect(() => {
    setPostIds(allcheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const SingleCheck = (checked, id) => {
    if (checked) {
      setPostIds(prev => [...prev, id]);
    } else {
      setPostIds(postIds.filter(el => el !== id));
    }
  };

  const AllCheck = checked => {
    if (checked) {
      setPostIds(allcheck);
    } else {
      setPostIds([]);
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    navigate(`/`);

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
          postIds,
        };

        axios
          .post(`https://i8b204.p.ssafy.io/be-api/live`, data, {
            headers: { Authorization: token },
          })
          .then(res => {
            axios.post(
              'https://i8b204.p.ssafy.io/be-api/buyer_alarm',
              {},
              { headers: { Authorization: token } },
            );
          });
      });

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
                <img src={image} alt="메인사진" style={{ width: '70vw' }} />
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
        <Divider sx={{ marginY: '1rem' }} />
        <div className="live_reg_time">
          <p>라이브 할 상품 선택</p>
          <div className="live-select-all">
            <input
              type="checkbox"
              onChange={event => AllCheck(event.target.checked)}
              checked={postIds.length === posts.length}
            />
            <span>
              {postIds.length === posts.length ? '전체 해제' : '전체 선택'}
            </span>
          </div>
          <div
            style={{
              padding: '8px 0px',
              backgroundColor: 'whitesmoke',
              borderRadius: '16px',
              display: 'grid',
              gridTemplateColumns: '33% 33% 33%',
            }}
          >
            {posts &&
              posts.map(post => (
                <div className="live_reg_post">
                  <input
                    type="checkbox"
                    onChange={event =>
                      SingleCheck(event.target.checked, post.id)
                    }
                    checked={postIds.includes(post.id)}
                  />
                  <div style={{ justifyContent: 'center' }}>
                    <CardList
                      data={post}
                      key={post.id}
                      onClick={event => event.stopPropagation()}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default LiveRegister;
