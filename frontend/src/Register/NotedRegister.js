import BackToTop from '../AppBar/BackToTop';
import './NotedRegister.css';

function PostRegister() {
  return (
    <div className="postregister">
      <BackToTop />
      <form action="/noted/join" method="post">
        <div className="noted_reg_title">
          <p>공지 제목</p>
          <input
            type="text"
            id="noted_reg_title"
            name="title"
            placeholder="공지 제목을 입력해주세요"
          />
        </div>
        <hr />
        <div className="noted_reg_detail">
          <p>공지 내용</p>
          <textarea
            id="noted_reg_detail"
            name="size"
            placeholder="공지사항을 적어주세요"
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
