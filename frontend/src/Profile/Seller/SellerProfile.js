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
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import './SellerProfile.css';

// 유저 데이터 받아오고 그 데이터를 가지고 구성하기
const userData = {
  id: 0,
  name: '박토어',
  img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAyMjBfMTU2%2FMDAxNjQ1Mjk5Nzc5MTIw.mJ2_TNR9r4uCDxlpP1-OamKd4fJe2Nwi1rdrjfVu4V8g.KUiZJHyUqgwhNqK4gw0J6GYNKSrUPM_8566BQ4WuDUAg.JPEG.zxc7421%2F44884218_345707102882519_2446069589734326272_n.jpg&type=a340',
  likes: 12565,
  introduce:
    '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
  isLiked: [0, 2, 3],
};

const ColorButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  color: theme.palette.getContrastText(deepOrange.A400),
  backgroundColor: deepOrange.A200,
  '&:hover': {
    backgroundColor: deepOrange.A200,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: deepOrange.A200,
  },
}));

// const StyledLink = styled(Link)``;

function SellerProfile() {
  let likeCnt = '';
  if (userData.likes >= 10000) {
    likeCnt = `${(userData.likes / 10000).toFixed(1)} 만`;
  } else if (userData.likes >= 1000) {
    likeCnt = `${(userData.likes / 1000).toFixed(1)} 천`;
  } else {
    likeCnt = `${userData.likes}`;
  }
  const frist = userData.isLiked.includes(userData.id);
  const [isLiked, setIsLiked] = useState(frist);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // 상품 라이브 공지사항 리뷰 선택된 것

  return (
    <div>
      <Box
        sx={{
          margin: '16px',
          display: 'flex',
          height: '100%',
          maxWidth: '360px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={userData.img} alt="#" className="profileImg" />
        <div className="profile-text">
          <p className="profile-name">{userData.name}</p>
          <div className="profile-introduce">{userData.introduce}</div>
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
          <div>{likeCnt}</div>
        </div>
      </Box>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          marginLeft: '16px',
        }}
      >
        <ColorButton
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          href="/post/join"
        >
          상품등록
        </ColorButton>
        <ColorButton
          fullWidth
          variant="contained"
          startIcon={<LiveTvIcon />}
          href="/post/join"
        >
          라이브 열기
        </ColorButton>
        <Link to="/post/join" />
      </Stack>
    </div>
  );
}

export default SellerProfile;
