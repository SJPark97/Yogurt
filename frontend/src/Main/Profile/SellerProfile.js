import '../../App.css';
import BackToTop from '../../AppBar/BackToTop';

import SellerInfo from './Seller/SellerInfo';
import StoreInfo from './Store/StoreInfo';

// 이 페이지로 들어오면 axios를 해서 유저 데이터를 받아온다.
const userData1 = {
  Store_id: 0,
  Store_role: 'seller',
  Store_name: '박토어',
  Store_thumbnail:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAyMjBfMTU2%2FMDAxNjQ1Mjk5Nzc5MTIw.mJ2_TNR9r4uCDxlpP1-OamKd4fJe2Nwi1rdrjfVu4V8g.KUiZJHyUqgwhNqK4gw0J6GYNKSrUPM_8566BQ4WuDUAg.JPEG.zxc7421%2F44884218_345707102882519_2446069589734326272_n.jpg&type=a340',
  Store_likes: 12565,
  Store_oneline:
    '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
  Store_isLiked: [0, 2, 3],
};

function SellerProfile() {
  return (
    <div>
      <BackToTop />
      {userData1 && userData1.Store_role === 'seller' && (
        <div>
          <SellerInfo sellerData={userData1} />
          <StoreInfo />
        </div>
      )}
      <h1>아래</h1>
    </div>
  );
}

export default SellerProfile;
