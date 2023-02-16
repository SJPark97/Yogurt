import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Live from '../../Images/live_alarm-removebg-preview.png';
import axios from 'axios';
import './Alarm.css';

function Alarm({ alarm, role, token }) {
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const handleClick = async () => {
    setIsDelete(!isDelete);
    await axios
      .patch(`https://i8b204.p.ssafy.io/be-api/seller_alarm/${alarm.id}`, {
        headers: { Authorization: token },
      })
  };
  // console.log(alarm, '알람');

  return (
    <div style={{ display: isDelete ? 'none' : '' }}>
      <Box
        sx={{
          marginBottom: '8px',
          margin: '16px',
          display: 'inline-grid',
          gridTemplateColumns: '2fr 8fr 1fr',
          height: '100%',
          maxWidth: '100%',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {role === 'ROLE_SELLER' && (
          <img
            src={alarm.image_url}
            alt="#"
            className="alarm-img"
            onClick={() => {
              navigate(`/profile/seller/${loginUser.loginUserPk}?tab=0`);
            }}
          />
        )}
        {role === 'ROLE_SELLER' && (
          <div
            role="presentation"
            onClick={() => {
              navigate(`/profile/seller/${loginUser.loginUserPk}?tab=0`);
            }}
          >
            <div className="alarm-post">[{alarm.post_name}]</div>
            <div className="alarm-content">상품이 판매되었습니다.</div>
          </div>
        )}

        {role === 'ROLE_BUYER' && (
          <img
            src={Live}
            alt="#"
            className="alarm-img"
            onClick={() => {
              navigate(`/profile/seller/${alarm.seller_id}?tab=1`);
            }}
          />
        )}
        {role === 'ROLE_BUYER' && (
          <div
            role="presentation"
            onClick={() => {
              navigate(`/profile/seller/${alarm.seller_id}?tab=1`);
            }}
          >
            <div className="alarm-post">{alarm.seller_nickname}상점에서</div>
            <div className="alarm-content">라이브 방송이 등록되었습니다.</div>
          </div>
        )}
        <IconButton
          size="medium"
          color="inherit"
          aria-label="alarm-close"
          onClick={handleClick}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider variant="middle" />
    </div>
  );
}

export default Alarm;
