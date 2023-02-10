import '../../App.css';
import BackToTop from '../../AppBar/BackToTop';
// import { useEffect, useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
import SellerInfo from './Seller/SellerInfo';
import StoreInfo from './Store/StoreInfo';
import dummy from '../../db/list.json';

// 이 페이지로 들어오면 axios를 해서 유저 데이터를 받아온다.
const userData = {
  Store_id: 0,
  Store_role: 'seller',
  Store_name: '박토어',
  Store_thumbnail:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAyMjBfMTU2%2FMDAxNjQ1Mjk5Nzc5MTIw.mJ2_TNR9r4uCDxlpP1-OamKd4fJe2Nwi1rdrjfVu4V8g.KUiZJHyUqgwhNqK4gw0J6GYNKSrUPM_8566BQ4WuDUAg.JPEG.zxc7421%2F44884218_345707102882519_2446069589734326272_n.jpg&type=a340',
  Store_likes: 12565,
  Store_oneline:
    '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
  Store_isLiked: [0, 2, 3],
  store_products: dummy.Goods,
};

function SellerProfile() {
  // const loginUser = useSelector(state => state.user.value);
  // const { sellerId } = useParams();

  // // const [profile, setProfile] = useState([]);

  // // const getProfile = useCallback(async () => {
  // //   await axios
  // //     .get(`https://i8b204.p.ssafy.io/be-api/post/user/${sellerId}`, {
  // //       headers: { Authorization: loginUser.token },
  // //     })
  // //     .then(res => {
  // //       setStores(res.data);
  // //     })
  // //     .catch(err => {
  // //       console.log(err);
  // //     });
  // // }, [loginUser]);

  // // useEffect(() => {
  // //   getStores();
  // // }, [getStores]);

  return (
    <div>
      <BackToTop />
      {userData && userData.Store_role === 'seller' && (
        <div>
          <SellerInfo sellerData={userData} loginId={0} />
          <StoreInfo products={userData.store_products} />
        </div>
      )}
      <h1>아래</h1>
    </div>
  );
}

export default SellerProfile;
