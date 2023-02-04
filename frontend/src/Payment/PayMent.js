import React from 'react';
import { useLocation } from 'react-router-dom';
import dummy from '../db/list.json';
import './PayMent.css';

function Payment() {
  const location = useLocation();
  const { checkItems } = location.state;
  const { totalPrice } = location.state;
  const wishlist = dummy.WishLists.filter(item =>
    checkItems.includes(item.wishListId),
  );

  return (
    <div>
      <div className="pay-total">
        <p>주문 상품 총 {checkItems.length}개</p>
        <hr />
        {wishlist.map(wish => (
          <div key={wish.wishListId}>
            <div className="pay-post">
              <div className="pay-post-img-div">
                <img
                  className="pay-post-img"
                  src={wish.post.postimage_url}
                  alt="이미지사진"
                />
              </div>
              <div className="pay-post-info">
                <div className="pay-post-sellername">
                  {wish.post.sellerName}
                </div>
                <div className="pay-post-title">{wish.post.post_title}</div>
                <div className="pay-post-price">
                  {wish.post.post_sale_price.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="pay-deliver">
        <p>배송지 정보</p>
        <textarea
          name="배송지정보"
          id="deilver"
          placeholder="주소를 입력하세요"
        />
      </div>
      <hr />
      <div className="pay-total-price">
        <div>결제하기</div>
        <div className="pay-price">{totalPrice.toLocaleString()} 원</div>
      </div>
      <hr />
      <div className="pay-kakao">
        <p>카카오페이로 결제하기</p>
        <img
          src="https://img.etoday.co.kr/pto_db/2020/10/600/20201023101423_1528745_1200_738.jpg"
          alt="카카오페이로 결제하기"
          height="100px"
        />
      </div>
    </div>
  );
}

export default Payment;
