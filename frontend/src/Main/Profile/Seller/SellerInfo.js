// 로그인 한 유저id를 가지고 구매자인지, 판매자인지 구분
// 판매자라면 상품등록, 라이브 시작하기 버튼이 따로 있음
import { useState } from 'react';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import LiveTvIcon from '@mui/icons-material/LiveTv';

import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import './SellerInfo.css';

const ColorButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#deb887',
  '&:hover': {
    backgroundColor: '#deb887',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#deb887',
  },
}));

// const StyledLink = styled(Link)``;

function SellerInfo({ sellerData, loginId }) {
  console.log(sellerData);
  let likeCnt = '';
  if (sellerData.Store_likes >= 10000) {
    likeCnt = `${(sellerData.Store_likes / 10000).toFixed(1)} 만`;
  } else if (sellerData.Store_likes >= 1000) {
    likeCnt = `${(sellerData.Store_likes / 1000).toFixed(1)} 천`;
  } else {
    likeCnt = `${sellerData.Store_likes}`;
  }

  // 상점 좋아요
  const frist = sellerData.Store_isLiked.includes(sellerData.Store_id);
  const [isLiked, setIsLiked] = useState(frist);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  // navigate
  const navigate = useNavigate();
  // 상품 라이브 공지사항 리뷰 선택된 것

  return (
    <div>
      <Box
        sx={{
          margin: '16px',
          marginBottom: '8px',
          display: 'flex',
          height: '100%',
          maxWidth: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={sellerData.Store_thumbnail} alt="#" className="profileImg" />
        <div className="profile-text">
          <p className="profile-name">{sellerData.Store_name}</p>
          <div className="profile-introduce">{sellerData.Store_oneline}</div>
        </div>
        <div>
          <IconButton
            size="large"
            color="inherit"
            aria-label="like"
            onClick={() => toggleLike()}
            sx={{ color: 'red' }}
          >
            {isLiked && <FavoriteIcon />}
            {!isLiked && <FavoriteBorderIcon />}
          </IconButton>
          <div className="profile-cnt">{likeCnt}</div>
        </div>
      </Box>
      {loginId === sellerData.Store_id && (
        <Stack
          spacing={2}
          direction="row"
          sx={{
            marginLeft: '16px',
            marginRight: '16px',
          }}
        >
          <ColorButton
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/post/join')}
          >
            상품등록
          </ColorButton>
          <ColorButton
            fullWidth
            variant="contained"
            startIcon={<LiveTvIcon />}
            onClick={() => navigate('/lgc')}
          >
            라이브 시작
          </ColorButton>
        </Stack>
      )}
    </div>
  );
}

export default SellerInfo;
