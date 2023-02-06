import { useLocation } from 'react-router-dom';
import BackToTop from '../AppBar/BackToTop';
import SellerInfo from '../Main/Profile/Seller/SellerInfo';
import StoreInfo from '../Main/Profile/Store/StoreInfo';
import dummy from '../db/list.json';

import './StoreDetail.css';

function StoreDetail() {
  const { state } = useLocation();

  return (
    <div>
      <BackToTop />
      <SellerInfo sellerData={state} loginId={2} />
      <StoreInfo products={dummy.Goods} />
    </div>
  );
}

export default StoreDetail;
