import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTop from '../AppBar/BackToTop';
import './ReviewRegister.css';

function ReviewRegister() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(5);

  const submitHandler = event => {
    event.preventDefault();
    console.log(event);
    navigate('/profile/buyer');

    const body = {
      title,
      content,
      rate,
    };

    // {
    //   if (body.title === '') {
    //     alert('제목을 입력해주세요');
    //     return false;
    //   }
    // }

    console.log(body);
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
        <hr />
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

        <hr />
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
