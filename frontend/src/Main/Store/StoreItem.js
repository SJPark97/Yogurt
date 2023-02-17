// 로그인 한 유저id를 가지고 구매자인지, 판매자인지 구분
// 판매자라면 상품등록, 라이브 시작하기 버튼이 따로 있음
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Images/Yogurt_Logo.png';
import axios from 'axios';

import './StoreItem.css';

// const StyledLink = styled(Link)``;

function StoreItem({ store }) {
  const navigate = useNavigate();
  const storeId = store.id;
  const loginUser = useSelector(state => state.user.value);

  const [isLiked, setIsLiked] = useState(false);

  const getLikes = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/likes/seller', {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        if (res.data.filter(item => item.seller.id === store.id).length > 0) {
          setIsLiked(true);
        }
      })
  }, [loginUser, store]);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  let likeCnt;
  if (store.likesCount >= 10000) {
    likeCnt = `${(store.likesCount / 10000).toFixed(1)} 만`;
  } else if (store.likesCount >= 1000) {
    likeCnt = `${(store.likesCount / 1000).toFixed(1)} 천`;
  } else {
    likeCnt = `${store.likesCount}`;
  }

  // 상점 디테일 이동위해 naviate 사용

  const handleClick = () => {
    navigate(`/stores/${storeId}?tab=0`);
  };

  return (
    <div>
      <Box
        onClick={() => handleClick()}
        sx={{
          marginBottom: '8px',
          margin: '16px',
          display: 'flex',
          height: '100%',
          maxWidth: '100%',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <img
          src={store.profileImage ? store.profileImage : Logo}
          alt="스토어 프로필 사진"
          className="store-img"
        />
        <div className='store-info'>
          <div className="store-text">
            <p className="store-name">{store.nickName}</p>
            <div className="store_like">
              <IconButton
                size="small"
                color="inherit"
                aria-label="like"
                sx={{ color: 'red' }}
              >
                {isLiked ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
              <div className="store-cnt">{likeCnt}</div>
            </div>
          </div>
          <div className="store-introduce">
            {store.description
              ? store.description
              : `안녕하세요! 신규 입점한 ${store.nickName} 입니다!`}
          </div>
        </div>
      </Box>
      <Divider variant="middle" />
    </div>
  );
}

export default StoreItem;
