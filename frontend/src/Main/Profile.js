import '../App.css';
import BackToTop from '../AppBar/BackToTop';
import SellerProfile from '../Profile/Seller/SellerProfile';
import StoreProfile from '../Profile/Store/StoreProfile';

function Profile() {
  return (
    <div>
      <BackToTop />
      <SellerProfile />
      <StoreProfile />
      <h1>아래</h1>
    </div>
  );
}

export default Profile;
