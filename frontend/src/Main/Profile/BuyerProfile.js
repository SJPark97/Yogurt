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
      <CustomerProfile profile={profile} />
      <CustomerInfo />
    </div>
  );
}

export default BuyerProfile;
