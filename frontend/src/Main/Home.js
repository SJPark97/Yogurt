import logo from '../logo.svg';
import '../App.css';
import BackToTop from '../AppBar/BackToTop';

function Home() {
  return (
    <div>
      <BackToTop />
      <h1>메인 페이지</h1>
      <h2>여기에 광고, 카드들 들어가기</h2>
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <img src={logo} className="App-logo" alt="logo" />
      <h1>아래</h1>
    </div>
  );
}

export default Home;
