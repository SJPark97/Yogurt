import React from 'react';
import dummy from '../db/SJ.json';
import { useNavigate } from 'react-router-dom';
import './ShopCard.css';

function ShopCard(props) {
  const { data } = props
  const shopInfo = dummy.Stores[data]
  const navigate = useNavigate();
  const goToStoreDetail = () => {
    navigate(`/stores/${data}?tab=0`, { state: shopInfo });
  };
  return (
    <div onClick={() => goToStoreDetail()}>
      <img className="shop-img" src={shopInfo.Store_thumbnail} alt="#" />
      <p className="shop-name">{shopInfo.Store_name}</p>
    </div>
  );
}
export default ShopCard;
