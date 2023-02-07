import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import BackToTop from '../AppBar/BackToTop';
import './LiveRegister.css';

function LiveRegister() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(Date());
  const [time, setTime] = useState(Date());
  const [content, setContent] = useState('');

  const handleDeleteIamge = () => {
    URL.revokeObjectURL(image);
    setImage(null);
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log(event);
    navigate('/profile/seller');

    const body = {
      title,
      image,
      date,
      time,
      content,
    };

    console.log(body);

    return false;
  };

  return (
    <div className="liveregister">
      <BackToTop />
      <form onSubmit={submitHandler}>
        <div className="live_reg_title">
          <p>라이브 룸 제목</p>
          <input
            type="text"
            id="live_reg_title"
            name="title"
            placeholder="라이브 제목을 입력해주세요"
            onClick={event => setTitle(event.target.value)}
          />
        </div>
        <hr />
        <div className="live_reg_file">
          <p>라이브 대표 사진 등록</p>
          <input
            type="file"
            id="live_reg_file"
            accept="image/*"
            onChange={event =>
              setImage(URL.createObjectURL(event.target.files[0]))
            }
          />
          <label htmlFor="live_reg_file">+</label>
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
        <hr />
        <div className="live_reg_date">
          <p>라이브 예정 시간</p>
          <input
            type="date"
            id="live_reg_date"
            name="date"
            onClick={event => setDate(event.target.value)}
          />
          <input
            type="time"
            id="live_reg_time"
            name="time"
            onClick={event => setTime(event.target.value)}
          />
        </div>
        <hr />
        <div className="live_reg_detail">
          <p>라이브 상세정보</p>
          <textarea
            id="live_reg_detail"
            name="detail"
            placeholder="상세내용에 대해 기입해주세요&#13;&#10;ex) 라이브의 특징 및 진행상황에 대해 기재해주면 더 좋아요!"
            onClick={event => setContent(event.target.value)}
          />
        </div>
        <hr />
        <div className="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default LiveRegister;
