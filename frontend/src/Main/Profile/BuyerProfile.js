import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import BackToTop from '../../AppBar/BackToTop';
import CustomerInfo from './Customer/CustomerInfo';
import CustomerProfile from './Customer/CustomerProfile';

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
  }, [loginUser, buyerId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div>
      <BackToTop />
      <CustomerProfile profile={profile} />
      <CustomerInfo />
    </div>
  );
}

export default BuyerProfile;
