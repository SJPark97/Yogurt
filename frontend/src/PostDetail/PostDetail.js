import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DetailCarousel from './DetailCarousel';
import BackToTop from '../AppBar/BackToTop';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import './PostDetail.css';

function PostDetail() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const { postId } = useParams();
  const [post, setPost] = useState(false);
  const [seller, setSeller] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [salePercent, setSalePercent] = useState(true);

  const ColorButton = styled(Button)(() => ({
    fontSize: '20px',
    backgroundColor: '#deb887',
    '&:hover': {
      backgroundColor: '#deb887',
    },
  }));

  const DarkColorButton = styled(Button)(() => ({
    fontSize: '20px',
    backgroundColor: '#cf974f',
    '&:hover': {
      backgroundColor: '#cf974f',
    },
  }));

  const WhiteButton = styled(Button)(() => ({
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  }));

  const token = loginUser.token;
  const [likeCnt, setLikeCnt] = useState();
  const [likeId, setLikeId] = useState();

  useEffect(() => {
    axios
      .get(`https://i8b204.p.ssafy.io/be-api/post/${postId}`)
      .then(res => {
        setLikeCnt(res.data.likesCount);
        setPost(res.data);
        setSalePercent(
          Math.floor(
            ((res.data.price - res.data.sale_price) / res.data.price) * 100,
          ),
        );
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (post) {
      axios
        .get(`https://i8b204.p.ssafy.io/be-api/user/seller/${post.sellerId}`, {
          headers: { Authorization: token },
        })
        .then(res => {
          setSeller(res.data);
        })
        .catch(err => console.log('seller', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const data = {};
  const wishPost = () => {
    axios
      .post(`https://i8b204.p.ssafy.io/be-api/wishlist/${postId}`, data, {
        headers: { Authorization: token },
      })
      .then(res => console.log(res))
      .catch(err => console.log('wishlist', err));
  };

  const getLikes = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/zzim', {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('찜들 받아오기', res.data.zzims);
        if (res.data.zzims.find(item => item.post.id === postId)) {
          setIsLiked(true);
          setLikeId(
            Number(res.data.zzims.find(item => item.post.id === postId).zzimId),
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, postId]);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    await axios
      .post(
        `https://i8b204.p.ssafy.io/be-api/zzim/${postId}`,
        {},
        {
          headers: { Authorization: loginUser.token },
        },
      )
      .then(res => {
        console.log('찜 누르기', res.data);
        setLikeCnt(likeCnt + 1);
        setLikeId(res.data.id);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const toggleUnLike = async () => {
    setIsLiked(!isLiked);
    await axios
      .patch(`https://i8b204.p.ssafy.io/be-api/zzim/delete/${likeId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        console.log('좋아요 취소', res.data);
        setLikeCnt(likeCnt - 1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <BackToTop />
      {post && <Box sx={{ width: '100%' }}>
        <DetailCarousel images={post.postImages} />
      </Box>
      }
      <div>
        <div className="detail-basic">
          <div className="detail-basic-info">
            <div className="detail-post-store">{seller?.nickName}</div>
            <div className="detail-post-title">{post?.title}</div>
            <div className="detail-br-cateId">
              {post?.brCateName}/{post?.typeCateName}
            </div>
            <div className="detail-price">
              {salePercent ? (
                <div className="detail-sale-percent">{salePercent}%</div>
              ) : null}
              <div className="detail-post-sale-price">
                {post?.sale_price?.toLocaleString()}원
              </div>
              <div className="detail-post-price">
                {post?.price?.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="post-like">
            {isLiked ? (
              <IconButton
                size="small"
                color="inherit"
                aria-label="like"
                sx={{ color: 'red' }}
                onClick={toggleUnLike}
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                color="inherit"
                aria-label="like"
                sx={{ color: 'red' }}
                onClick={toggleLike}
              >
                <FavoriteBorderIcon />
              </IconButton>
            )}

            <div className="post-like-cnt">
              {likeCnt ? likeCnt : post.likesCount}
            </div>
          </div>
        </div>
        <Divider variant="middle" sx={{ margin: '1rem' }} />
        <div className="detail-size-info">
          <div className="detail-size-name">사이즈</div>
          <div className="detail-size">{post?.size}</div>
        </div>
        <Divider variant="middle" sx={{ margin: '1rem' }} />
        <div className="detail-detail-info">
          <div className="detail-detail-name">상세설명</div>
          <div className="detail-detail">{post?.content}</div>
        </div>
        <Divider variant="middle" sx={{ margin: '1rem' }} />
        <div className="detail-store-info">
          <div className="detail-store-name">
            {seller?.nickName}님의 다른 상품
          </div>
          {/* 상점명 상품번호 넘겨서 할건가? 어떻게 할지 생각해보기 */}
          {/* <Carousel card={dummy.Popular} /> */}
        </div>
      </div>
      <footer>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          <Box className="detail-footer" sx={{ height: '56px' }}>
            {isLiked ? (
              <WhiteButton
                className="like-bnt"
                variant="contained"
                sx={{ background: '#ffffff', color: 'red' }}
                onClick={toggleUnLike}
              >
                <FavoriteIcon />
              </WhiteButton>
            ) : (
              <WhiteButton
                className="like-bnt"
                variant="contained"
                sx={{ background: '#ffffff', color: 'red' }}
                onClick={toggleLike}
              >
                <FavoriteBorderIcon />
              </WhiteButton>
            )}

            <ColorButton
              variant="contained"
              fullWidth
              onClick={() => wishPost()}
            >
              <div>장바구니</div>
            </ColorButton>
            <DarkColorButton
              variant="contained"
              fullWidth
              onClick={() =>
                navigate('/payment2', {
                  state: {
                    post: post,
                    checkItems: [post?.id],
                    totalPrice: post?.sale_price,
                  },
                })
              }
            >
              <div>바로 구매</div>
            </DarkColorButton>
          </Box>
        </Paper>
      </footer>
    </div>
  );
}

export default PostDetail;