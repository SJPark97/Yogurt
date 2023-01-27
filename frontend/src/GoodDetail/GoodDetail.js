import React from 'react';
import { useParams } from 'react-router-dom';
import dummy from '../db/list.json';
import BackToTop from '../AppBar/BackToTop';
import './GoodDetail.css';

function GoodDetail() {
  const { postId } = useParams();
  const post = dummy.Goods.find(event => event.postId === Number(postId));
  const salePercent = Math.floor(
    ((post.post_price - post.post_sale_price) / post.post_price) * 100,
  );
  return (
    <div>
      <BackToTop />
      <img src={post.image} alt="이미지사진" />
      <div className="basic-info">
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
      <hr />
    </div>
  );
}

export default GoodDetail;
