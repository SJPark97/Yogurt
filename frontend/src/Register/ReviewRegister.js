import BackToTop from '../AppBar/BackToTop';
import './ReviewRegister.css';

function ReviewRegister() {
  return (
    <div className="reviewregister">
      <BackToTop />
      <form action="/review/join" method="post">
        <div className="review_reg_title">
          <p>리뷰 제목</p>
          <input
            type="text"
            id="review_reg_title"
            name="title"
            placeholder="리뷰 제목을 입력해주세요"
          />
        </div>
        <hr />
        <div className="review_reg_star">
          <p> 별점</p>
          <div className="review_star-ratings">
            <div className="review_star-ratings-fill">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div className="review_star-ratings-base">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
        </div>

        <hr />
        <div className="review_reg_detail">
          <p>리뷰 내용</p>
          <textarea
            id="review_reg_detail"
            name="size"
            placeholder="리뷰 내용을 적어주세요&#13;&#10;배송의 상태, 판매자의 응대 등에 대해 적어주세요"
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
