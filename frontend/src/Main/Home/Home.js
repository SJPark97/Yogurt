import './Home.css';
import BackToTop from '../../AppBar/BackToTop';
import LiveCarousel from './LiveCarousel';
import Carousel from '../../Common/Carousel';

function Home() {
  return (
    <div>
      <BackToTop />
      <h1>메인 페이지</h1>
      <p>라이브</p>
      <LiveCarousel />
      <hr />
      <p>이번 주 주목해야 될 상품</p>
      <Carousel />
      <hr />
      <p>신상</p>
      <Carousel />
    </div>
  );
}

export default Home;
