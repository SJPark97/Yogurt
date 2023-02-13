// 로그인 한 유저id를 가지고 구매자인지, 판매자인지 구분
// 판매자라면 상품등록, 라이브 시작하기 버튼이 따로 있음
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Logo from '../../../Images/Yogurt_Logo.png';
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

function SellerInfo({ profile, loginId, token }) {
  // 상점 좋아요
  const [isLiked, setIsLiked] = useState(false);
  const [live, setLive] = useState({
    status: 0,
  });
  // const [likeCnt, setLikeCnt] = useState([]);

  const getLikes = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/likes/seller', {
        headers: { Authorization: token },
      })
      .then(res => {
        if (res.data.includes(loginId)) {
          setIsLiked(!isLiked);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [isLiked, token, loginId]);

  const getLiveInfo = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/live', {
        params: { sellerId: profile.id },
      })
      .then(res => {
        if (res.data[0].status === 'STATUS_ONAIR') {
          setLive({
            status: 1,
            liveRoomId: res.data[0].liveroomId,
            sellerNickName: profile.nickName,
          });
        } else if (res.data[0].status === 'STATUS_READY') {
          setLive({
            status: 2,
            liveRoomId: res.data[0].liveroomId,
            liveTime: res.data[0].time,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [profile, setLive]);

  const goLiveRoomSeller = () => {
    if (live.status === 2) {
      //방장 라이브 이동
    } else {
      alert('라이브 등록이 필요합니다.');
    }
  };

  const goLiveRoomBuyer = () => {
    //참여자 라이브 이동
  };

  useEffect(() => {
    getLikes();
    getLiveInfo();
  }, [getLikes, getLiveInfo]);

  // let likeCnt = '';
  // if (sellerData.Store_likes >= 10000) {
  //   likeCnt = `${(sellerData.Store_likes / 10000).toFixed(1)} 만`;
  // } else if (sellerData.Store_likes >= 1000) {
  //   likeCnt = `${(sellerData.Store_likes / 1000).toFixed(1)} 천`;
  // } else {
  //   likeCnt = `${sellerData.Store_likes}`;
  // }
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  // navigate
  const navigate = useNavigate();
  // 상품 라이브 공지사항 리뷰 선택된 것

  return (
    <div>
      {console.log(profile)}
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
        <img
          src={profile.profileImage ? profile.profileImage : Logo}
          alt="스토어 프로필 사진"
          className="profileImg"
        />
        <div className="profile-text">
          <p className="profile-name">{profile.nickName}</p>
          <div className="profile-introduce">
            {profile.description
              ? profile.description
              : `안녕하세요! 신규 입점한 ${profile.nickName}입니다!`}
          </div>
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
          <div className="profile-cnt">{profile.likesCount}</div>
        </div>
      </Box>
      {loginId === profile.id && (
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
            onClick={goLiveRoomSeller}
          >
            라이브 시작
          </ColorButton>
        </Stack>
      )}
      {loginId !== profile.id && live.status === 1 && (
        <ColorButton
          fullWidth
          variant="contained"
          sx={{ color: 'red', width: '90%' }}
          // startIcon={<LiveTvIcon />}
          onClick={goLiveRoomBuyer} // 라이브 중이니 참여하기
        >
          라이브 참여
        </ColorButton>
      )}
      {loginId !== profile.id && live.status === 2 && (
        <ColorButton
          fullWidth
          variant="contained"
          sx={{ color: '#CC3300', border: 'red', width: '90%' }} // 라이브 대기중
          // startIcon={<LiveTvIcon />}
        >
          {live.liveTime.slice(8, 10) +
            '일 ' +
            live.liveTime.slice(11, 13) +
            '시 ' +
            live.liveTime.slice(14, 16) +
            '분 방송 예정'}
        </ColorButton>
      )}
    </div>
  );
}

export default SellerInfo;
