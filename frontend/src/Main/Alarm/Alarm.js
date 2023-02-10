// import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Live from '../../Images/live_alarm-removebg-preview.png';
import Sell from '../../Images/money.png';
import axios from 'axios';
import './Alarm.css';

function Alarm({ alarm, role, token }) {
  const handleClick = async () => {
    await axios
      .patch(`https://i8b204.p.ssafy.io/be-api/seller_alarm/${alarm.id}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
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
          <img src={Sell} alt="#" className="alarm-img" />
        )}
        {role === 'ROLE_SELLER' && (
          <div>
            <div className="alarm-post">[{alarm.post_name}]</div>
            <div className="alarm-content">상품이 판매되었습니다.</div>
          </div>
        )}

        {role === 'ROLE_BUYER' && (
          <img src={Live} alt="#" className="alarm-img" />
        )}
        {role === 'ROLE_BUYER' && (
          <div>
            <div className="alarm-content">
              000 상점에서 라이브 방송이 판매되었습니다.
            </div>
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
