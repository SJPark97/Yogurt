import '../../App.css';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const { buyerId } = useParams();

  const loginUser = useSelector(state => state.user.value);
  const [profile, setProfile] = useState([]);

  const getProfile = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/user/seller/${buyerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        console.log('ddd', res.data);
        setProfile(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [loginUser, buyerId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  console.log('fff', profile);

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
