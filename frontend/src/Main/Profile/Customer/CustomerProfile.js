import Box from '@mui/material/Box';

import './CustomerProfile.css';

function CustomerProfile({ customerData }) {
  return (
    <div>
      <Box
        sx={{
          margin: '16px',
          marginBottom: '8px',
          display: 'flex',
          height: '100%',
          maxWidth: '360px',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <img src={customerData.img} alt="#" className="profileImg" />
        <div className="profile-text">
          <div className="profile-nickname">{customerData.nickname}</div>
        </div>
      </Box>
    </div>
  );
}

export default CustomerProfile;
