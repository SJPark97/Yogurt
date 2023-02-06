import logo from '../logo.svg';
import '../App.css';
import BackToTop from '../AppBar/BackToTop';

function Store() {
  return (
    <div>
      <BackToTop />
      <h1>스토어</h1>
      <h2>여기에는 상점들</h2>
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

export default Store;
