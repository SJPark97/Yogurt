import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LikeStore.css';
import Logo from '../../../Images/Yogurt_Logo.png';

import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

export default function LikeStore() {
  const loginUser = useSelector(state => state.user.value);
  const [likeStores, setLikeStores] = useState([]);
  const navigate = useNavigate();
  const getLikeStores = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/likes/seller', {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setLikeStores(res.data);
      })
  }, [loginUser]);

  useEffect(() => {
    getLikeStores();
  }, [getLikeStores]);


  const likeCnt = storeLikes => {
    if (storeLikes >= 10000) {
      return `${(storeLikes / 10000).toFixed(1)} 만`;
    }
    if (storeLikes >= 1000) {
      return `${(storeLikes / 1000).toFixed(1)} 천`;
    }
    return `${storeLikes}`;
  };

  return (
    <div>
      <div className="totalLikeStore">
        즐겨찾기한 상점 {likeStores.length} 개
      </div>
      {likeStores.map(likeStore => (
        <div key={likeStore.likesId}>
          <Box
            sx={{
              marginBottom: '8px',
              margin: '16px',
              display: 'flex',
              height: '100%',
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'start',
            }}
            onClick={() => {
              navigate(`/stores/${likeStore.seller.id}?tab=0`);
            }}
          >
            <img
              src={
                likeStore.seller.profileImage
                  ? likeStore.seller.profileImage
                  : Logo
              }
              alt="스토어 프로필 사진"
              className="store-img"
            />
            <div style={{ margin: '0px 0px 0px 8px', width: '100%' }}>
              <div className="store-text">
                <p className="store-name">{likeStore.seller.nickName}</p>
                <div className="store_like">
                  <IconButton
                    size="small"
                    color="inherit"
                    aria-label="like"
                    sx={{ color: 'red' }}
                  >
                    <FavoriteIcon fontSize="small" />
                  </IconButton>
                  <div className="store-cnt">
                    {likeCnt(likeStore.seller.likesCount)}
                  </div>
                </div>
              </div>
              <div className="store-introduce">
                {likeStore.seller.description
                  ? likeStore.seller.description
                  : `안녕하세요! 신규 입점한 ${likeStore.seller.nickName}입니다!`}
              </div>
            </div>
          </Box>
          <Divider variant="middle" sx={{ marginX: '1rem' }} />
        </div>
      ))}
    </div>
  );
}
