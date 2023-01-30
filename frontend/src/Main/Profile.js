import logo from '../logo.svg';
import '../App.css';
import BackToTop from '../AppBar/BackToTop';
import SellerProfile from '../Profile/Seller/SellerProfile';

function Profile() {
  return (
    <div>
      <BackToTop />
      <SellerProfile />
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
