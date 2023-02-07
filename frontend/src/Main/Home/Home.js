import './Home.css';
import BackToTop from '../../AppBar/BackToTop';
import LiveCarousel from './LiveCarousel';
import Carousel from '../../Common/Carousel';
import dummy from '../../db/SJ.json';

function Home() {
  const card = dummy.New;
  const popular = dummy.Popular;
  const live = dummy.Live;
  return (
    <div className="mainpage">
      <BackToTop />
      <h1>메인 페이지</h1>
      <p>라이브</p>
      <LiveCarousel card={live} />
      <hr />
      <p>이번 주 주목해야 될 상품</p>
      <Carousel card={popular} />
      <hr />
      <p>신상</p>
      <Carousel card={card} />
    </div>
  );
}

export default Home;
