import { useNavigate } from 'react-router-dom';

import './CustomerProfile.css';
import Logo from '../../../Images/Yogurt_Logo.png';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

function CustomerProfile({ profile }) {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        sx={{
          margin: '16px',
          marginBottom: '8px',
          display: 'grid',
          gridTemplateColumns: '1fr 8fr 1fr',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src={profile.profileImage ? profile.profileImage : Logo}
          alt="스토어 프로필 사진"
          className="profileImg"
        />
        <div className="profile-text">
          <div className="profile-nickname">{profile.nickName}</div>
        </div>
        <Button
          variant="outlined"
          // startIcon={<ShoppingBagOutlinedIcon fontSize="small" />}
          sx={{ padding: '8px', color: '#deb887', border: '1px solid #deb887' }}
          onClick={() => {
            navigate('/wishlist');
          }}
        >
          <ShoppingBagOutlinedIcon fontSize="medium" />
        </Button>
      </Box>
    </div>
  );
}

export default CustomerProfile;
