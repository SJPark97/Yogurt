import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackToTop from '../AppBar/BackToTop';
import SellerInfo from '../Main/Profile/Seller/SellerInfo';
import StoreInfo from '../Main/Profile/Store/StoreInfo';

import './StoreDetail.css';

function StoreDetail() {
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);
  const [profile, setProfile] = useState([]);
  const getProfile = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/user/seller/${sellerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setProfile(res.data);
      })

  }, [loginUser, sellerId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div>
      <BackToTop />
      <SellerInfo
        profile={profile}
        loginId={loginUser.loginUserPk}
        token={loginUser.token}
      />
      <StoreInfo />
    </div>
  );
}

export default StoreDetail;
