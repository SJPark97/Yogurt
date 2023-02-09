import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackToTop from '../AppBar/BackToTop';
// import Carousel from '../Common/Carousel';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import './PostDetail.css';
import axios from 'axios';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

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
  console.log(postId);
  useEffect(() => {
    axios.get(`https://i8b204.p.ssafy.io/be-api/post/${postId}`).then(res => {
      setPost(res.data);
    });
  }, [postId]);
  console.log(post);

  const salePercent = Math.floor(
    ((post?.price - post?.sale_price) / post?.price) * 100,
  );

  const navigate = useNavigate();

  // 스토어 좋아요 여부 이거는 DB에서 불린으로 줌
  // 눌리면 axios 보내서 바꾸기 + 좋아요 숫자 불러오기
  const [isLiked, setIsLiked] = useState(true);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <BackToTop />
      <img className="detail_img" src={post?.postImages} alt="이미지사진" />
      <div>
        <div className="detail-basic">
          <div className="detail-basic-info">
            <div className="detail-post-store">{post?.sellerId}</div>
            <div className="detail-post-title">{post?.title}</div>
            <div className="detail-br-cateId">{post?.typeCateName}</div>
            <div className="detail-br-cateId">{post?.brCateName}</div>
            <div className="detail-price">
              {salePercent ? (
                <div className="detail-sale-percent">{salePercent}%</div>
              ) : null}
              <div className="detail-post-sale-price">
                {post?.sale_price.toLocaleString()}원
              </div>
              <div className="detail-post-price">
                {post?.price.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="post-like">
            <IconButton
              size="small"
              color="inherit"
              aria-label="like"
              sx={{ color: 'red' }}
              onClick={handleClick}
            >
              {isLiked && <FavoriteIcon />}
              {!isLiked && <FavoriteBorderIcon />}
            </IconButton>
            <div className="post-like-cnt">4.5천</div>
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
          {/* 왜 왼쪽정렬안되지? */}
          <div className="detail-detail">{post?.content}</div>
        </div>
        <Divider variant="middle" sx={{ margin: '1rem' }} />
        <div className="detail-store-info">
          <div className="detail-store-name">
            {post?.sellerId}님의 다른 상품
          </div>
        </div>
        {/* 상점명 상품번호 넘겨서 할건가? 어떻게 할지 생각해보기 */}
        {/* <Carousel card={dummy.Popular} /> */}
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
            <WhiteButton
              className="like-bnt"
              variant="contained"
              sx={{ background: '#ffffff', color: 'red' }}
              onClick={handleClick}
            >
              {isLiked && <FavoriteIcon />}
              {!isLiked && <FavoriteBorderIcon />}
            </WhiteButton>
            <ColorButton
              variant="contained"
              fullWidth
              onClick={() => {
                console.log('장바구니 아이템 추가 후 alert');
              }}
            >
              <div>장바구니</div>
            </ColorButton>
            <DarkColorButton
              variant="contained"
              fullWidth
              onClick={() => {
                console.log('바로구매하기 페이지로 이동하기');
                navigate('/payment', {
                  state: {
                    checkItems: [post?.id],
                    totalPrice: post?.sale_price,
                  },
                });
              }}
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
