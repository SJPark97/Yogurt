import BackToTop from '../AppBar/BackToTop';
import './QnARegister.css';

function QnARegister() {
  return (
    <div className="qnaregister">
      <BackToTop />
      <form action="/qna/join" method="post">
        <div className="qna_reg_title">
          <p>질문 제목</p>
          <input
            type="text"
            id="qna_reg_title"
            name="title"
            placeholder="질문 제목을 입력해주세요"
          />
        </div>
        <hr />
        <div className="qna_reg_detail">
          <p>질문 내용</p>
          <textarea
            id="qna_reg_detail"
            name="size"
            placeholder="질문할 사항을 적어주세요"
          />
        </div>
        <div id="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default QnARegister;
