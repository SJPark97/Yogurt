import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummy from '../db/list.json';
import BackToTop from '../AppBar/BackToTop';
import Carousel from '../Common/Carousel';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// import BottomNavigation from '@mui/material/BottomNavigation';

import './PostDetail.css';

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

function PostDetail() {
  const { postId } = useParams();
  const post = dummy.Goods.find(event => event.postId === Number(postId));
  const salePercent = Math.floor(
    ((post.post_price - post.post_sale_price) / post.post_price) * 100,
  );

  const navigate = useNavigate();

  // 스토어 좋아요 여부 이거는 DB에서 불린으로 줌
  // 눌리면 axios 보내서 바꾸기 + 좋아요 숫자 불러오기
  const [isLiked, setIsLiked] = useState(true);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const id = [Number(postId)];
  const price = post.post_sale_price;

  return (
    <div>
      <BackToTop />
      <img className="detail_img" src={post.image} alt="이미지사진" />
      <div>
        <div className="detail-basic">
          <div className="detail-basic-info">
            <div className="detail-post-store">{post.post_store}</div>
            <div className="detail-post-title">{post.post_title}</div>
            <div className="detail-br-cateId">{post.br_cateId}</div>
            <div className="detail-price">
              {salePercent ? (
                <div className="detail-sale-percent">{salePercent}%</div>
              ) : null}
              <div className="detail-post-sale-price">
                {post.post_sale_price.toLocaleString()}원
              </div>
              <div className="detail-post-price">
                {post.post_price.toLocaleString()}
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
          <div className="detail-size">{post.post_size}</div>
        </div>
        <Divider variant="middle" sx={{ margin: '1rem' }} />
        <div className="detail-detail-info">
          <div className="detail-detail-name">상세설명</div>
          {/* 왜 왼쪽정렬안되지? */}
          <div className="detail-detail">{post.post_content}</div>
        </div>
        <Divider variant="middle" sx={{ margin: '1rem' }} />
        <div className="detail-store-info">
          <div className="detail-store-name">
            {post.post_store}님의 다른 상품
          </div>
        </div>
        {/* 상점명 상품번호 넘겨서 할건가? 어떻게 할지 생각해보기 */}
        <Carousel card={dummy.Popular} />
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
                  state: { checkItems: id, totalPrice: price },
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
