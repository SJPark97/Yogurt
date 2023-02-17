import React from 'react';
import './LiveCardList.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LiveCardList({ live }) {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const handleClick = () => {
    if (loginUser.token) {
      navigate(`/video/${live.liveroomId}`, {
        state: {
          sellerId: live.sellerId,
          sellerNickname: live.sellerName,
          userNickname: loginUser.loginUserNickname,
        },
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="LiveCard" role="presentation" onClick={handleClick}>
      <div className="LiveCardLiveTag">
        <div>LIVE</div>
      </div>
      <img className="LiveCardImg" src={live.thumbnail} alt="#" />
      <div className="LiveCardStoreName">{live.sellerName}</div>
      <div className="LiveCardStoreTitle">{live.title}</div>
    </div>
  );
}
export default LiveCardList;
