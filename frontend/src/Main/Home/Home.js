import './Home.css';
import BackToTop from '../../AppBar/BackToTop';
import LiveCarousel from './LiveCarousel';
import Carousel from '../../Common/Carousel';
import dummy from '../../db/SJ.json';
import Divider from '@mui/material/Divider';

function Home() {
  const card = dummy.New;
  const popular = dummy.Popular;
  const live = dummy.Live;

  return (
    <div className="mainpage">
      <BackToTop />
      <h1>메인 페이지 - 여기에 사진 캐러셀?</h1>
      <p className="mainpageTitle">라이브</p>
      <LiveCarousel card={live} />
      <Divider variant="middle" />
      <p className="mainpageTitle">이번 주 주목해야 될 상품</p>
      <Carousel card={popular} />
      <Divider variant="middle" />
      <p className="mainpageTitle">신상</p>
      <Carousel card={card} />
    </div>
  );
}

export default Home;
