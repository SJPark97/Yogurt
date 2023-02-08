import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dummy from '../db/list.json';
import BackToTop from '../AppBar/BackToTop';
import Carousel from '../Common/Carousel';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './PostDetail.css';

function PostDetail() {
  const { postId } = useParams();
  const post = dummy.Goods.find(event => event.postId === Number(postId));
  const salePercent = Math.floor(
    ((post.post_price - post.post_sale_price) / post.post_price) * 100,
  );

  // 스토어 좋아요 여부 이거는 DB에서 불린으로 줌
  // 눌리면 axios 보내서 바꾸기 + 좋아요 숫자 불러오기
  const [isLiked, setIsLiked] = useState(true);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };

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
    </div>
  );
}

export default PostDetail;
