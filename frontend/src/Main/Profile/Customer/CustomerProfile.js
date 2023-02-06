import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './CustomerProfile.css';

function CustomerProfile({ customerData }) {
  return (
    <div>
      <Box
        sx={{
          margin: '16px',
          marginBottom: '8px',
          display: 'grid',
          gridTemplateColumns: '2fr 5fr 4fr',
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
        <Button variant="outlined">프로필 수정</Button>
      </Box>
    </div>
  );
}

export default CustomerProfile;
