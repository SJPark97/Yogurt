import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ShopCard.css';
import Logo from '../Images/Yogurt_Logo.png';

function ShopCard(props) {
  const { data } = props;
  const [shopInfo, setShopInfo] = useState(undefined);
  const loginUser = useSelector(state => state.user.value);
  const getProfile = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/user/seller/${data}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setShopInfo(res.data);
      });
  }, [loginUser, data, setShopInfo]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const navigate = useNavigate();
  const goToStoreDetail = () => {
    navigate(`/stores/${data}?tab=0`);
  };
  return (
    <div onClick={() => goToStoreDetail()}>
      {shopInfo === undefined ? null : (
        <img
          className="shop-img"
          src={shopInfo.profileImage === null ? Logo : shopInfo.profileImage}
          alt="#"
        />
      )}
      {shopInfo === undefined ? null : (
        <p className="shop-name">{shopInfo.nickName}</p>
      )}
    </div>
  );
}
export default ShopCard;
