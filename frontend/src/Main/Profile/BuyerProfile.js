import '../../App.css';
import BackToTop from '../../AppBar/BackToTop';
import CustomerInfo from './Customer/CustomerInfo';
import CustomerProfile from './Customer/CustomerProfile';

// import StoreProfile from '../Profile/Store/StoreProfile';

// 이 페이지로 들어오면 axios를 해서 유저 데이터를 받아온다.
const userData2 = {
  id: 0,
  role: 'buyer',
  nickname: '랄로',
  img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAyMjBfMTU2%2FMDAxNjQ1Mjk5Nzc5MTIw.mJ2_TNR9r4uCDxlpP1-OamKd4fJe2Nwi1rdrjfVu4V8g.KUiZJHyUqgwhNqK4gw0J6GYNKSrUPM_8566BQ4WuDUAg.JPEG.zxc7421%2F44884218_345707102882519_2446069589734326272_n.jpg&type=a340',
  isLiked: [],
};

function BuyerProfile() {
  return (
    <div>
      <BackToTop />
      {userData2 && userData2.role === 'buyer' && (
        <div>
          <CustomerProfile customerData={userData2} />
          <CustomerInfo />
        </div>
      )}
    </div>
  );
}

export default BuyerProfile;
