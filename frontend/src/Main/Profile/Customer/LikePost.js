import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './LikePost.css';

export default function LikePost() {
  const loginUser = useSelector(state => state.user.value);
  const [likePosts, setLikePosts] = useState([]);
  const navigate = useNavigate();

  const getLikePosts = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/zzim', {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setLikePosts(res.data.zzims);
      })
  }, [loginUser, setLikePosts]);

  useEffect(() => {
    getLikePosts();
  }, [getLikePosts]);

  const discount = likePost =>
    Math.floor(((likePost.price - likePost.sale_price) / likePost.price) * 100);

  const handleClick = likePost => {
    navigate(`/post/${likePost.id}`);
  };

  return (
    <div>
      <div className="totalLikePost">찜한 상품 {likePosts.length} 개</div>
      <div className="searchCardList">
        {likePosts.map(likePost => (
          <div
            className="searchCard"
            role="presentation"
            onClick={() => handleClick(likePost.post)}
            key={likePost.post.id}
          >
            <img
              className="searchCardImg"
              src={likePost.post.postImages[0].url}
              alt="#"
            />
            <div className="searchCardStore">{likePost.post.sellerName}</div>
            <div className="searchCardName">
              [{likePost.post.brCateName}] {likePost.post.title}
            </div>
            <div className="searchCardTag">
              {discount(likePost.post) ? (
                <div className="searchCardDiscount">
                  {discount(likePost.post)}%
                </div>
              ) : null}
              <div className="searchCardPrice">
                {likePost.post.sale_price.toLocaleString()}
              </div>
              <div className="searchCardBeforePrice">
                {likePost.post.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
