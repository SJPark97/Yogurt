import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Logo from '../../../Images/Yogurt_Logo.png';
import './SellerInfo.css';

import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { styled } from '@mui/material/styles';


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

const LiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: 'red',
  },
  '&:active': {
    backgroundColor: 'red',
  },
}));

// const StyledLink = styled(Link)``;

export default function SellerInfo({ profile, loginId, token }) {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);
  // 상점 좋아요
  const [isLiked, setIsLiked] = useState(false);
  const [live, setLive] = useState({
    status: 0,
  });
  const [likeCnt, setLikeCnt] = useState();
  const [likeId, setLikeId] = useState();

  const getLikes = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/likes/seller', {
        headers: { Authorization: token },
      })
      .then(res => {
        setLikeCnt(profile.likesCount);
        if (res.data.find(item => item.seller.id === profile.id)) {
          setIsLiked(true);
          setLikeId(
            Number(
              res.data.find(item => item.seller.id === profile.id).likesId,
            ),
          );
        }
      })
  }, [token, profile]);

  const getLiveInfo = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/live?sellerId=${sellerId}`)
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
  }, [profile, sellerId]);

  const goLive = () => {
    navigate(`/video/${live.liveRoomId}`, {
      state: {
        sellerId: sellerId,
        sellerNickname: profile.nickName,
        userNickname: loginUser.loginUserNickname,
      },
    });
  };

  const goLiveRoomSeller = () => {
    if (live.status === 1 || live.status === 2) {
      axios.patch(
        `https://i8b204.p.ssafy.io/be-api/live/onair?liveId=${live.liveRoomId}`,
      );
      goLive();
    } else {
      alert('라이브 등록이 필요합니다.');
    }
  };

  const goLiveRoomBuyer = () => {
    goLive();
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
  const toggleLike = async () => {
    setIsLiked(!isLiked);
    await axios
      .post(
        `https://i8b204.p.ssafy.io/be-api/likes/${profile.id}`,
        {},
        {
          headers: { Authorization: loginUser.token },
        },
      )
      .then(res => {
        // console.log('좋아요 누르기', res.data);
        setLikeCnt(likeCnt + 1);
        setLikeId(res.data.id);
      })
  };
  const toggleUnLike = async () => {
    setIsLiked(!isLiked);
    await axios
      .patch(`https://i8b204.p.ssafy.io/be-api/likes/${likeId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        // console.log('좋아요 취소', res.data);

        setLikeCnt(likeCnt - 1);
      })
  };
  // navigate
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
          {isLiked && (
            <IconButton
              size="large"
              color="inherit"
              aria-label="like"
              onClick={toggleUnLike}
              sx={{ color: 'red' }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
          {!isLiked && (
            <IconButton
              size="large"
              color="inherit"
              aria-label="like"
              onClick={toggleLike}
              sx={{ color: 'red' }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <div className="profile-cnt">
            {likeCnt ? likeCnt : profile.likesCount}
          </div>
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
        <LiveButton
          fullWidth
          variant="contained"
          sx={{ color: 'white', width: '90%' }}
          startIcon={<LiveTvIcon />}
          onClick={goLiveRoomBuyer} // 라이브 중이니 참여하기
        >
          라이브 참여
        </LiveButton>
      )}
      {loginId !== profile.id && live.status === 2 && (
        <LiveButton
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
        </LiveButton>
      )}
    </div>
  );
}
