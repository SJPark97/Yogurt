import logo from '../logo.svg';
import '../App.css';
import BackToTop from '../AppBar/BackToTop';

function Profile() {
  return (
    <div>
      <BackToTop />
      <h1>프로필 페이지</h1>
      <h2>여기에 프로필 내용 들어가기</h2>
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

export default Profile;
