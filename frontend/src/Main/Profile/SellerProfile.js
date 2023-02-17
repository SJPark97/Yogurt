import '../../App.css';
import BackToTop from '../../AppBar/BackToTop';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SellerInfo from './Seller/SellerInfo';
import StoreInfo from './Store/StoreInfo';
// 이 페이지로 들어오면 axios를 해서 유저 데이터를 받아온다.

function SellerProfile() {
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

export default SellerProfile;
