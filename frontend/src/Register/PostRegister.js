import React, { useState } from 'react';
import BackToTop from '../AppBar/BackToTop';
import './PostRegister.css';

function PostRegister() {
  const [sale, setSale] = useState(false);
  const [postState, setPostState] = useState(1);
  const States = [
    {
      type: 1,
      title: '판매 중',
    },
    {
      type: 2,
      title: '라이브 예정',
    },
    {
      type: 3,
      title: '판매 완료',
    },
  ];

  const saleStates = [
    {
      type: false,
      title: '할인 안 함',
    },
    {
      type: true,
      title: '할인',
    },
  ];

  return (
    <div className="postregister">
      <BackToTop />
      <form action="/post/join" method="post">
        <div className="post_reg_title">
          <p>제품제목</p>
          <input
            type="text"
            id="post_reg_title"
            name="title"
            placeholder="상품명을 입력해주세요"
          />
        </div>
        <hr />
        <div className="post_reg_price">
          <p>제품가격</p>
          <input
            type="number"
            id="post_reg_price"
            name="price"
            placeholder="제품가격을 입력해주세요"
          />
          <div className="post_reg_sale_state">
            <p>할인상태</p>
            {saleStates.map(state => (
              <button
                type="button"
                onClick={() => setSale(state.type)}
                className={`${sale === state.type ? 'post_reg_sale_btn' : ''}`}
              >
                {state.title}
              </button>
            ))}
          </div>
          {sale && (
            <div className="post_reg_sale_price">
              <p>할인가격</p>
              <input
                type="number"
                id="post_reg_sale_price"
                name="sale_price"
                placeholder="제품가격을 입력해주세요"
              />
            </div>
          )}
        </div>
        <hr />
        <div className="post_reg_state">
          <p>제품상태</p>
          <div className="post_reg_state_div">
            {States.map(state => (
              <button
                type="button"
                onClick={() => setPostState(state.type)}
                className={`${
                  postState === state.type ? 'post_reg_state_btn' : ''
                }`}
              >
                {state.title}
              </button>
            ))}
          </div>
        </div>
        <hr />
        <div className="post_reg_category">
          <p>카테고리</p>
          <div className="post_reg_category_div">
            {/* 카테고리 db만들어지면 가져오기 */}
            <div className="post_reg_category_cloth">옷</div>
            <div className="post_reg_category_brand">브랜드</div>
          </div>
        </div>
        <hr />
        <div className="post_reg_detail">
          <p>제품 상세정보</p>
          <textarea
            id="post_reg_detail"
            name="detail"
            placeholder="상세내용에 대해 기입해주세요&#13;&#10;ex) 옷의 상태, 어울리는 옷차림, 특별함을 어필하면 더 좋아요"
          />
        </div>
        <hr />
        <div className="post_reg_size">
          <p>사이즈</p>
          <textarea
            id="post_reg_size"
            name="size"
            placeholder="사이즈에 대해 설명해주세요&#13;&#10;ex)가슴둘레:40cm 총장:65cm"
          />
        </div>
        <div id="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default PostRegister;
